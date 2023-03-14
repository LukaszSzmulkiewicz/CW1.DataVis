import {
  filterDates,
  prepareLineChartData,
  formatTicks,
  prepareScatterPlotData,
  filterDatesNew,
} from "./data_prep.js";
import {
  updateLineChart,
  updateScatterPlot,
  addYAxisLabel,
  addXAxisLabel,
} from "./draw.js";
// Main function.
function ready(data) {
  const continents = [
    "Asia",
    "Europe",
    "Africa",
    "N. America",
    "S. America",
    "Oceania",
  ];
  const colors = ["dodgerblue", "darkorange", "green", "red", "purple", "blue"];

  const dataWinter2020 = filterDates(data, "22/12/2019", "20/03/2020");

  const asiaWinter2020 = dataWinter2020.filter(
    (data) => data.continent === "Asia"
  );
  const europeWinter2020 = dataWinter2020.filter(
    (data) => data.continent === "Europe"
  );
  const africaWinter2020 = dataWinter2020.filter(
    (data) => data.continent === "Africa"
  );
  const northAmericaWinter2020 = dataWinter2020.filter(
    (data) => data.continent === "North America"
  );
  const southAmericaWinter2020 = dataWinter2020.filter(
    (data) => data.continent === "South America"
  );
  const oceaniaWinter2020 = dataWinter2020.filter(
    (data) => data.continent === "Oceania"
  );

  const dataSpring2020 = filterDates(data, "20/03/2020", "20/06/2020");

  const asiaSpr2020 = dataSpring2020.filter(
    (data) => data.continent === "Asia"
  );
  const europeSpr2020 = dataSpring2020.filter(
    (data) => data.continent === "Europe"
  );
  const africaSpr2020 = dataSpring2020.filter(
    (data) => data.continent === "Africa"
  );
  const northAmericaSpr2020 = dataSpring2020.filter(
    (data) => data.continent === "North America"
  );
  const southAmericaSpr2020 = dataSpring2020.filter(
    (data) => data.continent === "South America"
  );
  const oceaniaSpr2020 = dataSpring2020.filter(
    (data) => data.continent === "Oceania"
  );

  const dataSummer2020 = filterDates(data, "22/06/2020", "22/09/2020");

  const asiaSummer2020 = dataSummer2020.filter(
    (data) => data.continent === "Asia"
  );
  const europeSummer2020 = dataSummer2020.filter(
    (data) => data.continent === "Europe"
  );
  const africaSummer2020 = dataSummer2020.filter(
    (data) => data.continent === "Africa"
  );
  const northAmericaSummer2020 = dataSummer2020.filter(
    (data) => data.continent === "North America"
  );
  const southAmericaSummer2020 = dataSummer2020.filter(
    (data) => data.continent === "South America"
  );
  const oceaniaSummer2020 = dataSummer2020.filter(
    (data) => data.continent === "Oceania"
  );

  const dataAutumn2020 = filterDates(data, "22/09/2020", "21/12/2020");

  const asiaAutumn2020 = dataAutumn2020.filter(
    (data) => data.continent === "Asia"
  );
  const europeAutumn2020 = dataAutumn2020.filter(
    (data) => data.continent === "Europe"
  );
  const africaAutumn2020 = dataAutumn2020.filter(
    (data) => data.continent === "Africa"
  );
  const northAmericaAutumn2020 = dataAutumn2020.filter(
    (data) => data.continent === "North America"
  );
  const southAmericaAutumn2020 = dataAutumn2020.filter(
    (data) => data.continent === "South America"
  );
  const oceaniaAutumn2020 = dataAutumn2020.filter(
    (data) => data.continent === "Oceania"
  );

   const dataWinter2021 = filterDates(data, "21/12/2020", "20/03/2021");

   const asiaWinter2021 = dataWinter2021.filter(data => data.continent === "Asia")
   const europeWinter2021 = dataWinter2021.filter(data => data.continent === "Europe")
   const africaWinter2021 = dataWinter2021.filter(data => data.continent === "Africa")
   const northAmericaWinter2021 = dataWinter2021.filter(data => data.continent === "North America")
   const southAmericaWinter2021 = dataWinter2021.filter(data => data.continent === "South America")
   const oceaniaWinter2021 = dataWinter2021.filter(data => data.continent === "Oceania")

   const dataSpring2021 = filterDates(data, "20/03/2021", "21/06/2021");

  const asiaSpr2021 = dataSpring2021.filter(data => data.continent === "Asia")
  const europeSpr2021 = dataSpring2021.filter(data => data.continent === "Europe")
  const africaSpr2021 = dataSpring2021.filter(data => data.continent === "Africa")
  const northAmericaSpr2021 = dataSpring2021.filter(data => data.continent === "North America")
  const southAmericaSpr2021 = dataSpring2021.filter(data => data.continent === "South America")
  const oceaniaSpr2021 = dataSpring2021.filter(data => data.continent === "Oceania")

  const dataSummer2021 = filterDates(data, "21/06/2021", "22/09/2021");

  const asiaSummer2021 = dataSummer2021.filter(data => data.continent === "Asia")
  const europeSummer2021 = dataSummer2021.filter(data => data.continent === "Europe")
  const africaSummer2021 = dataSummer2021.filter(data => data.continent === "Africa")
  const northAmericaSummer2021 = dataSummer2021.filter(data => data.continent === "North America")
  const southAmericaSummer2021 = dataSummer2021.filter(data => data.continent === "South America")
  const oceaniaSummer2021 = dataSummer2021.filter(data => data.continent === "Oceania")

  const dataAutumn2021 = filterDates(data, "22/09/2021", "21/12/2021");

  const asiaAutumn2021 = dataAutumn2021.filter(data => data.continent === "Asia")
  const europeAutumn2021 = dataAutumn2021.filter(data => data.continent === "Europe")
  const africaAutumn2021 = dataAutumn2021.filter(data => data.continent === "Africa")
  const northAmericaAutumn2021 = dataAutumn2021.filter(data => data.continent === "North America")
  const southAmericaAutumn2021 = dataAutumn2021.filter(data => data.continent === "South America")
  const oceaniaAutumn2021 = dataAutumn2021.filter(data => data.continent === "Oceania")

  const dataWinter2022 = filterDates(data, "21/12/2021", "20/03/2022");

  const asiaWinter2022 = dataWinter2022.filter(data => data.continent === "Asia")
   const europeWinter2022 = dataWinter2022.filter(data => data.continent === "Europe")
   const africaWinter2022 = dataWinter2022.filter(data => data.continent === "Africa")
   const northAmericaWinter2022 = dataWinter2022.filter(data => data.continent === "North America")
   const southAmericaWinter2022 = dataWinter2022.filter(data => data.continent === "South America")
   const oceaniaWinter2022 = dataWinter2022.filter(data => data.continent === "Oceania")

  const dataSpring2022 = filterDates(data, "20/03/2022", "21/06/2022");

  const asiaSpr2022 = dataSpring2022.filter(data => data.continent === "Asia")
  const europeSpr2022 = dataSpring2022.filter(data => data.continent === "Europe")
  const africaSpr2022 = dataSpring2022.filter(data => data.continent === "Africa")
  const northAmericaSpr2022 = dataSpring2022.filter(data => data.continent === "North America")
  const southAmericaSpr2022 = dataSpring2022.filter(data => data.continent === "South America")
  const oceaniaSpr2022 = dataSpring2022.filter(data => data.continent === "Oceania")

  const dataSummer2022 = filterDates(data, "21/06/2022", "23/09/2022");

  const asiaSummer2022 = dataSummer2022.filter(data => data.continent === "Asia")
  const europeSummer2022 = dataSummer2022.filter(data => data.continent === "Europe")
  const africaSummer2022 = dataSummer2022.filter(data => data.continent === "Africa")
  const northAmericaSummer2022 = dataSummer2022.filter(data => data.continent === "North America")
  const southAmericaSummer2022 = dataSummer2022.filter(data => data.continent === "South America")
  const oceaniaSummer2022 = dataSummer2022.filter(data => data.continent === "Oceania")

  const dataAutumn2022 = filterDates(data, "23/09/2022", "21/12/2022");

  const asiaAutumn2022 = dataAutumn2022.filter(data => data.continent === "Asia")
  const europeAutumn2022 = dataAutumn2022.filter(data => data.continent === "Europe")
  const africaAutumn2022 = dataAutumn2022.filter(data => data.continent === "Africa")
  const northAmericaAutumn2022 = dataAutumn2022.filter(data => data.continent === "North America")
  const southAmericaAutumn2022 = dataAutumn2022.filter(data => data.continent === "South America")
  const oceaniaAutumn2022 = dataAutumn2022.filter(data => data.continent === "Oceania")

  const winter2020 = [
    asiaWinter2020,
    europeWinter2020,
    africaWinter2020,
    northAmericaWinter2020,
    southAmericaWinter2020,
    oceaniaWinter2020,
  ];
  const spring2020 = [
    asiaSpr2020,
    europeSpr2020,
    africaSpr2020,
    northAmericaSpr2020,
    southAmericaSpr2020,
    oceaniaSpr2020,
  ];
  const summer2020 = [
    asiaSummer2020,
    europeSummer2020,
    africaSummer2020,
    northAmericaSummer2020,
    southAmericaSummer2020,
    oceaniaSummer2020,
  ];
  const autumn2020 = [
    asiaAutumn2020,
    europeAutumn2020,
    africaAutumn2020,
    northAmericaAutumn2020,
    southAmericaAutumn2020,
    oceaniaAutumn2020,
  ];

  const winter2021 = [asiaWinter2021, europeWinter2021, africaWinter2021, northAmericaWinter2021, southAmericaWinter2021, oceaniaWinter2021];
  const spring2021 = [asiaSpr2021, europeSpr2021, africaSpr2021,
    northAmericaSpr2021, southAmericaSpr2021, oceaniaSpr2021];
  const summer2021 = [asiaSummer2021, europeSummer2021, africaSummer2021, northAmericaSummer2021, southAmericaSummer2021, oceaniaSummer2021];
  const autumn2021 = [asiaAutumn2021, europeAutumn2021, africaAutumn2021,
      northAmericaAutumn2021, southAmericaAutumn2021, oceaniaAutumn2021];

  const winter2022 = [asiaWinter2022, europeWinter2022, africaWinter2022, northAmericaWinter2022, southAmericaWinter2022, oceaniaWinter2022];
  const spring2022 = [asiaSpr2022, europeSpr2022, africaSpr2022,
    northAmericaSpr2022, southAmericaSpr2022, oceaniaSpr2022];
  const summer2022 = [asiaSummer2022, europeSummer2022, africaSummer2022, northAmericaSummer2022, southAmericaSummer2022, oceaniaSummer2022];
  const autumn2022 = [asiaAutumn2022, europeAutumn2022, africaAutumn2022,
    northAmericaAutumn2022, southAmericaAutumn2022, oceaniaAutumn2022];

  const chartDataWinter2020 = prepareLineChartData(
    winter2020,
    continents,
    colors
  );
  const chartDataSpring2020 = prepareLineChartData(
    spring2020,
    continents,
    colors
  );
  const chartDataSummer2020 = prepareLineChartData(
    summer2020,
    continents,
    colors
  );
  const chartDataAutumn2020 = prepareLineChartData(
    autumn2020,
    continents,
    colors
  );

  const chartDataWinter2021 = prepareLineChartData(winter2021, continents, colors);
  const chartDataSpring2021 = prepareLineChartData(spring2021, continents, colors);
  const chartDataSummer2021 = prepareLineChartData(summer2021, continents, colors);
  const chartDataAutumn2021 = prepareLineChartData(autumn2021, continents, colors);

  const chartDataWinter2022 = prepareLineChartData(winter2022, continents, colors);
  const chartDataSpring2022 = prepareLineChartData(spring2022, continents, colors);
  const chartDataSummer2022 = prepareLineChartData(summer2022, continents, colors);
  const chartDataAutumn2022 = prepareLineChartData(autumn2022, continents, colors);

//   scatter plots data
  const scatterDataWinter2020 = prepareScatterPlotData(chartDataWinter2020);
  const scatterDataSpring2020 = prepareScatterPlotData(chartDataSpring2020);
  const scatterDataSummer2020 = prepareScatterPlotData(chartDataSummer2020);
  const scatterDataAutumn2020 = prepareScatterPlotData(chartDataAutumn2020);

  const scatterDataWinter2021 = prepareScatterPlotData(chartDataWinter2021);
  const scatterDataSpring2021 = prepareScatterPlotData(chartDataSpring2021);
  const scatterDataSummer2021 = prepareScatterPlotData(chartDataSummer2021);
  const scatterDataAutumn2021 = prepareScatterPlotData(chartDataAutumn2021);

  const scatterDataWinter2022 = prepareScatterPlotData(chartDataWinter2022);
  const scatterDataSpring2022 = prepareScatterPlotData(chartDataSpring2022);
  const scatterDataSummer2022 = prepareScatterPlotData(chartDataSummer2022);
  const scatterDataAutumn2022 = prepareScatterPlotData(chartDataAutumn2022);

  const margin = { top: 80, right: 40, bottom: 40, left: 70 };
  const width = 450 - margin.right - margin.left;
  const height = 380 - margin.top - margin.bottom;

  // Draw base.
  const svg = d3
    .select(`.line-chart-container`)
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
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  // .ticks(20);
  const xAxisDraw = svg
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  const yScale = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis = d3
    .axisLeft(yScale)
    .ticks(20)
    .tickFormat(function (d) {
      if (d >= 1000000000) {
        return (d / 1000000000).toFixed(1) + "bl";
      } else if (d >= 1000000) {
        return (d / 1000000).toFixed(1) + "mil";
      } else {
        return (d / 1000).toFixed(0) + "k";
      }
    })
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw = svg.append("g").attr("class", "yAxis").call(yAxis);

  // Adding Y axis label
  addYAxisLabel(svg, -150, -40, "Total Cases");

  //    Draw header and subheader.
  const header = svg
    .append("g")
    .attr("class", "scatter-header")
    .attr("transform", `translate(70, -40)`)
    .append("text");
  // first title
  header.append("tspan").transition().text("Total cases per continent");

  const subheader = header.append("tspan");

  subheader
    .attr("x", 50)
    .attr("dy", "1.5em")
    .style("font-size", "0.8em")
    .style("fill", "#555");

  //////////////////////////////////////////////////////////////////
  //second svg
  ///////////////////////////////////////////////////////////
  // Draw base.
  const svg1 = d3
    .select(`.line-chart-container1`)
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
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  // .ticks(20);
  const xAxisDraw1 = svg1
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis1);

  const yScale1 = d3.scaleLinear().range([height, 0]);

  // Draw y axis.
  const yAxis1 = d3
    .axisLeft(yScale1)
    .ticks(20)
    .tickFormat(function (d) {
      if (d >= 1000000000) {
        return (d / 1000000000).toFixed(1) + "bl";
      } else if (d >= 1000000) {
        return (d / 1000000).toFixed(1) + "mil";
      } else {
        return (d / 1000).toFixed(0) + "k";
      }
    })
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw1 = svg1.append("g").attr("class", "yAxis").call(yAxis1);

  // Adding Y axis label
  addYAxisLabel(svg1, -150, -40, "Total Cases");

  //    Draw header and subheader.
  const header1 = svg1
    .append("g")
    .attr("class", "scatter-header1")
    .attr("transform", `translate(70, -40)`)
    .append("text");
  // first title
  header1.append("tspan").transition().text("Total cases per continent");

  const subheader1 = header1.append("tspan");

  subheader1
    .attr("x", 50)
    .attr("dy", "1.5em")
    .style("font-size", "0.8em")
    .style("fill", "#555");

  //////////////////////////////////////////////////////////////////
  //third svg
  ///////////////////////////////////////////////////////////
  // Draw base.
  const svg2 = d3
    .select(`.line-chart-container2`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale data.
  // shows the dates
  const xScale2 = d3.scaleTime().range([0, width]);
  // Draw x axis.
  const xAxis2 = d3
    .axisBottom(xScale2)
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  // .ticks(20);
  const xAxisDraw2 = svg2
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis2);

  const yScale2 = d3.scaleLinear().range([height, 0]);

  // telling the generator where it can find x and y positions

  // Draw y axis.
  const yAxis2 = d3
    .axisLeft(yScale2)
    .ticks(20)
    .tickFormat(function (d) {
      if (d >= 1000000000) {
        return (d / 1000000000).toFixed(1) + "bl";
      } else if (d >= 1000000) {
        return (d / 1000000).toFixed(1) + "mil";
      } else {
        return (d / 1000).toFixed(0) + "k";
      }
    })
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw2 = svg2.append("g").attr("class", "yAxis").call(yAxis2);

  // Adding Y axis label
  addYAxisLabel(svg2, -150, -40, "Total Cases");

  //    Draw header and subheader.
  const header2 = svg2
    .append("g")
    .attr("class", "scatter-header2")
    .attr("transform", `translate(70, -40)`)
    .append("text");
  // first title
  header2.append("tspan").transition().text("Total cases per continent");

  const subheader2 = header2.append("tspan");

  subheader2
    .attr("x", 50)
    .attr("dy", "1.5em")
    .style("font-size", "0.8em")
    .style("fill", "#555");

  //////////////////////////////////////////////////////////////////
  //fourth svg
  ///////////////////////////////////////////////////////////
  // Draw base.
  const svg3 = d3
    .select(`.line-chart-container3`)
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
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height);
  // .ticks(20);
  const xAxisDraw3 = svg3
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis3);

  const yScale3 = d3.scaleLinear().range([height, 0]);

  // telling the generator where it can find x and y positions

  // Draw y axis.
  const yAxis3 = d3
    .axisLeft(yScale3)
    .ticks(20)
    .tickFormat(function (d) {
      if (d >= 1000000000) {
        return (d / 1000000000).toFixed(1) + "bl";
      } else if (d >= 1000000) {
        return (d / 1000000).toFixed(1) + "mil";
      } else {
        return (d / 1000).toFixed(0) + "k";
      }
    })
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw3 = svg3.append("g").attr("class", "yAxis").call(yAxis3);

  // Adding Y axis label
  addYAxisLabel(svg3, -150, -40, "Total Cases");
  //    Draw header and subheader.
  const header3 = svg3
    .append("g")
    .attr("class", "scatter-header3")
    .attr("transform", `translate(70, -40)`)
    .append("text");
  // first title
  header3.append("tspan").transition().text("Total cases per continent");

  const subheader3 = header3.append("tspan");

  subheader3
    .attr("x", 50)
    .attr("dy", "1.5em")
    .style("font-size", "0.8em")
    .style("fill", "#555");
  //////////////////////////////////////////////////////////////////////////////////
  ///////////Scatter plots
  ///////////////////////////////////////////////////////////////////////////////////
  /// Scatter plt 1
  // ///////////////////////////////////////////////////////////////
  const svgScatter = d3
    .select(`.scatter-plot-container`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scales.
  const xScaleScatter = d3.scaleLinear().range([0, width]);

  const yScaleScatter = d3.scaleLinear().range([height, 0]);

  const xAxisScatter = d3
    .axisBottom(xScaleScatter)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-height)
    .tickSizeOuter(0);

  // Draw y axis.
  const yAxisScatter = d3
    .axisLeft(yScaleScatter)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-width)
    .tickSizeOuter(0);

  const xAxisDrawScatter = svgScatter
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisScatter);

  const yAxisDrawScatter = svgScatter
    .append("g")
    .attr("class", "yAxis")
    .call(yAxisScatter);

    // Adding labels to axis
    addXAxisLabel(svgScatter, 220, 290,"GDP per capita (USD)");
    addYAxisLabel(svgScatter,-190,-40," Total cases per million");

      //    Draw header and subheader.
  const headerScatter = svgScatter
  .append("g")
  .attr("class", "scatter-header")
  .attr("transform", `translate(0, -40)`)
  .append("text");
