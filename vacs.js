import {
  formatTicks,
  prepareLineChartDataVacsCases,
  prepareLineChartDataVacs,
} from "./data_prep.js";
import { drawLineChartVacs } from "./draw.js";
import { addPieCharts } from "./vacs_pie.js";

// Main function.
function ready(data) {
  const colors = ["dodgerblue", "darkorange", "green", "red", "purple", "blue"];

  const groupByLocation = d3.group(data, (d) => d.location);

  const lineChartData = prepareLineChartDataVacsCases(
    groupByLocation,
    "Gibraltar",
    colors
  );
  const lineChartDataOther = prepareLineChartDataVacs(
    groupByLocation,
    "Gibraltar",
    colors
  );

  const lineChartData1 = prepareLineChartDataVacsCases(
    groupByLocation,
    "Peru",
    colors
  );
  const lineChartDataOther1 = prepareLineChartDataVacs(
    groupByLocation,
    "Peru",
    colors
  );

  const lineChartData2 = prepareLineChartDataVacsCases(
    groupByLocation,
    "Cyprus",
    colors
  );
  const lineChartDataOther2 = prepareLineChartDataVacs(
    groupByLocation,
    "Cyprus",
    colors
  );

  const lineChartData3 = prepareLineChartDataVacsCases(
    groupByLocation,
    "Germany",
    colors
  );
  const lineChartDataOther3 = prepareLineChartDataVacs(
    groupByLocation,
    "Germany",
    colors
  );

  const margin = { top: 80, right: 60, bottom: 40, left: 60 };
  const width = 450 - margin.right - margin.left;
  const height = 420 - margin.top - margin.bottom;
  console.log("line chart data", lineChartDataOther);
  // First country SVGs
  ///////////////////////////////////////////////////////
  // Draw base svg 1.
  const svg = d3
    .select(`.line-chart-container-vacs`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale data.
  // shows the dates
  const xScale = d3.scaleTime().range([0, width]);
  // Draw x axis.
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(20)
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  const xAxisDraw = svg
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  const yScale = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis = d3
    .axisLeft(yScale)
    .ticks(25)
    .tickFormat(formatTicks)
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw = svg.append("g").attr("class", "yAxis").call(yAxis);

   // Defining the pattern for the background image
     const patternVacs = svg.append("defs")
      .append("pattern")
      .attr("id", "bg-image-vacs")
      .attr("width", 1)
      .attr("height", 1)
      .append("image")
      .attr("xlink:href", "data/gibraltar.jpg")
      .attr("width", "70%")
      .attr("height", "100%");
 
   // Set the background image for the SVG
   svg.append("rect")
      .attr("class", "image-pulse") 
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", "70%")
      .attr("height", "100%")
      .attr("fill", "url(#bg-image-vacs)")
      .attr("x", 20)
      .attr("y", -60)
      .attr("opacity", 0.15)
      .on("mouseout", imageMouseOut);
  

  // Draw base svg 2.
  const svg1 = d3
    .select(`.line-chart-container-vacs-other`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale data.
  // shows the dates
  const xScale1 = d3.scaleTime().range([0, width]);
  // Draw x axis.
  const xAxis1 = d3
    .axisBottom(xScale1)
    .ticks(20)
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  const xAxisDraw1 = svg1
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis1);

  const yScale1 = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis1 = d3
    .axisLeft(yScale1)
    .ticks(25)
    .tickFormat(formatTicks)
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw1 = svg1.append("g").attr("class", "yAxis").call(yAxis1);

  

  // Second country SVGs
  ///////////////////////////////////////////////////////
  // Draw base svg 1.
  const svg3 = d3
    .select(`.line-chart-container-vacs1`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale data.
  // shows the dates
  const xScale3 = d3.scaleTime().range([0, width]);
  // Draw x axis.
  const xAxis3 = d3
    .axisBottom(xScale3)
    .ticks(20)
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  const xAxisDraw3 = svg3
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis3);

  const yScale3 = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis3 = d3
    .axisLeft(yScale3)
    .ticks(25)
    .tickFormat(formatTicks)
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw3 = svg3.append("g").attr("class", "yAxis").call(yAxis);

  // Defining the pattern for the background image
  const patternVacs1 = svg3.append("defs")
  .append("pattern")
  .attr("id", "bg-image-vacs1")
  .attr("width", 1)
  .attr("height", 1)
  .append("image")
  .attr("xlink:href", "data/peru.jpg")
  .attr("width", "70%")
  .attr("height", "100%");

// Set the background image for the SVG
svg3.append("rect")
  .attr("class", "image-pulse") 
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", "70%")
  .attr("height", "100%")
  .attr("fill", "url(#bg-image-vacs1)")
  .attr("x", 20)
  .attr("y", -60)
  .attr("opacity", 0.15)
  .on("mouseout", imageMouseOut);
  
  // Draw base svg 2.
  const svg4 = d3
    .select(`.line-chart-container-vacs1-other`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale data.
  // shows the dates
  const xScale4 = d3.scaleTime().range([0, width]);
  // Draw x axis.
  const xAxis4 = d3
    .axisBottom(xScale4)
    .ticks(20)
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  const xAxisDraw4 = svg4
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis4);

  const yScale4 = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis4 = d3
    .axisLeft(yScale4)
    .ticks(25)
    .tickFormat(formatTicks)
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw4 = svg4.append("g").attr("class", "yAxis").call(yAxis4);

  // Third country SVGs
  ///////////////////////////////////////////////////////
  // Draw base svg 1.
  const svg5 = d3
    .select(`.line-chart-container-vacs2`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale data.
  // shows the dates
  const xScale5 = d3.scaleTime().range([0, width]);
  // Draw x axis.
  const xAxis5 = d3
    .axisBottom(xScale5)
    .ticks(20)
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  const xAxisDraw5 = svg5
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis5);

  const yScale5 = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis5 = d3
    .axisLeft(yScale5)
    .ticks(25)
    .tickFormat(formatTicks)
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw5 = svg5.append("g").attr("class", "yAxis").call(yAxis);
  
  // Defining the pattern for the background image
  const patternVacs3 = svg5.append("defs")
  .append("pattern")
  .attr("id", "bg-image-vacs2")
  .attr("width", 1)
  .attr("height", 1)
  .append("image")
  .attr("xlink:href", "data/cyprus.jpg")
  .attr("width", "70%")
  .attr("height", "100%");

// Set the background image for the SVG
svg5.append("rect")
  .attr("class", "image-pulse") 
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", "70%")
  .attr("height", "100%")
  .attr("fill", "url(#bg-image-vacs2)")
  .attr("x", 20)
  .attr("y", -60)
  .attr("opacity", 0.3)
  .on("mouseout", imageMouseOut);

  // Draw base svg 2.
  const svg6 = d3
    .select(`.line-chart-container-vacs2-other`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale data.
  // shows the dates
  const xScale6 = d3.scaleTime().range([0, width]);
  // Draw x axis.
  const xAxis6 = d3
    .axisBottom(xScale6)
    .ticks(20)
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  const xAxisDraw6 = svg6
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis6);

  const yScale6 = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis6 = d3
    .axisLeft(yScale6)
    .ticks(25)
    .tickFormat(formatTicks)
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw6 = svg6.append("g").attr("class", "yAxis").call(yAxis6);

   // Fourth country SVGs
  ///////////////////////////////////////////////////////
  // Draw base svg 1.
  const svg7 = d3
    .select(`.line-chart-container-vacs3`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale data.
  // shows the dates
  const xScale7 = d3.scaleTime().range([0, width]);
  // Draw x axis.
  const xAxis7 = d3
    .axisBottom(xScale7)
    .ticks(20)
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  const xAxisDraw7 = svg7
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis7);

  const yScale7 = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis7 = d3
    .axisLeft(yScale7)
    .ticks(25)
    .tickFormat(formatTicks)
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw7 = svg7.append("g").attr("class", "yAxis").call(yAxis7);
  
  // Defining the pattern for the background image
  const patternVacs4 = svg7.append("defs")
  .append("pattern")
  .attr("id", "bg-image-vacs3")
  .attr("width", 1)
  .attr("height", 1)
  .append("image")
  .attr("xlink:href", "data/germany.jpg")
  .attr("width", "70%")
  .attr("height", "100%");

// Set the background image for the SVG
svg7.append("rect")
  .attr("class", "image-pulse") 
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", "70%")
  .attr("height", "100%")
  .attr("fill", "url(#bg-image-vacs3)")
  .attr("x", 20)
  .attr("y", -60)
  .attr("opacity", 0.15)
  .on("mouseout", imageMouseOut);


  // Draw base svg 2.
  const svg8 = d3
    .select(`.line-chart-container-vacs3-other`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale data.
  // shows the dates
  const xScale8 = d3.scaleTime().range([0, width]);
  // Draw x axis.
  const xAxis8 = d3
    .axisBottom(xScale8)
    .ticks(20)
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  const xAxisDraw8 = svg8
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis8);

  const yScale8 = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis8 = d3
    .axisLeft(yScale8)
    .ticks(25)
    .tickFormat(formatTicks)
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw8 = svg8.append("g").attr("class", "yAxis").call(yAxis8);

  drawLineChartVacs(lineChartData, xScale, yScale, svg, xAxis, yAxis);
  drawLineChartVacs(lineChartDataOther, xScale1, yScale1, svg1, xAxis1, yAxis1);
  drawLineChartVacs(lineChartData1, xScale3, yScale3, svg3, xAxis3, yAxis3);
  drawLineChartVacs(lineChartDataOther1, xScale4, yScale4, svg4, xAxis4, yAxis4);
  drawLineChartVacs(lineChartData2, xScale5, yScale5, svg5, xAxis5, yAxis5);
  drawLineChartVacs(lineChartDataOther2, xScale6, yScale6, svg6, xAxis6, yAxis6);
  drawLineChartVacs(lineChartData3, xScale7, yScale7, svg7, xAxis7, yAxis7);
  drawLineChartVacs(lineChartDataOther3, xScale8, yScale8, svg8, xAxis8, yAxis8);
  
  // adding pie charts
  addPieCharts(groupByLocation);

}
function type(d) {
  //creating variable for a date
  const date = d3.timeParse("%d/%m/%Y")(d.date);

  return {
    iso_code: d.iso_code,
    continent: d.continent,
    location: d.location,
    total_cases: +d.total_cases,
    date: date,
    population: +d.population,
    gdp_per_capita: +d.gdp_per_capita,
    total_cases_per_hundred: +d.total_cases_per_hundred,
    total_deaths_per_hundred: +d.total_deaths_per_hundred,
    total_vaccinations_per_hundred: +d.total_vaccinations_per_hundred,
    total_boosters_per_hundred: +d.total_boosters_per_hundred,
    total_hosp_admissions_per_hundred: +d.total_hosp_admissions_per_hundred,
    hospital_beds_per_thousand: +d.hospital_beds_per_thousand,
    human_development_index: +d.human_development_index,
    people_fully_vaccinated: +d.people_fully_vaccinated,
    stringency_index: +d.stringency_index
  };
}

// Load data using the type method for the type conversion
d3.csv("data/vacs.csv", type).then((res) => {
  // sending data to the ready function, this will be the main function of the app
  console.log("res", res);
  ready(res);
});
function imageMouseOut() {
  d3.select(this).transition()
    .duration(750)
    .attr("opacity", 0)
    .attr("x", -150)
    .transition()
    .duration(1000)
    .attr("opacity", 1)
    .attr("x", 150)
    .transition()
    .duration(750)
    .attr("opacity", 1)
    .attr("x", 50);
}