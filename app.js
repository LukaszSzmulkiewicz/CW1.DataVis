import {filterDates, prepareLineChartData, filterDatesNew} from "./helper.js";
import { drawLineChart } from "./draw.js";
    function update(lineChartData, xScale, yScale, svg, xAxis, yAxis){
      // Define area generator
      const areaGen = d3.area()
      .x(d => xScale(d.date))
      .y0(yScale(lineChartData.yMin))
      .y1(d => yScale(d.value));

          // line generator 
    const lineGen = d3
    // calling d3 line to construct line generator 
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));  

    // Create the X axis:
    xScale.domain(d3.extent(lineChartData.dates));
   svg.selectAll(".xAxis")
      .transition()
      .duration(1000)
      .call(xAxis);  


      // create the Y axis
      yScale.domain([lineChartData.yMin, lineChartData.yMax])

   svg.selectAll(".yAxis")
     .transition()
     .duration(1000)
     .call(yAxis); 
           // Rotate xAxis ticks
   d3.selectAll(".xAxis .tick text")
   .attr("transform", "rotate(-22)")

   // Create a update selection: bind to the new data
     const u = svg.selectAll('.line-series')
     .data(lineChartData.series, function(d){return d.series})

    // Updata the line
    u
    .join(
      enter => enter
        .append("path")
        .transition()
        .duration(1500)
        .attr('class', d => `line-series ${d.lblClass.toLowerCase()}`)
        .attr("fill", "none")
        .attr('d', d => lineGen(d.values))
        .attr("stroke-width", 2)
        .style('stroke', d => d.color),
        
        
      update => update
        .transition()
        .duration(1500)
        .attr('d', d => lineGen(d.values))
        .style('stroke', d => d.color),

      exit => exit.remove()
    )

    svg
    .selectAll('.series-labels')
    .data(lineChartData.series, function(d){return d.series})
    .join(
      enter => enter
        .append('text')
        .transition()
        .attr('class', d => `series-labels ${d.lblClass.toLowerCase()}`)
        .attr('x', d => d.lblPosition[0])
        .attr('y', d => d.lblPosition[1])
        .text(d => d.name)
        .style('dominant-baseline', 'central')
        .style('font-size', '0.8em')
        .style('font-weight', 'bold')
        .style('fill', d => d.color),
          
        
      update => update
      .attr('class', d => `series-labels ${d.lblClass.toLowerCase()}`)
      .attr('x', d => d.lblPosition[0])
      .attr('y', d => d.lblPosition[1])
      .text(d => d.name)
      .style('dominant-baseline', 'central')
      .style('font-size', '0.8em')
      .style('font-weight', 'bold')
      .style('fill', d => d.color),
     
      exit => exit.remove()
    )
    
 
      d3.selectAll('path').on('mouseover', function(d, i) {
      
        d3.selectAll(`.${i.lblClass.toLowerCase()}`).style('stroke-width', 5)
        d3.selectAll(`.${i.lblClass.toLowerCase()}`)
          .transition()
          .attr('x', 10)
          .style('font-size', '1.2em')
        
      })
      .on("mouseout", function(d, i) {
          d3.selectAll(`.line-series`).style('stroke-width', 2);
          d3.selectAll(`.series-labels`).style('stroke-width', 2)
            .transition()
            .style('font-size', '0.8em')
            .attr('x', 4);
      });;
  
      d3.selectAll('text').on('mouseover', function(d, i) {
        console.log("i", i)
        d3.selectAll(`.${i.lblClass.toLowerCase()}`).style('stroke-width', 5)
        d3.selectAll(`.${i.lblClass.toLowerCase()}`)
          .transition()
          .attr('x', 10)
          .style('font-size', '1.2em')
      })
      .on("mouseout", function(d, i) {
          d3.selectAll(`.line-series`).style('stroke-width', 2);
          d3.selectAll(`.series-labels`).style('stroke-width', 2)
            .transition()
            .attr('x', 4)
            .style('font-size', '0.8em');
       
      });;

    }
  // Main function.
  function ready(data) {

    const continents = ["Asia", "Europe", "Africa", "N. America", "S. America", "Oceania"];
    const colors = ["dodgerblue", "darkorange", "green", "red", "purple", "blue"];

    const mainData = data;
    const asia = mainData.filter(data => data.continent === "Asia")
    const europe = mainData.filter(data => data.continent === "Europe")
    const africa = mainData.filter(data => data.continent === "Africa")
    const northAmerica = mainData.filter(data => data.continent === "North America")
    const southAmerica = mainData.filter(data => data.continent === "South America")
    const oceania = mainData.filter(data => data.continent === "Oceania")

    const arrayToFilter = [asia, europe, africa, 
      northAmerica, southAmerica, oceania];
    
    const mainPreparedData = prepareLineChartData(arrayToFilter, continents, colors);

  const filtered = filterDatesNew(mainPreparedData, "21/12/2020", "20/03/2021")

    console.log("Before prepare", mainData)
    console.log("After prepare", mainPreparedData)

    
    const dataWinter2020 = filterDates(data, "22/12/2019", "20/03/2020");

    const asiaWinter2020 = dataWinter2020.filter(data => data.continent === "Asia")
    const europeWinter2020 = dataWinter2020.filter(data => data.continent === "Europe")
    const africaWinter2020 = dataWinter2020.filter(data => data.continent === "Africa")
    const northAmericaWinter2020 = dataWinter2020.filter(data => data.continent === "North America")
    const southAmericaWinter2020 = dataWinter2020.filter(data => data.continent === "South America")
    const oceaniaWinter2020 = dataWinter2020.filter(data => data.continent === "Oceania")

    const dataSpring2020 = filterDates(data, "20/03/2020", "20/06/2020");

    const asiaSpr2020 = dataSpring2020.filter(data => data.continent === "Asia")
    const europeSpr2020 = dataSpring2020.filter(data => data.continent === "Europe")
    const africaSpr2020 = dataSpring2020.filter(data => data.continent === "Africa")
    const northAmericaSpr2020 = dataSpring2020.filter(data => data.continent === "North America")
    const southAmericaSpr2020 = dataSpring2020.filter(data => data.continent === "South America")
    const oceaniaSpr2020 = dataSpring2020.filter(data => data.continent === "Oceania")
    
    const dataSummer2020 = filterDates(data, "22/06/2020", "22/09/2020");

    const asiaSummer2020 = dataSummer2020.filter(data => data.continent === "Asia")
    const europeSummer2020 = dataSummer2020.filter(data => data.continent === "Europe")
    const africaSummer2020 = dataSummer2020.filter(data => data.continent === "Africa")
    const northAmericaSummer2020 = dataSummer2020.filter(data => data.continent === "North America")
    const southAmericaSummer2020 = dataSummer2020.filter(data => data.continent === "South America")
    const oceaniaSummer2020 = dataSummer2020.filter(data => data.continent === "Oceania")

    const dataAutumn2020 = filterDates(data, "22/09/2020", "21/12/2020");

    const asiaAutumn2020 = dataAutumn2020.filter(data => data.continent === "Asia")
    const europeAutumn2020 = dataAutumn2020.filter(data => data.continent === "Europe")
    const africaAutumn2020 = dataAutumn2020.filter(data => data.continent === "Africa")
    const northAmericaAutumn2020 = dataAutumn2020.filter(data => data.continent === "North America")
    const southAmericaAutumn2020 = dataAutumn2020.filter(data => data.continent === "South America")
    const oceaniaAutumn2020 = dataAutumn2020.filter(data => data.continent === "Oceania")
    
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

    // const dataWinter2022 = filterDates(data, "21/12/2021", "20/03/2022");
    // const dataSpring2022 = filterDates(data, "20/03/2022", "21/06/2022");
    // const dataSummer2022 = filterDates(data, "21/06/2022", "23/09/2022");
    // const dataAutumn2022 = filterDates(data, "23/09/2022", "21/12/2022");

   


    



    const winter2020 = [asiaWinter2020, europeWinter2020, africaWinter2020, northAmericaWinter2020, southAmericaWinter2020, oceaniaWinter2020];
    const spring2020 = [asiaSpr2020, europeSpr2020, africaSpr2020, 
      northAmericaSpr2020, southAmericaSpr2020, oceaniaSpr2020];
      const summer2020 = [asiaSummer2020, europeSummer2020, africaSummer2020, northAmericaSummer2020, southAmericaSummer2020, oceaniaSummer2020];
    const autumn2020 = [asiaAutumn2020, europeAutumn2020, africaAutumn2020, 
      northAmericaAutumn2020, southAmericaAutumn2020, oceaniaAutumn2020];
    
    const winter2021 = [asiaWinter2021, europeWinter2021, africaWinter2021, northAmericaWinter2021, southAmericaWinter2021, oceaniaWinter2021];
    const spring2021 = [asiaSpr2021, europeSpr2021, africaSpr2021, 
      northAmericaSpr2021, southAmericaSpr2021, oceaniaSpr2021];
    const summer2021 = [asiaSummer2021, europeSummer2021, africaSummer2021, northAmericaSummer2021, southAmericaSummer2021, oceaniaSummer2021];
    const autumn2021 = [asiaAutumn2021, europeAutumn2021, africaAutumn2021, 
        northAmericaAutumn2021, southAmericaAutumn2021, oceaniaAutumn2021];
      


    console.log("asia Spr", asiaSpr2020)
    console.log("Europe spr", europeSpr2020)

  
    const chartDataWinter2020 = prepareLineChartData(winter2020, continents, colors);
    const chartDataWSpring2020 = prepareLineChartData(spring2020, continents, colors);
    const chartDataWSummer2020 = prepareLineChartData(summer2020, continents, colors);
    const chartDataWAutumn2020 = prepareLineChartData(autumn2020, continents, colors);


    

    const chartDataWinter2021 = prepareLineChartData(winter2021, continents, colors);
    const chartDataWSpring2021 = prepareLineChartData(spring2021, continents, colors);
    const chartDataWSummer2021 = prepareLineChartData(summer2021, continents, colors);
    const chartDataWAutumn2021 = prepareLineChartData(autumn2021, continents, colors);


    
    const dataForUpdates = {
      twenty: [chartDataWinter2020, chartDataWSpring2020],
      twentyone: [chartDataWinter2021, chartDataWSpring2021],
      twentytwo: [],
  }


    // drawLineChart('line-chart-container', chartDataWinter2020, "Covid Data in Winter 2020");
    // drawLineChart('line-chart-container1', chartDataWSpring2020 , "Covid Data in Spring 2020");
    // drawLineChart('line-chart-container2', chartDataWinter2021, "Covid Data in Winter 2020");
    // drawLineChart('line-chart-container3', chartDataWSpring2021 , "Covid Data in Spring 2020");
    
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
  

  
    // telling the generator where it can find x and y positions 

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



  // telling the generator where it can find x and y positions 

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
      

     
        // Click handler. 
        function click(){
          
          const dataset = dataForUpdates[this.dataset.name];
          console.log("button clicked",this.dataset.name)
          
          const name = this.dataset.name;
          const data_container1 = dataset[0];
          const data_container2 = dataset[1]
        
          if(name === "twenty"){
            update(chartDataWinter2020, xScale, yScale, svg, xAxis, yAxis);
            update(chartDataWSpring2020, xScale1, yScale1, svg1, xAxis1, yAxis1);
            update(chartDataWSummer2020, xScale2, yScale2, svg2, xAxis2, yAxis2);
            update(chartDataWAutumn2020, xScale3, yScale3, svg3, xAxis3, yAxis3)

            

          }else if (name === "twentyone") {
            update(chartDataWinter2021, xScale, yScale, svg, xAxis, yAxis)
            update(chartDataWSpring2021, xScale1, yScale1, svg1, xAxis1, yAxis1)
            update(chartDataWSummer2021, xScale2, yScale2, svg2, xAxis2, yAxis2)
            update(chartDataWAutumn2021, xScale3, yScale3, svg3, xAxis3, yAxis3)



          }
        
      }


    d3.selectAll('button').on('click', click);
    update(chartDataWinter2020, xScale, yScale, svg, xAxis, yAxis);
    update(chartDataWSpring2020, xScale1, yScale1, svg1, xAxis1, yAxis1);
    update(chartDataWSummer2020, xScale2, yScale2, svg2, xAxis2, yAxis2)
    update(chartDataWAutumn2020, xScale3, yScale3, svg3, xAxis3, yAxis3)


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

