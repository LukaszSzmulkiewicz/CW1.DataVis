function addPieCharts(data2){
// Set the dimensions and margins of the graph
// Set the dimensions and margins of the graph
const width = 450;
const height = 420;
const margin = 40;
const radius = Math.min(width, height) / 2 - margin;
console.log("data", data2)
const groupByLocation = d3.group(data2, (d) => d.location);
const grouped_country_data = d3.group(groupByLocation.get("Peru"), d => d.date);
console.log("grouped by country", grouped_country_data)
const vaccinated_total = []; 
let temp_vaccinations = 0;

for (const [key, value] of grouped_country_data) {
    let vacs_value = value[0].people_fully_vaccinated
    let pop_value = value[0].population

    if(vacs_value !== 0){
      temp_vaccinations = vacs_value
      vaccinated_total.push([temp_vaccinations, pop_value]);
    }else{
        vaccinated_total.push([temp_vaccinations, pop_value]);
    }
  }
  
  const vaccinatedPercent = (vaccinated_total[vaccinated_total.length-1][0]/vaccinated_total[vaccinated_total.length-1][1] *100).toFixed(2)
  const populationNotVaccinated = vaccinated_total[vaccinated_total.length-1][1] - vaccinated_total[vaccinated_total.length-1][0]
  const populationVaccinated = vaccinated_total[vaccinated_total.length-1][0]
  
  console.log("vacinated", vaccinatedPercent)
// Set the data for the pie chart
const data = [
  {label: "Vaccinated", value: populationVaccinated},
  {label: "Not vaccinated", value: populationNotVaccinated},
];

// Define the tooltip element
// create a tooltip
const tooltip = d3.select("#tooltip")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("position", "relative")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .attr("font-weight", "bold")
    .style("font-size", "24px")
  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event,d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  const mousemove = function(event,d) {
    tooltip
        .html(`${d.data.label}: ${d.data.value}`)
      .style("left", (event.x) + "px")
      .style("top", (event.y)-1200 + "px")
  }
  const mouseleave = function(event,d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }
// Set the colors for the pie chart slices
const colors = d3.scaleOrdinal()
  .domain(data.map(d => d.label))
  .range(["#4daf4a", "#e41a1c"]);

// Create the SVG element and set its dimensions
const svg = d3.select(`.pie-chart-container`)
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create a group for the pie chart and position it in the center of the SVG element
const g = svg.append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create the pie chart layout and set its value accessor
const pie = d3.pie()
  .value(d => d.value);

// Create the arc generator and set its inner and outer radii
const arc = d3.arc()
  .innerRadius(radius * 0.5)
  .outerRadius(radius);

// Draw the pie chart slices and add the slice labels
g.selectAll("path")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("d", arc)
  .attr("fill", d => colors(d.data.label))
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)

// Add the number in the middle of the donut chart
const text = g.append("text")
  .attr("text-anchor", "middle")
  .attr("font-weight", "bold")
  .style("font-size", "24px")
  .text(`${vaccinatedPercent}%`);

// Calculate the position of the number in the middle of the donut chart
const textBBox = text.node().getBBox();
text.attr("transform", `translate(0, ${textBBox.height / 2})`);


}
export {addPieCharts}