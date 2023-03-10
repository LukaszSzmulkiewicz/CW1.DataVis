var width = 1000;
var height = 800;

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
  .attr("y", 700);

var projection = d3
  .geoMercator()
  .center([ 13, 52 ]) //comment centrer la carte, longitude, latitude
  .translate([ width/2, height/2 ]) // centrer l'image obtenue dans le svg
  .scale([ width/1.5 ]); // zoom, plus la valeur est petit plus le zoom est gros 


var path = d3.geoPath().projection(projection);

addGraticules(svg, path);

loadData();

function loadData() {
  var promises = [];

  promises.push(d3.json("data/europe.json"));
  promises.push(d3.tsv("data/sapops.txt"));
  promises.push(d3.csv("data/europe.csv"));

  Promise.all(promises).then(dataLoaded);
}

function dataLoaded(results) {
  var countryData = results[0];
  console.log("country data", countryData)
  var populationData = results[1];
  var densityData = results[2];
  var populations = {};
  var densities = {};

  populationData.forEach((x) => (populations[x.id] = +x.population));
  densityData.forEach((x) => (densities[x.iso_code] = +x.population_density));
  console.log("density data", densityData)
  var color = getColors(densityData);

  svg
    .append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(countryData.features)
    .enter()
    .append("path")
    .attr("class", (d) => `${d.properties.name}`)
    .attr("d", path)
    .style("fill",(d) => color(densities[d.id]))
    .style("stroke", "black")
    .style("stroke-width", 0.3)
    .on("mouseover", function (event, d) {
      d3.select().style("opacity", 1);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    })
    .on("mousemove", function (event, d) {
      d3.select(this).style("fill", "dodgerblue");
      const className = d.properties.name.split(" ")[0];
      d3.selectAll(`.${className}`).style("fill", "dodgerblue")
      var density = densities[d.id] ? densities[d.id].toLocaleString() : "N/A";
        console.log("I am in the tooltip")
        d3.select(".tooltip")
        .html("<strong>" + d.properties.name +"</strong><br>Population Density: " +density)
        .transition().duration(150).style("opacity", 0.9)
        .style("left", event.pageX +5 + "px")
        .style("top", event.pageY + 10 + "px");
    })
    .on("mouseout", function (event, d) {
      d3.select(this).style("fill", (d) => color(densities[d.id]));
      const className = d.properties.name.split(" ")[0];
      d3.selectAll(`.${className}`).style("fill", (d) => color(densities[d.id]))
      tooltip.transition().duration(500).style("opacity", 0);
    });

  var tooltip = d3
    .select(".map-container")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const barChartData = prepareBarChartData(densityData).sort((a, b) => {
    return d3.descending(a.cases, b.cases);
  });
  console.log("barChartData", barChartData);
  // margin convention
  const margin = { top: 80, right: 20, bottom: 40, left: 160 };
  const width = 800 - margin.right - margin.left;
  const height = 800 - margin.top - margin.bottom;

  // getting the minimum and maximum of data with the extent
  // const xExtent = d3.extent(barChartData, d => d.revenue)

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

  // Draw header.
  const header = svgChart
    .append("g")
    .attr("class", "bar-header")
    .attr("transform", `translate(0,${-margin.top * 0.6})`)
    .append("text");

  // cant break header but can nest tspan elements
  header.append("tspan").text("Total cases by country in South America");

  header
    .append("tspan")
    .attr("x", 0)
    .attr("dy", "1.5em")
    .style("font-size", "0.8em")
    .style("fill", "#555")
    .text("Total cases per million by country for 2020-2023");

  // draw bars
  const bars = svgChart
    .selectAll(".bar")
    .data(barChartData)
    .enter()
    .append("rect")
    .attr("class", d => `bar-series ${d.country}`)
    .attr("y", (d) => yScaleBar(d.country))
    .attr("width", (d) => xScaleBar(d.cases))
    .attr("height", yScaleBar.bandwidth())
    .style("fill", (d) => color(densities[d.id]))
    .on("mousemove", function (event, d) {
      d3.select(this).style("fill", "dodgerblue");
      console.log("class to hover from bar", d)
      const className = d.country.split(" ")[0];
      d3.selectAll(`path.${className}`).style("fill", "dodgerblue")
      var density = densities[d.id] ? densities[d.id].toLocaleString() : "N/A";
      d3.select(".tooltip-chart")
        .html("<strong>" + d.country +"</strong><br>Population Density: " +density)
        .transition().duration(150).style("opacity", 0.9)
        .style("left", event.pageX +5 + "px")
        .style("top", event.pageY + 10 + "px");
    })
    .on("mouseout", function (event, d) {
      d3.select(this).style("fill", (d) => color(densities[d.id]));
      const className = d.country.split(" ")[0];
      d3.selectAll(`path.${className}`).style("fill", (d) => color(densities[d.id]))
      tooltip2.transition().duration(500).style("opacity", 0);

    });

    
      var tooltip2 = d3
      .select(".map-chart-container")
      .append("div")
      .attr("class", "tooltip-chart")
      .style("opacity", 0);

  function formatTicks(d) {
    // returns a string value 30G, 50G ...
    return d3
      .format("~s")(d)
      .replace("M", " mil")
      .replace("G", " bil")
      .replace("T", " tril");
  }
  // draw axis

  const xAxis = d3
    .axisTop(xScaleBar)
    .tickFormat(formatTicks)
    .tickSizeInner(-height)
    .tickSizeOuter(0);

  const xAxisDraw = svgChart.append("g").attr("class", "x axis").call(xAxis);

  const yAxis = d3
    .axisLeft(yScaleBar)
    .tickSize(0)
    .tickFormat(formatTickLabel);

  const yAxisDraw = svgChart.append("g").attr("class", "y axis").call(yAxis)
      .selectAll("text") // Select all the tick label elements
      .style("font-size", "14px") // Set the font size to 16 pixels
      .style("font-weight", "bold");;

  // changing text distance to the axis
  yAxisDraw.selectAll("text").attr("dx", "-0.6em");
}

function getColors(densityData) {
  console.log("density data", densityData)
  var sortedDensities = densityData
    .map((x) => parseInt(x.population_density))
    .sort(function (a, b) {
      return parseInt(a) - parseInt(b);
    });
  var maxDensity = d3.max(sortedDensities);
  console.log("sorted densities", sortedDensities);

  var oranges = ["white"]; // create lower bound for thresholds

  sortedDensities.forEach((x) =>
    oranges.push(d3.interpolateReds(x / maxDensity))
  );

  return d3.scaleThreshold().domain(sortedDensities).range(oranges);
}

function addGraticules(svg, path) {
  var graticule = d3.geoGraticule();
  svg
    .append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);
}

function prepareBarChartData(data) {
  // converting the map to the array of objects key at index 0 and value at index 1
  const dataArray = data.map((d) => ({
    id: d.iso_code,
    country: d.location,
    cases: +d.total_cases_per_million,
  }));

  return dataArray;
}

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
