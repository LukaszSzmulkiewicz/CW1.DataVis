import {filterDates, prepareLineChartData, formatTicks, prepareScatterPlotData, filterDatesNew} from "./helper.js";
import { drawLineChart, updateLineChart } from "./draw.js";

function addScatterCirc(svg, xScaleScatter, yScaleScatter, data){
  svg
      .append('g')
      .selectAll("circle")
      .data(data,  function(d){return d})
      .enter()
        .append("circle")
          .transition()
          .duration(1500)
          .attr('class', d => `circle-series ${d.label.toLowerCase()}`)
          .attr('cx', d => xScaleScatter(d.gdp_per_capita))
          .attr('cy', d => yScaleScatter(d.total_cases_per_million))
          .attr('r', 3)
          .style('fill', d => d.color)
          // makes the circles lighter so can distinguish one from the other when one is positioned on the other
          .attr('fill-opacity', 0.6),
          
          
        update => update
          .transition()
          .duration(1500)
          .attr('cx', d => xScaleScatter(d.gdp_per_capita))
          .attr('cy', d => yScaleScatter(d.total_cases_per_million))
          .attr('r', 3)
          .style('fill', d => d.color),
    
        exit => exit.remove()
      
      
}



function updateScatterPlot (data, containerName){
  // dimentions
  const margin = { top: 80, right: 60, bottom: 40, left: 60 };
  const width = 450 - margin.right - margin.left;
  const height = 380 - margin.top - margin.bottom;
    // Scales.
    const xExtentsScatter = d3
    .extent(data.minMaxGDP)
    // mapping over the extent values and slightly changing their size;
    // .map((d, i) => (i===0? d * 0.95 : d * 1.05))
    .domain(xExtentsScatter)
    .range([0, width])

  const yExtentScatter = d3
  .extent(data.minMaxCases)
  // // .map((d, i) => (i === 0 ? d * 0.1 : d * 1.1));
  const yScaleScatter = d3
    .scaleLinear()
    .domain(yExtentScatter)
    .range([height, 0]);
  // Draw base.
  const svgScatter = d3
    .select(`${containerName}`)
    

    const xAxisScatter = d3
    .axisBottom(xScaleScatter)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-height)
    .tickSizeOuter(0)

  // // Draw header.
  // const header = svg
  //   .append('g')
  //   .attr('class', 'scatter-header')
  //   .attr('transform', `translate(0, ${-margin.top * 0.5 })`)
  //   .append('text')
  // // first title
  // header.append('tspan').text('Budget vs Revenue in $US')
  // // second title
  // header
  //   .append('tspan')
  //   .attr('x', 0)
  //   .attr('dy', '1.5em')
  //   .style('font-size', '0.8em')
  //   // choosing color of the text 
  //   .style('fill', '#555')
  //   .text('Top 100 films by budget, 2000-2009')
  // // Draw x axis.


  // // function copies last value on from the axis and turns it into a label 

  const xAxisDrawScatter = svgScatter
    .append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxisScatter)
    // calling add label function and passing the parameters 
    // .call(addLabel, 'Budget', 25);

  // // moving the text away from the bottom axis 
  // xAxisDraw.selectAll('text').attr('dy', '1em');
    
    // Draw y axis.
    const yAxisScatter = d3
    .axisLeft(yScaleScatter)
    // to specify number of ticks
    .ticks(10)
    .tickFormat(formatTicks)
    .tickSizeInner(-width)
    .tickSizeOuter(0)

    // doesn't need a translate since it starts at the origin  
  const yAxisDrawScatter = svgScatter
    .append('g')
    .attr('class', 'yAxis')
    .call(yAxisScatter)
    // .call(addLabel, 'Revenue', 5)


  // Draw scatter 
    addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[0].objects);
    addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[1].objects);
    addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[2].objects);
    addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[3].objects);
    addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[4].objects);
    addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[5].objects);
}


 
  // Main function.
  function ready(data) {

    const continents = ["Asia", "Europe", "Africa", "N. America", "S. America", "Oceania"];
    const colors = ["dodgerblue", "darkorange", "green", "red", "purple", "blue"];

   
    const dataWinter2020 = filterDates(data, "22/12/2019", "20/03/2020");

    const asiaWinter2020 = dataWinter2020.filter(data => data.continent === "Asia")
    const europeWinter2020 = dataWinter2020.filter(data => data.continent === "Europe")
    const africaWinter2020 = dataWinter2020.filter(data => data.continent === "Africa")
    const northAmericaWinter2020 = dataWinter2020.filter(data => data.continent === "North America")
    const southAmericaWinter2020 = dataWinter2020.filter(data => data.continent === "South America")
    const oceaniaWinter2020 = dataWinter2020.filter(data => data.continent === "Oceania")

    // const dataSpring2020 = filterDates(data, "20/03/2020", "20/06/2020");

    // const asiaSpr2020 = dataSpring2020.filter(data => data.continent === "Asia")
    // const europeSpr2020 = dataSpring2020.filter(data => data.continent === "Europe")
    // const africaSpr2020 = dataSpring2020.filter(data => data.continent === "Africa")
    // const northAmericaSpr2020 = dataSpring2020.filter(data => data.continent === "North America")
    // const southAmericaSpr2020 = dataSpring2020.filter(data => data.continent === "South America")
    // const oceaniaSpr2020 = dataSpring2020.filter(data => data.continent === "Oceania")
    
    // const dataSummer2020 = filterDates(data, "22/06/2020", "22/09/2020");

    // const asiaSummer2020 = dataSummer2020.filter(data => data.continent === "Asia")
    // const europeSummer2020 = dataSummer2020.filter(data => data.continent === "Europe")
    // const africaSummer2020 = dataSummer2020.filter(data => data.continent === "Africa")
    // const northAmericaSummer2020 = dataSummer2020.filter(data => data.continent === "North America")
    // const southAmericaSummer2020 = dataSummer2020.filter(data => data.continent === "South America")
    // const oceaniaSummer2020 = dataSummer2020.filter(data => data.continent === "Oceania")

    // const dataAutumn2020 = filterDates(data, "22/09/2020", "21/12/2020");

    // const asiaAutumn2020 = dataAutumn2020.filter(data => data.continent === "Asia")
    // const europeAutumn2020 = dataAutumn2020.filter(data => data.continent === "Europe")
    // const africaAutumn2020 = dataAutumn2020.filter(data => data.continent === "Africa")
    // const northAmericaAutumn2020 = dataAutumn2020.filter(data => data.continent === "North America")
    // const southAmericaAutumn2020 = dataAutumn2020.filter(data => data.continent === "South America")
    // const oceaniaAutumn2020 = dataAutumn2020.filter(data => data.continent === "Oceania")
    
     const dataWinter2021 = filterDates(data, "21/12/2020", "20/03/2021");

     const asiaWinter2021 = dataWinter2021.filter(data => data.continent === "Asia")
     const europeWinter2021 = dataWinter2021.filter(data => data.continent === "Europe")
     const africaWinter2021 = dataWinter2021.filter(data => data.continent === "Africa")
     const northAmericaWinter2021 = dataWinter2021.filter(data => data.continent === "North America")
     const southAmericaWinter2021 = dataWinter2021.filter(data => data.continent === "South America")
     const oceaniaWinter2021 = dataWinter2021.filter(data => data.continent === "Oceania")

    //  const dataSpring2021 = filterDates(data, "20/03/2021", "21/06/2021");
     
    // const asiaSpr2021 = dataSpring2021.filter(data => data.continent === "Asia")
    // const europeSpr2021 = dataSpring2021.filter(data => data.continent === "Europe")
    // const africaSpr2021 = dataSpring2021.filter(data => data.continent === "Africa")
    // const northAmericaSpr2021 = dataSpring2021.filter(data => data.continent === "North America")
    // const southAmericaSpr2021 = dataSpring2021.filter(data => data.continent === "South America")
    // const oceaniaSpr2021 = dataSpring2021.filter(data => data.continent === "Oceania")
    
    // const dataSummer2021 = filterDates(data, "21/06/2021", "22/09/2021");
    
    // const asiaSummer2021 = dataSummer2021.filter(data => data.continent === "Asia")
    // const europeSummer2021 = dataSummer2021.filter(data => data.continent === "Europe")
    // const africaSummer2021 = dataSummer2021.filter(data => data.continent === "Africa")
    // const northAmericaSummer2021 = dataSummer2021.filter(data => data.continent === "North America")
    // const southAmericaSummer2021 = dataSummer2021.filter(data => data.continent === "South America")
    // const oceaniaSummer2021 = dataSummer2021.filter(data => data.continent === "Oceania")
    
    // const dataAutumn2021 = filterDates(data, "22/09/2021", "21/12/2021");

    // const asiaAutumn2021 = dataAutumn2021.filter(data => data.continent === "Asia")
    // const europeAutumn2021 = dataAutumn2021.filter(data => data.continent === "Europe")
    // const africaAutumn2021 = dataAutumn2021.filter(data => data.continent === "Africa")
    // const northAmericaAutumn2021 = dataAutumn2021.filter(data => data.continent === "North America")
    // const southAmericaAutumn2021 = dataAutumn2021.filter(data => data.continent === "South America")
    // const oceaniaAutumn2021 = dataAutumn2021.filter(data => data.continent === "Oceania")

    // const dataWinter2022 = filterDates(data, "21/12/2021", "20/03/2022");

    // const asiaWinter2022 = dataWinter2022.filter(data => data.continent === "Asia")
    //  const europeWinter2022 = dataWinter2022.filter(data => data.continent === "Europe")
    //  const africaWinter2022 = dataWinter2022.filter(data => data.continent === "Africa")
    //  const northAmericaWinter2022 = dataWinter2022.filter(data => data.continent === "North America")
    //  const southAmericaWinter2022 = dataWinter2022.filter(data => data.continent === "South America")
    //  const oceaniaWinter2022 = dataWinter2022.filter(data => data.continent === "Oceania")

    // const dataSpring2022 = filterDates(data, "20/03/2022", "21/06/2022");

    // const asiaSpr2022 = dataSpring2022.filter(data => data.continent === "Asia")
    // const europeSpr2022 = dataSpring2022.filter(data => data.continent === "Europe")
    // const africaSpr2022 = dataSpring2022.filter(data => data.continent === "Africa")
    // const northAmericaSpr2022 = dataSpring2022.filter(data => data.continent === "North America")
    // const southAmericaSpr2022 = dataSpring2022.filter(data => data.continent === "South America")
    // const oceaniaSpr2022 = dataSpring2022.filter(data => data.continent === "Oceania")


    // const dataSummer2022 = filterDates(data, "21/06/2022", "23/09/2022");
    
    // const asiaSummer2022 = dataSummer2022.filter(data => data.continent === "Asia")
    // const europeSummer2022 = dataSummer2022.filter(data => data.continent === "Europe")
    // const africaSummer2022 = dataSummer2022.filter(data => data.continent === "Africa")
    // const northAmericaSummer2022 = dataSummer2022.filter(data => data.continent === "North America")
    // const southAmericaSummer2022 = dataSummer2022.filter(data => data.continent === "South America")
    // const oceaniaSummer2022 = dataSummer2022.filter(data => data.continent === "Oceania")

    // const dataAutumn2022 = filterDates(data, "23/09/2022", "21/12/2022");

    // const asiaAutumn2022 = dataAutumn2022.filter(data => data.continent === "Asia")
    // const europeAutumn2022 = dataAutumn2022.filter(data => data.continent === "Europe")
    // const africaAutumn2022 = dataAutumn2022.filter(data => data.continent === "Africa")
    // const northAmericaAutumn2022 = dataAutumn2022.filter(data => data.continent === "North America")
    // const southAmericaAutumn2022 = dataAutumn2022.filter(data => data.continent === "South America")
    // const oceaniaAutumn2022 = dataAutumn2022.filter(data => data.continent === "Oceania")


    const winter2020 = [asiaWinter2020, europeWinter2020, africaWinter2020, northAmericaWinter2020, southAmericaWinter2020, oceaniaWinter2020];
    // const spring2020 = [asiaSpr2020, europeSpr2020, africaSpr2020, 
    //   northAmericaSpr2020, southAmericaSpr2020, oceaniaSpr2020];
    //   const summer2020 = [asiaSummer2020, europeSummer2020, africaSummer2020, northAmericaSummer2020, southAmericaSummer2020, oceaniaSummer2020];
    // const autumn2020 = [asiaAutumn2020, europeAutumn2020, africaAutumn2020, 
    //   northAmericaAutumn2020, southAmericaAutumn2020, oceaniaAutumn2020];
    
    const winter2021 = [asiaWinter2021, europeWinter2021, africaWinter2021, northAmericaWinter2021, southAmericaWinter2021, oceaniaWinter2021];
    // const spring2021 = [asiaSpr2021, europeSpr2021, africaSpr2021, 
    //   northAmericaSpr2021, southAmericaSpr2021, oceaniaSpr2021];
    // const summer2021 = [asiaSummer2021, europeSummer2021, africaSummer2021, northAmericaSummer2021, southAmericaSummer2021, oceaniaSummer2021];
    // const autumn2021 = [asiaAutumn2021, europeAutumn2021, africaAutumn2021, 
    //     northAmericaAutumn2021, southAmericaAutumn2021, oceaniaAutumn2021];
      
    // const winter2022 = [asiaWinter2022, europeWinter2022, africaWinter2022, northAmericaWinter2022, southAmericaWinter2022, oceaniaWinter2022];
    // const spring2022 = [asiaSpr2022, europeSpr2022, africaSpr2022, 
    //   northAmericaSpr2022, southAmericaSpr2022, oceaniaSpr2022];
    // const summer2022 = [asiaSummer2022, europeSummer2022, africaSummer2022, northAmericaSummer2022, southAmericaSummer2022, oceaniaSummer2022];
    // const autumn2022 = [asiaAutumn2022, europeAutumn2022, africaAutumn2022, 
    //   northAmericaAutumn2022, southAmericaAutumn2022, oceaniaAutumn2022];
 

  
    const chartDataWinter2020 = prepareLineChartData(winter2020, continents, colors);
    // const chartDataWSpring2020 = prepareLineChartData(spring2020, continents, colors);
    // const chartDataWSummer2020 = prepareLineChartData(summer2020, continents, colors);
    // const chartDataWAutumn2020 = prepareLineChartData(autumn2020, continents, colors);

    const chartDataWinter2021 = prepareLineChartData(winter2021, continents, colors);
    // const chartDataWSpring2021 = prepareLineChartData(spring2021, continents, colors);
    // const chartDataWSummer2021 = prepareLineChartData(summer2021, continents, colors);
    // const chartDataWAutumn2021 = prepareLineChartData(autumn2021, continents, colors);

    // const chartDataWinter2022 = prepareLineChartData(winter2022, continents, colors);
    // const chartDataWSpring2022 = prepareLineChartData(spring2022, continents, colors);
    // const chartDataWSummer2022 = prepareLineChartData(summer2022, continents, colors);
    // const chartDataWAutumn2022 = prepareLineChartData(autumn2022, continents, colors);


    // drawLineChart('line-chart-container', chartDataWinter2020, "Covid Data in Winter 2020");
    // drawLineChart('line-chart-container1', chartDataWSpring2020 , "Covid Data in Spring 2020");
    // drawLineChart('line-chart-container2', chartDataWinter2021, "Covid Data in Winter 2020");
    // drawLineChart('line-chart-container3', chartDataWSpring2021 , "Covid Data in Spring 2020");

    // scatter plot data
    const scatterDataWinter2020 = prepareScatterPlotData(chartDataWinter2020);

    
    const margin = { top: 80, right: 60, bottom: 40, left: 60 };
    const width = 450 - margin.right - margin.left;
    const height = 380 - margin.top - margin.bottom;

    // Draw base.
    const svg = d3
      .select(`.line-chart-container`)
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
      .tickSizeOuter(0)
      .tickPadding(12)
      .tickSizeInner(-height)
      // .ticks(20);
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
      .ticks(20)
      .tickFormat(function(d) {
        if (d >= 1000000000) {
            return (d / 1000000000).toFixed(1) + "bl";
        } else if (d >= 1000000) {
            return (d / 1000000).toFixed(1) + "mil";
        } else {
            return (d/1000).toFixed(0)+ "k";
        }
    })
      .tickSizeOuter(0)
      .tickSizeInner(-width)

      const yAxisDraw = svg
      .append('g')
      .attr('class', 'yAxis')
      .call(yAxis);
    
      //////////////////////////////////////////////////////////////////
      //second svg
      ///////////////////////////////////////////////////////////
        // Draw base.
    const svg1 = d3
    .select(`.line-chart-container1`)
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
    .tickSizeOuter(0)
    .tickPadding(12)
    .tickSizeInner(-height)
    // .ticks(20);
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
    .ticks(20)
    .tickFormat(function(d) {
      if (d >= 1000000000) {
          return (d / 1000000000).toFixed(1) + "bl";
      } else if (d >= 1000000) {
          return (d / 1000000).toFixed(1) + "mil";
      } else {
          return (d/1000).toFixed(0)+ "k";
      }
  })
    .tickSizeOuter(0)
    .tickSizeInner(-width)

    const yAxisDraw1 = svg1
    .append('g')
    .attr('class', 'yAxis')
    .call(yAxis1);
  
        //////////////////////////////////////////////////////////////////
      //third svg
      ///////////////////////////////////////////////////////////
        // Draw base.
        const svg2 = d3
        .select(`.line-chart-container2`)
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
      // Scale data.
      // shows the dates
      const xScale2 = d3
      .scaleTime()
      .range([0, width]);
        // Draw x axis.
      const xAxis2 = d3
        .axisBottom(xScale2)
        .tickSizeOuter(0)
        .tickPadding(12)
        .tickSizeInner(-height)
        // .ticks(20);
      const xAxisDraw2 = svg2
        .append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis2)
    
      const yScale2 = d3
      .scaleLinear()
      .range([height, 0]);
      
  // telling the generator where it can find x and y positions 

    // Draw y axis.
    const yAxis2 = d3
    .axisLeft(yScale2)
    .ticks(20)
    .tickFormat(function(d) {
      if (d >= 1000000000) {
          return (d / 1000000000).toFixed(1) + "bl";
      } else if (d >= 1000000) {
          return (d / 1000000).toFixed(1) + "mil";
      } else {
          return (d/1000).toFixed(0)+ "k";
      }
  })
    .tickSizeOuter(0)
    .tickSizeInner(-width)

    const yAxisDraw2 = svg2
    .append('g')
    .attr('class', 'yAxis')
    .call(yAxis2);
    
         //////////////////////////////////////////////////////////////////
      //fourth svg
      ///////////////////////////////////////////////////////////
        // Draw base.
        const svg3 = d3
        .select(`.line-chart-container3`)
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
      // Scale data.
      // shows the dates
      const xScale3 = d3
      .scaleTime()
      .range([0, width]);
        // Draw x axis.
      const xAxis3 = d3
        .axisBottom(xScale3)
        .tickSizeOuter(0)
        .tickPadding(12)
        .tickSizeInner(-height)
        // .ticks(20);
      const xAxisDraw3 = svg3
        .append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis3)
    
      const yScale3 = d3
      .scaleLinear()
      .range([height, 0]);
    
      // telling the generator where it can find x and y positions 
    
        // Draw y axis.
        const yAxis3 = d3
        .axisLeft(yScale3)
        .ticks(20)
        .tickFormat(function(d) {
          if (d >= 1000000000) {
              return (d / 1000000000).toFixed(1) + "bl";
          } else if (d >= 1000000) {
              return (d / 1000000).toFixed(1) + "mil";
          } else {
              return (d/1000).toFixed(0)+ "k";
          }
      })
        .tickSizeOuter(0)
        .tickSizeInner(-width)
    
        const yAxisDraw3 = svg3
        .append('g')
        .attr('class', 'yAxis')
        .call(yAxis3);
      ////////////////////////////////////////////////////////////////
      ///////////Scatter plots
      //////////////////////////////////////////////////
      const svgScatter = d3
      .select(`.scatter-plot-container`)
      .append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
            // Scales.

            const xExtentsScatter = d3
            .extent(scatterDataWinter2020.minMaxGDP)
            const yExtentScatter = d3
            .extent(scatterDataWinter2020.minMaxCases)
        const xScaleScatter = d3.scaleLinear()
        .domain(xExtentsScatter)
        .range([0, width])

        const yScaleScatter = d3.scaleLinear()
            .domain(yExtentScatter)
            .range([height, 0]);

            const xAxisScatter = d3
            .axisBottom(xScaleScatter)
            // to specify number of ticks
            .ticks(10)
            .tickFormat(formatTicks)
            .tickSizeInner(-height)
            .tickSizeOuter(0)
        

             // Draw y axis.
             const yAxisScatter = d3
             .axisLeft(yScaleScatter)
             // to specify number of ticks
             .ticks(10)
             .tickFormat(formatTicks)
             .tickSizeInner(-width)
             .tickSizeOuter(0)
         
            const xAxisDrawScatter = svgScatter
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxisScatter)

           const yAxisDrawScatter = svgScatter
             .append('g')
             .attr('class', 'yAxis')
             .call(yAxisScatter)
             // .call(addLabel, 'Revenue', 5)

        function drawScatterPlot (data, xScaleScatter, yScaleScatter, svgScatter, xAxisScatter, yAxisScatter){
          console.log("data in the scatter", data)
   
               
           
          // // Draw header.
          // const header = svg
          //   .append('g')
          //   .attr('class', 'scatter-header')
          //   .attr('transform', `translate(0, ${-margin.top * 0.5 })`)
          //   .append('text')
          // // first title
          // header.append('tspan').text('Budget vs Revenue in $US')
          // // second title
          // header
          //   .append('tspan')
          //   .attr('x', 0)
          //   .attr('dy', '1.5em')
          //   .style('font-size', '0.8em')
          //   // choosing color of the text 
          //   .style('fill', '#555')
          //   .text('Top 100 films by budget, 2000-2009')
          // // Draw x axis.
        
        
          // // function copies last value on from the axis and turns it into a label 
        
         
            // calling add label function and passing the parameters 
            // .call(addLabel, 'Budget', 25);
        
          // // moving the text away from the bottom axis 
          // xAxisDraw.selectAll('text').attr('dy', '1em');
            
         
        
        
          // Draw scatter 
            addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[0].objects);
            addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[1].objects);
            addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[2].objects);
            addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[3].objects);
            addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[4].objects);
            addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[5].objects);
        }
     
        // Click handler. 
        function click(){
          
          const name = this.dataset.name;
        
          if(name === "twenty"){
            updateLineChart(chartDataWinter2020, xScale, yScale, svg, xAxis, yAxis);
          //   update(chartDataWSpring2020, xScale1, yScale1, svg1, xAxis1, yAxis1);
          //   update(chartDataWSummer2020, xScale2, yScale2, svg2, xAxis2, yAxis2);
          //   update(chartDataWAutumn2020, xScale3, yScale3, svg3, xAxis3, yAxis3)

          }else if (name === "twentyone") {
            updateLineChart(chartDataWinter2021, xScale, yScale, svg, xAxisScatter, yAxisScatter)
            // updateScatterPlot(scatterDataWinter2020, '.scatter-plot-container')
          //   update(chartDataWSpring2021, xScale1, yScale1, svg1, xAxis1, yAxis1)
          //   update(chartDataWSummer2021, xScale2, yScale2, svg2, xAxis2, yAxis2)
          //   update(chartDataWAutumn2021, xScale3, yScale3, svg3, xAxis3, yAxis3)

          }
          // else if (name === "twentytwo") {
          //   update(chartDataWinter2022, xScale, yScale, svg, xAxis, yAxis)
          //   update(chartDataWSpring2022, xScale1, yScale1, svg1, xAxis1, yAxis1)
          //   update(chartDataWSummer2022, xScale2, yScale2, svg2, xAxis2, yAxis2)
          //   update(chartDataWAutumn2022, xScale3, yScale3, svg3, xAxis3, yAxis3)

          // }
        
      }


    d3.selectAll('button').on('click', click);
    updateLineChart(chartDataWinter2020, xScale, yScale, svg, xAxis, yAxis);
    // update(chartDataWSpring2020, xScale1, yScale1, svg1, xAxis1, yAxis1);
    // update(chartDataWSummer2020, xScale2, yScale2, svg2, xAxis2, yAxis2)
    // update(chartDataWAutumn2020, xScale3, yScale3, svg3, xAxis3, yAxis3)
    // function drawScatterPlot(data){
    drawScatterPlot(scatterDataWinter2020, xScaleScatter, yScaleScatter, svgScatter, xAxisScatter, yAxisScatter);
   
    

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
        total_cases: +d.total_cases,
        date: date,
        population: +d.population,
        gdp_per_capita: +d.gdp_per_capita,
        total_cases_per_million: +d.total_cases_per_million,

      };
  }
  
  // Load data using the type method for the type conversion 
  d3.csv('covid_data.csv', type).then(res => {
    // sending data to the ready function, this will be the main function of the app
    console.log("res", res)
    ready(res);
  });

