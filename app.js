import {filterDates, prepareLineChartData} from "./helper.js";

// Data preparation.

    // function to filter data 
    
  
   function prepareBarChartData(data) {
    // rollup uses (data- our data, reducer - function that has access to grouped array of observations (all films in each genre), and key)
      const dataMap = d3.rollup(
          data,
          // v for values has an array of action or animation objects, revenue summed up
          v => d3.sum(v, leaf => leaf.revenue),
          // group by genre 
          d => d.genre
        );
        
        // converting the map to the array of objects key at index 0 and value at index 1  
        const dataArray = Array.from(dataMap, d => ({ genre: d[0], revenue: d[1] }));
      
        return dataArray;
      }

        // Click handler. 
function click(){
  console.log(this.dataset.name)
  // const dataset = friends[this.dataset.name];
  // update(dataset);
}

function transition(selection) {
  selection
    .attr('stroke-dasharray', function() { return this.getTotalLength() })
    .attr('stroke-dashoffset', function() { return this.getTotalLength() })
    .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);
}

function drawLineChart(containerName, lineChartData){
      // Dimensions.
      const margin = { top: 80, right: 60, bottom: 40, left: 60 };
      const width = 500 - margin.right - margin.left;
      const height = 500 - margin.top - margin.bottom;
    
      // Scale data.
      // shows the dates
      const xScale = d3
      .scaleTime()
      .domain(d3.extent(lineChartData.dates))
      .range([0, width]);
    
      const yScale = d3
      .scaleLinear()
      .domain([lineChartData.yMin, lineChartData.yMax])
      .range([height, 0]);
    
      // line generator 
      const lineGen = d3
      // calling d3 line to construct line generator 
        .line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value));  
    
      // telling the generator where it can find x and y positions 
    
      // Draw base.
      const svg = d3
        .select(`.${containerName}`)
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
      // Draw x axis.
      const xAxis = d3
        .axisBottom(xScale)
        .tickSizeOuter(0)
        // .ticks(20);
      const xAxisDraw = svg
        .append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)
      // Draw y axis.
      const yAxis = d3
        .axisLeft(yScale)
        .ticks(20)
        .tickSizeOuter(0)
        .tickSizeInner(-width)
    
      const yAxisDraw = svg
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis);
    
        
        
      // Group chart elements.
      const chartGroup = svg.append('g').attr('class', 'line-chart');
     
        // Draw lines.
        chartGroup
        .selectAll('.line-series')
        .data(lineChartData.series)
        .enter()
        .append('path')
        .attr('class', d => `line-series ${d.lblClass.toLowerCase()}`)
        .attr('d', d => lineGen(d.values))
        .style('fill', 'none')
        .style('stroke', d => d.color)
        .style('stroke-width', 3)
        .call(transition); // call transition on the selection
      
     
    
       
      // // Add series Label
      const labelsGroup = chartGroup
        .append('g')
        .selectAll('.series-labels')
        .data(lineChartData.series)
        .enter()
        .append('text')
        .attr('class', d => `series-labels ${d.lblClass.toLowerCase()}`)
        .attr('x', d => d.lblPosition[0])
        .attr('y', d => d.lblPosition[1])
        .text(d => d.name)
        .style('dominant-baseline', 'central')
        .style('font-size', '0.8em')
        .style('font-weight', 'bold')
        .style('fill', d => d.color);
        // .transition()
        // .duration(700) // specify the duration of the transition in milliseconds
        // .ease(d3.easeLinear) // specify the easing function of the transition
        // .attr('opacity', 0.7);
    
      // Rotate xAxis ticks
      d3.selectAll(".xAxis .tick text")
      .attr("transform", "rotate(-25)")

      // Draw header.
      const header = svg
        .append('g')
        .attr('class', 'scatter-header')
        .attr('transform', `translate(0,${-margin.top * 0.6})`)
        .append('text')
       
    
      header.append('tspan').text('Budget and Revenue over time in $US')
    
      header.append('tspan')
      .attr('x', 0)
      .attr('dy', '1.5em')
      .style('font-size', '0.8em')
      .style('fill', '#555')
      .text('Films w/ budget and revenue figures, 2000-2009')

      // Define area generator
        const areaGen = d3.area()
        .x(d => xScale(d.date))
        .y0(yScale(lineChartData.yMin))
        .y1(d => yScale(d.value));

        // Draw area
        chartGroup.selectAll('.area-series')
        .data(lineChartData.series)
        .enter()
        .append('path')
        .attr('class', d => `area-series ${d.lblClass.toLowerCase()}`)
        .attr('d', d => areaGen(d.values))
        .style('fill', "none");
      


      d3.selectAll('.line-series, .series-labels')
      .on('mouseover', function() {
        const className = d3.select(this).attr('class').split(' ')[1];
        // Change the stroke color and width on mouseover depending on the class name
          d3.selectAll(`.${className}`)
          .style('stroke-width', 5)
            .transition()
            .attr('x', 10)
            .style('font-size', '1.2em')
            d3.selectAll(`.area-series.${className}`)
            .style('fill', d=>d.color)
            .style('opacity', 0.1);
       
      
      
      })
      .on('mouseout', function() {
        // Revert the stroke color and width on mouseout
        d3.selectAll('.line-series').style('stroke-width', 3);
        d3.selectAll(".series-labels")
          .transition()
          .attr('x', 0)
          .style('font-size', '0.8em');
          d3.selectAll(`.area-series`)
          .style('fill', "none")
          .style('opacity', 0);
         
      });
}
  
  // Main function.
  function ready(data) {
    d3.selectAll('button').on('click', click); 
    
    const dataWinter2020 = filterDates(data, "22/12/2019", "20/03/2020");
    const dataSpring2020 = filterDates(data, "20/03/2020", "20/06/2020");
    // const dataSummer2020 = filterDates(data, "22/06/2020", "22/09/2020");
    // const dataAutumn2020 = filterDates(data, "22/09/2020", "21/12/2020");
    
    // const dataWinter2021 = filterDates(data, "21/12/2020", "20/03/2021");
    // const dataSpring2021 = filterDates(data, "20/03/2021", "21/06/2021");
    // const dataSummer2021 = filterDates(data, "21/06/2021", "22/09/2021");
    // const dataAutumn2021 = filterDates(data, "22/09/2021", "21/12/2021");

    // const dataWinter2022 = filterDates(data, "21/12/2021", "20/03/2022");
    // const dataSpring2022 = filterDates(data, "20/03/2022", "21/06/2022");
    // const dataSummer2022 = filterDates(data, "21/06/2022", "23/09/2022");
    // const dataAutumn2022 = filterDates(data, "23/09/2022", "21/12/2022");

    const asia = dataWinter2020.filter(data => data.continent === "Asia")
    const europe = dataWinter2020.filter(data => data.continent === "Europe")
    const africa = dataWinter2020.filter(data => data.continent === "Africa")
    const northAmerica = dataWinter2020.filter(data => data.continent === "North America")
    const southAmerica = dataWinter2020.filter(data => data.continent === "South America")
    const oceania = dataWinter2020.filter(data => data.continent === "Oceania")

    const asiaSpr2020 = dataSpring2020.filter(data => data.continent === "Asia")
    const europeSpr2020 = dataSpring2020.filter(data => data.continent === "Europe")
    const africaSpr2020 = dataSpring2020.filter(data => data.continent === "Africa")
    const northAmericaSpr2020 = dataSpring2020.filter(data => data.continent === "North America")
    const southAmericaSpr2020 = dataSpring2020.filter(data => data.continent === "South America")
    const oceaniaSpr2020 = dataSpring2020.filter(data => data.continent === "Oceania")

    const filtered_continents = [asia, europe, africa, northAmerica, southAmerica, oceania];
    const filtered_continentsSpr2020 = [asiaSpr2020, europeSpr2020, africaSpr2020, 
      northAmericaSpr2020, southAmericaSpr2020, oceaniaSpr2020];

    console.log("asia Spr", asiaSpr2020)
    console.log("Europe spr", europeSpr2020)

    const continents = ["Asia", "Europe", "Africa", "N. America", "S. America", "Oceania"]
    const colors = ["dodgerblue", "darkorange", "green", "red", "purple", "blue"]
      const lineChartData = prepareLineChartData(filtered_continents, continents, colors)
      const lineChartData1 = prepareLineChartData(filtered_continentsSpr2020, continents, colors)


  

    // const dataBySeasons = {
    //     2020: [dataWinter2020, dataSpring2020, dataSummer2020, dataAutumn2020 ],
    //     2021:  [dataWinter2021, dataSpring2021, dataSummer2021, dataAutumn2021 ],
    //     2022:  [dataWinter2022, dataSpring2022, dataSummer2022, dataAutumn2022 ],
    //   };
      // const lineChartData1 = prepareLineChartData(europe, europe, "Europe", "orange")

    // function to prepare sorted bar chart data 
    // const barChartData = prepareBarChartData(moviesClean).sort((a, b) => {
    // return d3.descending(a.revenue, b.revenue);
    // });


  // Select the path element with class "line-series europe"
// const path = d3.select(".line-series.europe");

// // Add event listeners for mouseover and mouseout
// path.on("mouseover", function() {
//   // Change the stroke color and width on mouseover
//   d3.select(this)
//     .style("stroke", "red")
//     .style("stroke-width", 4);
// })
// .on("mouseout", function() {
//   // Revert the stroke color and width on mouseout
//   d3.select(this)
//     .style("stroke", "orange")
//     .style("stroke-width", "1");
// });
    drawLineChart('line-chart-container', lineChartData);

    drawLineChart('line-chart-container1', lineChartData1);

  }
  
  // Type conversion, loops through the data and returns the correct datatypes.
  // It is like a JS map function 
  // using + plus operator to convert all strings to integers 
  function type(d) {
    //creating variable for a date 
    const date = d3.timeParse('%d/%m/%Y')(d.date);
    
    return {
        iso_code: d.iso_code,
        continent: d.continent,
        location: d.location,
        total_cases: d.total_cases,
        total_deaths: d.total_deaths,
        date: date
      };
  }
  
  // Load data using the type method for the type conversion 
  d3.csv('covid_data.csv', type).then(res => {
    // sending data to the ready function, this will be the main function of the app
    console.log("res", res)
    ready(res);
  });
  