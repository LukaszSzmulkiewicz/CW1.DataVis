import { preparePieChartDataVacs } from "./data_prep.js";

function addPieCharts(data) {
  // Set the dimensions and margins of the graph
  const width = 450;
  const height = 420;
  const margin = 40;
  const radius = Math.min(width, height) / 2 - margin;




  // Set the data for the pie chart
  const dataGibraltar = preparePieChartDataVacs(data, "Gibraltar");
  const dataPeru = preparePieChartDataVacs(data, "Peru");
  const dataCyprus = preparePieChartDataVacs(data, "Cyprus");
  const dataGermany = preparePieChartDataVacs(data, "Germany");

  


  ////////////////////////////////////////////////////////////////////////
  //////SVG elements
  ////////////////////////////////////////////////////////
   //// First SVG
    // Create the SVG element and set its dimensions
    const svgPie = d3
    .select(`.pie-chart-container`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  // Create a group for the pie chart and position it in the center of the SVG element

    const gPie = svgPie
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  //// Second SVG
    // Create the SVG element and set its dimensions
    const svgPie1 = d3
    .select(`.pie-chart-container1`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create a group for the pie chart and position it in the center of the SVG element
    const gPie1 = svgPie1
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //// Third SVG
    // Create the SVG element and set its dimensions
    const svgPie2 = d3
    .select(`.pie-chart-container2`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create a group for the pie chart and position it in the center of the SVG element
    const gPie2 = svgPie2
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  //// Forth SVG
    // Create the SVG element and set its dimensions
    const svgPie3 = d3
    .select(`.pie-chart-container3`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create a group for the pie chart and position it in the center of the SVG element
    const gPie3 = svgPie3
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  drawPieChartsVacs(dataGibraltar, gPie, radius);
  drawPieChartsVacs(dataPeru, gPie1, radius);
  drawPieChartsVacs(dataCyprus, gPie2, radius);
  drawPieChartsVacs(dataGermany, gPie3, radius);

}

function drawPieChartsVacs(data, g, radius) {

  console.log("data in the pie chart", data[2].vaccinatedPercent)

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseoverPie = function (event, d) {
    tooltip.style("opacity", 1);
    d3.select(this).style("stroke", "black").style("opacity", 1);
  };
  const mousemovePie = function (event, d) {
    const pieData = d3.select(this);
    console.log("data in mouse move", d)
    tooltip
      .html(`${d.data.label}: ${d.data.value}`)
      .style("left", event.x  + "px")
      .style("top", event.y - 990 + "px");
  };
  const mouseleavePie = function (event, d) {
    tooltip.style("opacity", 0);
    d3.select(this).style("stroke", "none").style("opacity", 0.8);
  };


  // Set the colors for the pie chart slices
  const colors = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.label))
    .range(["#4daf4a", "#e41a1c"]);

  // Create the pie chart layout and set its value accessor
  const pie = d3.pie().value((d) => d.value);

  // Create the arc generator and set its inner and outer radii
  const arc = d3
    .arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius);

  // Draw the pie chart slices and add the slice labels
  g.selectAll(".pie-chart")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("class", "pie-chart")
    .attr("d", arc)
    .attr("fill", (d) => colors(d.data.label))
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .on("mouseover", function (event, d) {
      d3.select().style("opacity", 1);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    })
    .on("mousemove", function (event, d) {
      const pieData = d3.select(this);
      console.log("data in mouse move", d)
      d3.select(".tooltip-vacs").style("opacity", 0.9)
      .html(`${d.data.label}: ${d.data.value}`)
      .style("left", event.pageX + "px")
      .style("top", event.pageY - 980 + "px");
    })
    .on("mouseleave", function (event, d) {
      tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    });

        // create a tooltip
    var tooltip = d3
    .select(".vacs-container")
    .append("div")
    .attr("class", "tooltip-vacs")
    .style("opacity", 0);


  // Add the number in the middle of the donut chart
  const text = g
    .append("text")
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .style("font-size", "24px")
    .text(`${data[2].vaccinatedPercent}%`);

  // Calculate the position of the number in the middle of the donut chart
  const textBBox = text.node().getBBox();
  text.attr("transform", `translate(0, ${textBBox.height / 2})`);

}
export { addPieCharts };
