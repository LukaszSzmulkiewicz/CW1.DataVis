var width = 800;
var height = 700;

var svg = d3
  .select(".map-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("class", "map");

var title = svg
  .append("text")
  .attr("class", "title")
  .text("European Population Density")
  .attr("stroke-width", "2px")
  .attr("font-size", "19pt")
  .attr("fill", "black")
  .attr("x", 300)
  .attr("y", 650);

var projection = d3
  .geoMercator()
  .center([13, 52])  
  .translate([width / 2, height / 2]) 
  .scale([width / 1.5]); 

var path = d3.geoPath().projection(projection);

loadData();

function loadData() {
  var promises = [];

  promises.push(d3.json("data/europe.json"));
  promises.push(d3.csv("data/europe.csv"));

  Promise.all(promises).then(dataLoaded);
}

function dataLoaded(results) {
  var countryData = results[0];
  var densityData = results[1];
  var densities = {};

  densityData.forEach((x) => (densities[x.iso_code] = +x.population_density));
  var color = getColors(densityData);

  svg
    .append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(countryData.features)
    .enter()
    .append("path")
    .attr("class", (d) => `map-path ${d.properties.name}`)
    .attr("d", path)
    .style("fill", (d) => color(densities[d.id]))
    .style("stroke", "black")
    .style("stroke-width", 0.3)
    .on("mouseover", function (event, d) {
      d3.select().style("opacity", 1);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    })
    .on("mousemove", function (event, d) {
      d3.select(this).style("fill", "dodgerblue");
      const className = d.properties.name.split(" ")[0];
      d3.selectAll(`.${className}`).style("fill", "dodgerblue");
      var density = densities[d.id] ? densities[d.id].toLocaleString() : "N/A";
      d3.select(".tooltip")
        .html(
          "<strong>" + d.properties.name +
            "</strong><br>Population Density: " + density
        )
        .transition()
        .duration(150)
        .style("opacity", 0.9)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 100 + "px");
    })
    .on("mouseout", function (event, d) {
      d3.select(this).style("fill", (d) => color(densities[d.id]));
      const className = d.properties.name.split(" ")[0];
      d3.selectAll(`.${className}`).style("fill", (d) =>
        color(densities[d.id])
      );
      tooltip.transition().duration(500).style("opacity", 0);
    });

  var tooltip = d3
    .select(".map-container")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // map zoom
    let zoom = d3.zoom()
    .on('zoom', handleZoom);

  function handleZoom(e) {
    d3.select('svg g')
      .attr('transform', e.transform);
  }

    d3.select('svg')
      .call(zoom);

  /*
   * Bar chart visualization
   */


  const barChartData = prepareBarChartData(densityData).sort((a, b) => {
    return d3.descending(a.cases, b.cases);
  });
  console.log("barChartData", barChartData);
  // margin convention
  const margin = { top: 80, right: 20, bottom: 40, left: 160 };
  const width = 800 - margin.right - margin.left;
  const height = 700 - margin.top - margin.bottom;

  // the chart should start from 0 so getting a max
  const xMax = d3.max(barChartData, (d) => d.cases);
  console.log("x_MAx", xMax);

  // creating a scale
  // can also add the domain  and range between the brackets scaleLinear([0, xMax],[0, width])
  const xScaleBar = d3
    .scaleLinear()
    // array with minimum and maximum values mapping from the domain to range values
    .domain([0, xMax])
    .range([0, width]);

  // using band scale which takes an order of categorical values and maps them to the screen positions
  // depending on their order
  const yScaleBar = d3
    .scaleBand()
    .domain(barChartData.map((d) => d.country))
    // to get rounded pixel values using rangeRound
    .rangeRound([0, height])
    .paddingInner(0.25);

  //draw base.
  const svgChart = d3
    .select(".map-chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // adding a group within the svg for data
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Draw Bars.
  const bars = svgChart.append('g').attr('class', 'bars');

  // Draw header.
  const header = svgChart
    .append("g")
    .attr("class", "bar-header")
    .attr("transform", `translate(0,${-margin.top * 0.6})`)
    .append("text");


  // cant break header but can nest tspan elements
  header.append("tspan").text("Total cases by country in Europe");

  header
    .append("tspan")
    .attr("x", 0)
    .attr("dy", "1.5em")
    .style("font-size", "0.8em")
    .style("fill", "#555")
    .text("Total cases per million by country for 2020-2023");

  // draw axis

  const xAxis = d3
    .axisTop(xScaleBar)
    .tickFormat(formatTicks)
    .tickSizeInner(-height)
    .tickSizeOuter(0);

  const xAxisDraw = svgChart.append("g").attr("class", "x axis").call(xAxis);

  const yAxis = d3.axisLeft(yScaleBar).tickSize(0).tickFormat(formatTickLabel);

  const yAxisDraw = svgChart
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .selectAll("text") // Select all the tick label elements
    .style("font-size", "14px") // Set the font size to 16 pixels
    .style("font-weight", "bold");

  // changing text distance to the axis
  yAxisDraw.selectAll("text").attr("dx", "-0.6em");

  var tooltip2 = d3
    .select(".map-chart-container")
    .append("div")
    .attr("class", "tooltip-chart")
    .style("opacity", 0);

  let densityFilterValue = 0;

  d3.selectAll(".filter").on("click", click)
  function click(){
    densityFilterValue = +this.dataset.name;
    const updatedData = prepareBarChartData(densityData).sort((a, b) => {
      return d3.descending(a.cases, b.cases);
    })
    .filter((d, i) =>{ 
      if(densityFilterValue !==0){
        return d.density <= densityFilterValue;
      }else{
        return d;
      }
    });
    highlightSelectedFilter(updatedData);
    updateBarChart(updatedData, svgChart, yScaleBar, xScaleBar, color, densities, xAxis, yAxis)
}

updateBarChart(barChartData, svgChart, yScaleBar, xScaleBar, color, densities,xAxis, yAxis)


  // variable to hold the brush object
var brush = null;
var brushEnabled = false; // initialize brush state to disabled

// Function to initialize the brush
function initBrush() {
  brush = d3
  .brush()
  .on("brush end", brushed);

}

// Calling the initBrush function to initialize the brush
initBrush();

//  button for the brush function bind with its click event
d3.select("#brush-button").on("click", function () {
  // Toggle the brush state
  brushEnabled = !brushEnabled;
  var buttonValue = d3.select("#brush-button").node().value;
  console.log(buttonValue);
  if(buttonValue === "Turn Brush ON"){
    d3.select("#brush-button").attr("value", "Turn Brush OFF");
  }else {
    d3.select("#brush-button").attr("value", "Turn Brush ON");
    brushEnabled = false;
    d3.selectAll(".brush").remove()
    d3.selectAll(`.map-path`).style("fill", (d) =>
    color(densities[d.id]))
  
  }
  if (brushEnabled) {
    // If the brush is not currently enabled, enable it
    if (!brush) {
      initBrush();
    }
    // Apply the brush to the map
    svgChart.append("g")
    .attr("class", "brush")
    .call(brush)
  } else {
    // If the brush is currently enabled, disable it
    d3.selectAll(".brush").remove
  }
});

// Highlight selected countries on hover.
function highlightSelected(data) {
  const selectedIDs = data.map(d => d.id);
  d3.selectAll('.map-path')
    .filter(d => selectedIDs.includes(d.id))
    .style('fill', 'dodgerblue');

  d3.selectAll('.map-path')
    .filter(d => !selectedIDs.includes(d.id))
    .style("fill", (d) =>color(densities[d.id]))
}
// Function used to Highlight selected countries when using filter.
function highlightSelectedFilter(data) {
  const selectedIDs = data.map(d => d.id);
  d3.selectAll('.map-path')
    .filter(d => selectedIDs.includes(d.id))
    .style('fill', 'dodgerblue')
    .transition()
    .duration(2000)
    .style("fill", (d) =>color(densities[d.id]));

  d3.selectAll('.map-path')
    .filter(d => !selectedIDs.includes(d.id))
    .style("fill", (d) =>color(densities[d.id]))
}
function brushed(event) {
  var selection = event.selection;
    if (selection) {
      const [[x0, y0], [x1, y1]] = selection;
      const selected = barChartData.filter(
        d => y0 <= yScaleBar(d.country) && y1 > yScaleBar(d.country))
      highlightSelected(selected);
    } else {
      highlightSelected([]);
    }

  }
}

// function used to prepare color scale for map and bar chart
function getColors(densityData) {
  var sortedDensities = densityData
    .map((x) => parseInt(x.population_density))
    .sort(function (a, b) {
      return parseInt(a) - parseInt(b);
    });
  var maxDensity = d3.max(sortedDensities);

  var oranges = ["white"]; // create lower bound for thresholds

  // Map the sorted densities to colors using the interpolate function
  sortedDensities.forEach((x) => {
    var color = d3.interpolateReds(x / maxDensity);
    oranges.push(color);
  });

  return d3.scaleThreshold().domain(sortedDensities).range(oranges);
}

// function used to process data for bar chart 
function prepareBarChartData(data) {
  // converting the map to the array of objects key at index 0 and value at index 1
  const dataArray = data.map((d) => ({
    id: d.iso_code,
    country: d.location,
    cases: +d.total_cases_per_million,
    density: +d.population_density
  }));

  return dataArray;
}

// function used to shorten longer labels
function formatTickLabel(d) {
  // Check if the text is longer than the maximum length
  if (d.length > 15) {
    // Truncate the text and add an ellipsis
    return d.substr(0, 15 - 1) + "...";
  } else {
    // Return the original text
    return d;
  }
}
// function for formatting bar chart ticks 
function formatTicks(d) {
  // returns a string value 30G, 50G ...
  return d3
    .format("~s")(d)
    .replace("M", " mil")
    .replace("G", " bil")
    .replace("T", " tril");
}

// function used to draw bar chart, contains mouse events for tooltip and styling changes on hover
function updateBarChart(data, svgChart, yScaleBar, xScaleBar, color, densities, xAxis, yAxis){
  const xMax = d3.max(data, (d) => d.cases);
    // Create the X axis:
    xScaleBar.domain([0, xMax])
    yScaleBar.domain(data.map((d) => d.country))

    svgChart.selectAll(".x.axis")
    .transition()
    .duration(1000)
    .call(xAxis)
   
    svgChart.selectAll(".y.axis")
    .transition()
    .duration(1000)
    .call(yAxis)
    .selectAll("text") // Select all the tick label elements
    .style("font-size", "14px") // Set the font size to 16 pixels
    .style("font-weight", "bold");

    // Create a update selection: bind to the new data
   const u = svgChart.selectAll('.bar-series')
   
   .data(data, d => d.country)
  // draw bars
    u
    .join(
      enter => enter    
        .append("rect")   
        .transition()
        .duration(1500)  
        .attr("class", (d) => `bar-series ${d.country}`)
        .attr("y", (d) => yScaleBar(d.country))
        .attr("width", (d) => yScaleBar(d.cases))
        .attr("height", yScaleBar.bandwidth())
        .style("fill", "dodgerblue")
        .transition()
        .duration(1500)  
        .style("fill", (d) => color(densities[d.id])),

      update => update
        .transition()
        .duration(1500)
        .attr("class", (d) => `bar-series ${d.country}`)
        .attr("y", (d) => yScaleBar(d.country))
        .attr("height", yScaleBar.bandwidth())
        .attr("width", (d) => xScaleBar(d.cases))
        .style("fill", (d) => color(densities[d.id])),

      exit => exit
        .transition()
        .duration(300)
        .remove()
    )
    .on("mousemove", function (event, d) {
      d3.select(this).style("fill", "dodgerblue");
      const className = d.country.split(" ")[0];
      d3.selectAll(`path.${className}`).style("fill", "dodgerblue");
      var density = densities[d.id] ? densities[d.id].toLocaleString() : "N/A";
      d3.select(".tooltip-chart")
        .html(
          "<strong>" +
            d.country +
            "</strong><br><strong>Cases per million: " +
            d.cases +
            "</strong><br>Population Density: " +
            density
        )
        .transition()
        .duration(150)
        .style("opacity", 0.9)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 100 + "px");
    })
    .on("mouseout", function (event, d) {
      d3.select(this).style("fill", (d) => color(densities[d.id]));
      const className = d.country.split(" ")[0];
      d3.selectAll(`path.${className}`).style("fill", (d) =>
        color(densities[d.id])
      );
      d3.select(".tooltip-chart").transition().duration(500).style("opacity", 0);
    });

}
