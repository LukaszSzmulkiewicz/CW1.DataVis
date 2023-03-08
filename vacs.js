import { formatTicks, prepareLineChartDataVacsCases, prepareLineChartDataVacs, filterDatesNew} from "./helper.js";
import {  drawLineChartVacs } from "./draw.js";

function addAxisLabel(svg, x, y, text) {
  const label = svg.append("text")
    .attr("class", "axisLabel")
    .attr("text-anchor", "end")
    .attr("x", x)
    .attr("y", y)
    .text(text.substring(0, 4))
    .append("tspan")
        .attr("x", x)
        .attr("dy", "1.2em")
        .text(text.substring(4));
  return label;
}

function addYAxisLabel(svg, x, y, text) {
  const label = svg.append("text")
    .attr("class", "axisLabel")
    .attr("text-anchor", "start")
    .text(text.substring(0, 6))
    .attr("x", x)
    .append("tspan")
    .attr("x", x)
    .attr("dy", "1.2em")
    .text(text.substring(6));
  return label;
}
  // Main function.
  function ready(data) {

    const countries = ['Gibraltar', 'Peru', 'Cyprus', 'Germany' ];
    const colors = ["dodgerblue", "darkorange", "green", "red", "purple", "blue"];

      const groupByLocation = d3.group(data, d=> d.location)

      const lineChartData =  prepareLineChartDataVacsCases(groupByLocation, "Cyprus", colors)
      const lineChartDataOther =  prepareLineChartDataVacs(groupByLocation, "Cyprus", colors)


  
    const margin = { top: 80, right: 60, bottom: 40, left: 60 };
    const width = 700 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;
    console.log("line chart data", lineChartDataOther)
    // First country SVGs
    ///////////////////////////////////////////////////////
    // Draw base svg 1.
    const svg = d3
      .select(`.line-chart-container-vacs`)
      .append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
    // Scale data.
    // shows the dates
    const xScale = d3
    .scaleTime()
    .range([0, width]);
      // Draw x axis.
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(20)
      .tickSizeOuter(0)
      .tickPadding(12)
      .tickSizeInner(-height)
    const xAxisDraw = svg
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)

    const yScale = d3
    .scaleLinear()
    .range([height, 0]);
  
      // Draw y axis.
      const yAxis = d3
      .axisLeft(yScale)
      .ticks(25)
      .tickFormat(formatTicks)
      .tickSizeOuter(0)
      .tickSizeInner(-width)

      const yAxisDraw = svg
      .append('g')
      .attr('class', 'yAxis')
      .call(yAxis);

    // Draw base svg 2.
    const svg1 = d3
    .select(`.line-chart-container-vacs-other`)
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Scale data.
    // shows the dates
    const xScale1 = d3
    .scaleTime()
    .range([0, width]);
      // Draw x axis.
    const xAxis1 = d3
      .axisBottom(xScale1)
      .ticks(20)
      .tickSizeOuter(0)
      .tickPadding(12)
      .tickSizeInner(-height)
    const xAxisDraw1 = svg1
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis1)

    const yScale1 = d3
    .scaleLinear()
    .range([height, 0]);

      // Draw y axis.
      const yAxis1 = d3
      .axisLeft(yScale1)
      .ticks(25)
      .tickFormat(formatTicks)
      .tickSizeOuter(0)
      .tickSizeInner(-width)

      const yAxisDraw1 = svg1
      .append('g')
      .attr('class', 'yAxis')
      .call(yAxis1);


      drawLineChartVacs(lineChartData, xScale, yScale, svg, xAxis, yAxis);
      drawLineChartVacs(lineChartDataOther, xScale1, yScale1, svg1, xAxis1, yAxis1);


  //       // Create the X axis:
  // xScale.domain(d3.extent(lineChartData.dates));
  // svg.selectAll(".xAxis")
  //    .transition()
  //    .duration(1000)
  //    .call(xAxis);  
 
 
  //  // create the Y axis
  //  yScale.domain([lineChartData.yMin, lineChartData.yMax])
 
  // svg.selectAll(".yAxis")
  //   .transition()
  //   .duration(1000)
  //   .call(yAxis); 
  //         // Rotate xAxis ticks
  // d3.selectAll(".xAxis .tick text")
  // .attr("transform", "rotate(-22)")

  //  // Create a update selection: bind to the new data
  //  const u = svg.selectAll('.line-series')
  //  .data(lineChartData.series, function(d){return d.series})

  //          // line generator 
  // const lineGen = d3
  // // calling d3 line to construct line generator 
  //   .line()
  //   .x(d => xScale(d.date))
  //   .y(d => yScale(d.value));  


  //    // Updata the line
  // u
  // .join(
  //   enter => enter
  //     .append("path")
  //     .transition()
  //     .duration(1500)
  //     .attr('class', d => `line-series ${d.lblClass.toLowerCase()}`)
  //     .attr("fill", "none")
  //     .attr('d', d => lineGen(d.values))
  //     .attr("stroke-width", 2)
  //     .style('stroke', d => d.color),
      
      
  //   update => update
  //     .transition()
  //     .duration(1500)
  //     .attr('d', d => lineGen(d.values))
  //     .style('stroke', d => d.color),

  //   exit => exit.remove()
  // )


    
  }
  function type(d) {
    //creating variable for a date 
    const date = d3.timeParse('%d/%m/%Y')(d.date);
    
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



      };
  }
  
  // Load data using the type method for the type conversion 
  d3.csv('data/vacs.csv', type).then(res => {
    // sending data to the ready function, this will be the main function of the app
    console.log("res", res)
    ready(res);
  });


