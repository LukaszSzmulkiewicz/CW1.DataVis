var width = 800;
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
  .text("South American Population Density")
  .attr("stroke-width", "2px")
  .attr("font-size", "19pt")
  .attr("fill", "black")
  .attr("x", 300)
  .attr("y", 600);

var projection = d3
  .geoMercator()
  .scale(500)
  .translate([width, height / 4]);

var path = d3.geoPath().projection(projection);

addGraticules(svg, path);

loadData();

function loadData() {
  var promises = [];

  promises.push(d3.json("data/southamerica.json"));
  promises.push(d3.tsv("data/sapops.txt"));
  promises.push(d3.csv("data/map_data.csv"));

  Promise.all(promises).then(dataLoaded);
}

function dataLoaded(results) {
  var countryData = results[0];
  var populationData = results[1];
  var densityData = results[2];
  var populations = {};
  var densities = {};

  populationData.forEach((x) => (populations[x.id] = +x.population));
  densityData.forEach((x) => (densities[x.iso_code] = +x.population_density));

  var color = getColors(densityData);

  svg
    .append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(countryData.features)
    .enter()
    .append("path")
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
      const clasName = d.properties.name.split(" ")[0];
      d3.select(`.${clasName}`).style("fill", "dodgerblue")
      var density = densities[d.id] ? densities[d.id].toLocaleString() : "N/A";
        console.log("I am in the tooltip")
        d3.select(".tooltip")
        .html("<strong>" + d.properties.name +"</strong><br>Population Density: " +density)
        .transition().duration(200).style("opacity", 0.9)
        .style("left", event.pageX +5 + "px")
        .style("top", event.pageY + 10 + "px");
    })
    .on("mouseout", function (event, d) {
      d3.select(this).style("fill", (d) => color(densities[d.id]));
      const className = d.properties.name.split(" ")[0];
      d3.select(`.${className}`).style("fill", (d) => color(densities[d.id]))
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
  const margin = { top: 80, right: 60, bottom: 40, left: 120 };
  const width = 900 - margin.right - margin.left;
  const height = 500 - margin.top - margin.bottom;

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
    // place holder for all bar classes joins it with data if there is none yet or updates
    .selectAll(".bar")
    .data(barChartData)
    .enter()
    .append("rect")
    .attr("class", d => `bar-series ${d.country}`)
    .attr("y", (d) => yScaleBar(d.country))
    // width is determined by the revenue value
    .attr("width", (d) => xScaleBar(d.cases))
    // hight is calculated by the yScale bandwidth getter
    .attr("height", yScaleBar.bandwidth())
    .style("fill", (d) => color(densities[d.id]));

  function formatTicks(d) {
    // returns a string value 30G, 50G ...
    return d3
      .format("~s")(d)
      .replace("M", " mil")
      .replace("G", " bil")
      .replace("T", " tril");
  }
  // draw axis
  // need to pass the position of axis and format the number for the axis
  // using the d3.format function
  const xAxis = d3
    .axisTop(xScaleBar)
    // custom formating
    .tickFormat(formatTicks)
    // build in d3 tick formatting
    //.tickFormat(d3.format("~s"))
    // adjusting ticks sizes and styling with css
    .tickSizeInner(-height)
    .tickSizeOuter(0);

  const xAxisDraw = svgChart.append("g").attr("class", "x axis").call(xAxis);
  // alternative
  //xAxisDraw(xAxis);

  const yAxis = d3.axisLeft(yScaleBar).tickSize(0);

  const yAxisDraw = svgChart.append("g").attr("class", "y axis").call(yAxis);

  // changing text distance to the axis
  yAxisDraw.selectAll("text").attr("dx", "-0.6em");
}

function getColors(densityData) {
  var sortedDensities = densityData
    .map((x) => parseInt(x.population_density))
    .sort(function (a, b) {
      return parseInt(a) - parseInt(b);
    });
  var maxDensity = d3.max(sortedDensities);
  console.log("sorted densities", maxDensity);

  var oranges = ["white"]; // create lower bound for thresholds

  sortedDensities.forEach((x) =>
    oranges.push(d3.interpolateOranges(x / maxDensity))
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
