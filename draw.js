function transition(selection) {
    selection
      .attr('stroke-dasharray', function() { return this.getTotalLength() })
      .attr('stroke-dashoffset', function() { return this.getTotalLength() })
      .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
  }
function updateLineChart(lineChartData, xScale, yScale, svg, xAxis, yAxis){
    // drawScatterPlot(lineChartData)
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
      if(i.lblClass!=null){
        d3.selectAll(`.${i.lblClass.toLowerCase()}`).style('stroke-width', 5)
        d3.selectAll(`.${i.lblClass.toLowerCase()}`)
          .transition()
          .attr('x', 10)
          .style('font-size', '1.5em')
      }
      
    })
    .on("mouseout", function(d, i) {
        d3.selectAll(`.line-series`).style('stroke-width', 2);
        d3.selectAll(`.series-labels`).style('stroke-width', 2)
          .transition()
          .style('font-size', '0.8em')
          .attr('x', 4);
    });;

    d3.selectAll('text').on('mouseover', function(d, i) {
      if(i.lblClass){
        d3.selectAll(`.${i.lblClass.toLowerCase()}`).style('stroke-width', 5)
      d3.selectAll(`.${i.lblClass.toLowerCase()}`)
        .transition()
        .attr('x', 10)
        .style('font-size', '1.5em')
      }
      
    })
    .on("mouseout", () => {
        d3.selectAll(`.line-series`).style('stroke-width', 2);
        d3.selectAll(`.series-labels`).style('stroke-width', 2)
          .transition()
          .attr('x', 4)
          .style('font-size', '0.8em');
    });;

  }

function drawLineChart(containerName, lineChartData, headerText){
    // Dimensions.
    const margin = { top: 80, right: 60, bottom: 40, left: 60 };
    const width = 450 - margin.right - margin.left;
    const height = 380 - margin.top - margin.bottom;
  
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
      .tickPadding(12)
      .tickSizeInner(-height)
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
    
      
      // Rotate xAxis ticks
    d3.selectAll(".xAxis .tick text")
        .attr("transform", "rotate(-22)")
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
  

    // Draw header.
    const header = svg
      .append('g')
      .attr('class', 'scatter-header')
      .attr('transform', `translate(0,${-margin.top * 0.6})`)
      .append('text')
     
  
    header.append('tspan')
        .attr('x', width/4)
        .attr('font-weight', "bold")
        .text(`${headerText}`)
  
    header.append('tspan')
    .attr('x', 0)
    .attr('dy', '1.5em')
    .style('font-size', '0.8em')
    .style('fill', '#555')
    // .text('')

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
        d3.select(this).style("cursor", "pointer"); 
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
      d3.select(this).style("cursor", "default"); 
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
export { drawLineChart, updateLineChart }