// first title
headerScatter.append("tspan").transition().text("Top 5 countries in total cases per continent");

const subheaderScatter = headerScatter.append("tspan");

subheaderScatter
  .attr("x", 130)
  .attr("dy", "1.5em")
  .style("font-size", "0.8em")
  .style("fill", "#555");

  //////////////////////////////////////////////////
  /// Scatter plt 2
  // ///////////////////////////
  const svgScatter1 = d3
    .select(`.scatter-plot-container1`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  // Scales.
  const xScaleScatter1 = d3.scaleLinear().range([0, width]);

  const yScaleScatter1 = d3.scaleLinear().range([height, 0]);

  const xAxisScatter1 = d3
    .axisBottom(xScaleScatter1)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-height)
    .tickSizeOuter(0);

  // Draw y axis.
  const yAxisScatter1 = d3
    .axisLeft(yScaleScatter1)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-width)
    .tickSizeOuter(0);

  const xAxisDrawScatter1 = svgScatter1
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisScatter1);

  const yAxisDrawScatter1 = svgScatter1
    .append("g")
    .attr("class", "yAxis")
    .call(yAxisScatter1);
  addXAxisLabel(svgScatter1, 220, 290,"GDP per capita (USD)");
  addYAxisLabel(svgScatter1,-190,-40," Total cases per million");

  
      //    Draw header and subheader.
      const headerScatter1 = svgScatter1
      .append("g")
      .attr("class", "scatter-header")
      .attr("transform", `translate(0, -40)`)
      .append("text");
    // first title
    headerScatter1.append("tspan").transition().text("Top 5 countries in total cases per continent");
    
    const subheaderScatter1 = headerScatter1.append("tspan");

    subheaderScatter1
  .attr("x", 130)
  .attr("dy", "1.5em")
  .style("font-size", "0.8em")
  .style("fill", "#555");

  //////////////////////////////////////////////////
  /// Scatter plt 3
  // ///////////////////////////
  const svgScatter2 = d3
    .select(`.scatter-plot-container2`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  // Scales.
  const xScaleScatter2 = d3.scaleLinear().range([0, width]);

  const yScaleScatter2 = d3.scaleLinear().range([height, 0]);

  const xAxisScatter2 = d3
    .axisBottom(xScaleScatter2)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-height)
    .tickSizeOuter(0);

  // Draw y axis.
  const yAxisScatter2 = d3
    .axisLeft(yScaleScatter2)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-width)
    .tickSizeOuter(0);

  const xAxisDrawScatter2 = svgScatter2
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisScatter2);

  const yAxisDrawScatter2 = svgScatter2
    .append("g")
    .attr("class", "yAxis")
    .call(yAxisScatter2);

  addXAxisLabel(svgScatter2, 220, 290,"GDP per capita (USD)");
  addYAxisLabel(svgScatter2,-190,-40," Total cases per million");

  
      //    Draw header and subheader.
      const headerScatter2 = svgScatter2
      .append("g")
      .attr("class", "scatter-header")
      .attr("transform", `translate(0, -40)`)
      .append("text");
    // first title
    headerScatter2.append("tspan").transition().text("Top 5 countries in total cases per continent");
    
    const subheaderScatter2 = headerScatter2.append("tspan");

    subheaderScatter2
  .attr("x", 130)
  .attr("dy", "1.5em")
  .style("font-size", "0.8em")
  .style("fill", "#555");
  //////////////////////////////////////////////////
  /// Scatter plt 4
  // ///////////////////////////
  const svgScatter3 = d3
    .select(`.scatter-plot-container3`)
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  // Scales.
  const xScaleScatter3 = d3.scaleLinear().range([0, width]);

  const yScaleScatter3 = d3.scaleLinear().range([height, 0]);

  const xAxisScatter3 = d3
    .axisBottom(xScaleScatter3)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-height)
    .tickSizeOuter(0);

  // Draw y axis.
  const yAxisScatter3 = d3
    .axisLeft(yScaleScatter3)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-width)
    .tickSizeOuter(0);

  const xAxisDrawScatter3 = svgScatter3
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisScatter3);

  const yAxisDrawScatter3 = svgScatter3
    .append("g")
    .attr("class", "yAxis")
    .call(yAxisScatter3);

    addXAxisLabel(svgScatter3, 220, 290,"GDP per capita (USD)");
    addYAxisLabel(svgScatter3,-190,-40," Total cases per million");

    
      //    Draw header and subheader.
  const headerScatter3 = svgScatter3
  .append("g")
  .attr("class", "scatter-header")
  .attr("transform", `translate(0, -40)`)
  .append("text");
// first title
headerScatter3.append("tspan").transition().text("Top 5 countries in total cases per continent");

const subheaderScatter3 = headerScatter3.append("tspan");

subheaderScatter3
  .attr("x", 130)
  .attr("dy", "1.5em")
  .style("font-size", "0.8em")
  .style("fill", "#555");

  // Click handler.
  function click() {
    const name = this.dataset.name;

    if (name === "twenty") {
      updateLineChart(chartDataWinter2020, xScale, yScale, svg, xAxis, yAxis,subheader, "Winter 2020");
      updateLineChart(chartDataSpring2020, xScale1, yScale1, svg1, xAxis1, yAxis1, subheader1, "Spring 2020");
      updateLineChart(chartDataSummer2020, xScale2, yScale2, svg2, xAxis2, yAxis2,subheader2, "Summer 2020");
      updateLineChart(chartDataAutumn2020, xScale3, yScale3, svg3, xAxis3, yAxis3, subheader3, "Autumn 2020")
      updateScatterPlot(scatterDataWinter2020, xScaleScatter, yScaleScatter, svgScatter, xAxisScatter, yAxisScatter, subheaderScatter, "Winter 2020");
      updateScatterPlot(scatterDataSpring2020, xScaleScatter1, yScaleScatter1, svgScatter1, xAxisScatter1, yAxisScatter1, subheaderScatter1, "Spring 2020");
      updateScatterPlot(scatterDataSummer2020, xScaleScatter2, yScaleScatter2, svgScatter2, xAxisScatter2, yAxisScatter2, subheaderScatter2, "Summer 2020");
      updateScatterPlot(scatterDataAutumn2020, xScaleScatter3, yScaleScatter3, svgScatter3, xAxisScatter3, yAxisScatter3, subheaderScatter3, "Autumn 2020");
    } else if (name === "twentyone") {
      updateLineChart(chartDataWinter2021, xScale, yScale, svg, xAxis, yAxis, subheader, "Winter 2021");
      updateLineChart(chartDataSpring2021, xScale1, yScale1, svg1, xAxis1, yAxis1, subheader1, "Spring 2021");
      updateLineChart(chartDataSummer2021, xScale2, yScale2, svg2, xAxis2, yAxis2, subheader2,  "Summer 2021");
      updateLineChart(chartDataAutumn2021, xScale3, yScale3, svg3, xAxis3, yAxis3, subheader3, "Autumn 2021");
      updateScatterPlot(scatterDataWinter2021, xScaleScatter, yScaleScatter, svgScatter, xAxisScatter, yAxisScatter, subheaderScatter, "Winter 2021");
      updateScatterPlot(scatterDataSpring2021, xScaleScatter1, yScaleScatter1, svgScatter1, xAxisScatter1, yAxisScatter1, subheaderScatter1, "Spring 2021");
      updateScatterPlot(scatterDataSummer2021, xScaleScatter2, yScaleScatter2, svgScatter2, xAxisScatter2, yAxisScatter2, subheaderScatter2, "Summer 2021");
      updateScatterPlot(scatterDataAutumn2021, xScaleScatter3, yScaleScatter3, svgScatter3, xAxisScatter3, yAxisScatter3, subheaderScatter3, "Autumn 2021");
    } else if (name === "twentytwo") {
      updateLineChart(chartDataWinter2022, xScale, yScale, svg, xAxis, yAxis, subheader, "Winter 2022");
      updateLineChart(chartDataSpring2022, xScale1, yScale1, svg1, xAxis1, yAxis1, subheader1, "Spring 2022");
      updateLineChart(chartDataSummer2022, xScale2, yScale2, svg2, xAxis2, yAxis2, subheader2, "Summer 2022");
      updateLineChart(chartDataAutumn2022, xScale3, yScale3, svg3, xAxis3, yAxis3, subheader3, "Autumn 2022");
      updateScatterPlot(scatterDataWinter2022, xScaleScatter, yScaleScatter, svgScatter, xAxisScatter, yAxisScatter, subheaderScatter, "Winter 2022");
      updateScatterPlot(scatterDataSpring2022, xScaleScatter1, yScaleScatter1, svgScatter1, xAxisScatter1, yAxisScatter1,subheaderScatter1, "Spring 2022");
      updateScatterPlot(scatterDataSummer2022, xScaleScatter2, yScaleScatter2, svgScatter2, xAxisScatter2, yAxisScatter2, subheaderScatter2, "Summer 2022");
      updateScatterPlot(scatterDataAutumn2022, xScaleScatter3, yScaleScatter3, svgScatter3, xAxisScatter3, yAxisScatter3, subheaderScatter2, "Autumn 2022");
    }
  }

  d3.selectAll("#seasons").on("click", click);
  // initiating line charts
  updateLineChart(chartDataWinter2020, xScale, yScale, svg, xAxis, yAxis, subheader, "Winter 2020");
  updateLineChart(chartDataSpring2020, xScale1, yScale1, svg1, xAxis1, yAxis1, subheader1, "Spring 2020");
  updateLineChart(chartDataSummer2020, xScale2, yScale2, svg2, xAxis2, yAxis2, subheader2, "Summer 2020");
  updateLineChart(chartDataAutumn2020, xScale3, yScale3, svg3, xAxis3, yAxis3, subheader3, "Autumn 2020");

  // initiating scatter plots
  updateScatterPlot(scatterDataWinter2020, xScaleScatter, yScaleScatter, svgScatter, xAxisScatter, yAxisScatter, subheaderScatter, "Winter 2020");
  updateScatterPlot(scatterDataSpring2020, xScaleScatter1, yScaleScatter1, svgScatter1, xAxisScatter1, yAxisScatter1, subheaderScatter1, "Spring 2020");
  updateScatterPlot(scatterDataSummer2020, xScaleScatter2, yScaleScatter2, svgScatter2, xAxisScatter2, yAxisScatter2, subheaderScatter2, "Summer 2020");
  updateScatterPlot(scatterDataAutumn2020, xScaleScatter3, yScaleScatter3, svgScatter3, xAxisScatter3, yAxisScatter3, subheaderScatter3,"Autumn 2020");
}

// Type conversion, loops through the data and returns the correct datatypes.
// It is like a JS map function
// using + plus operator to convert all strings to integers
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
    total_cases_per_million: +d.total_cases_per_million,
  };
}

// Load data using the type method for the type conversion
d3.csv("data/covid_data.csv", type).then((res) => {
  // sending data to the ready function, this will be the main function of the app
  console.log("res", res);
  ready(res);
});
