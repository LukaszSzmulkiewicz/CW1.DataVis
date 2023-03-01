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
  
    // path hover
    d3.selectAll('path')
    .on('mouseover', function(d, i) {
      if(i.lblClass!=null){
        d3.selectAll(`.${i.lblClass.toLowerCase()}`).style('stroke-width', 5)
        d3.selectAll(`.${i.lblClass.toLowerCase()}`)
          .transition()
          .attr('x', 10)
          .style('font-size', '1.5em')
        d3.selectAll(`.circle-series.${i.lblClass.toLowerCase()}`)
        .transition()
        .attr('r', 7)
        .attr('fill-opacity', 1)
      }
      
    })
    .on("mouseout", function(d, i) {
        d3.selectAll(`.line-series`).style('stroke-width', 2);
        d3.selectAll(`.series-labels`).style('stroke-width', 2)
          .transition()
          .style('font-size', '0.8em')
          .attr('x', 7);
        d3.selectAll(`.circle-series`)
        .transition()
        .attr('r', 3)
        .attr('fill-opacity', 0.7)
    });

    d3.selectAll('text')
    .on('mouseover', function(d, i) {
      if(i.lblClass){
        d3.selectAll(`.${i.lblClass.toLowerCase()}`).style('stroke-width', 5)
        d3.selectAll(`.${i.lblClass.toLowerCase()}`)
        .transition()
        .attr('x', 10)
        .style('font-size', '1.5em')
        d3.selectAll(`.circle-series.${i.lblClass.toLowerCase()}`)
        .transition()
        .attr('r', 6)
        .attr('fill-opacity', 1)
      }
      
    })
    .on("mouseout", () => {
        d3.selectAll(`.line-series`).style('stroke-width', 2);
        d3.selectAll(`.series-labels`).style('stroke-width', 2)
          .transition()
          .attr('x', 4)
          .style('font-size', '0.8em');
          d3.selectAll(`.circle-series`)
          .transition()
          .attr('r', 3)
          .attr('fill-opacity', 0.7)

        
    });
    

  }

  function updateScatterPlot (data, xScaleScatter, yScaleScatter, svgScatter, xAxisScatter, yAxisScatter){
    console.log("data in the scatter", data)
    xScaleScatter.domain(d3.extent(data.minMaxGDP));
    svgScatter.selectAll(".xAxis")
       .transition()
       .duration(1000)
       .call(xAxisScatter); 
       
    yScaleScatter.domain(d3.extent(data.minMaxCases));
    svgScatter.selectAll(".yAxis")
       .transition()
       .duration(1000)
       .call(yAxisScatter);
         
     
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

  function addScatterCirc(svg, xScaleScatter, yScaleScatter, data){
    svg.selectAll(`.circle-series`)
        .data(data,  function(d){return d.gdp_per_capita})
        .join(
          enter => enter
          .append("circle")
            .transition()
            .duration(1500)
            .attr('class', d => `circle-series ${d.label.toLowerCase()}`)
            .attr('cx', d => xScaleScatter(d.gdp_per_capita))
            .attr('cy', d => yScaleScatter(d.total_cases_per_million))
            .attr('r', 3)
            .style('fill', d => d.color)
            // makes the circles lighter so can distinguish one from the other when one is positioned on the other
            .attr('fill-opacity', 0.7),
            
            
          update => update
            .transition()
            .duration(1500)
            .attr('cx', d => xScaleScatter(d.gdp_per_capita))
            .attr('cy', d => yScaleScatter(d.total_cases_per_million))
            .attr('r', 3)
            .style('fill', d => d.color),
      
          exit => exit.remove()
  
        )
        
        
  }
   


export { updateLineChart, updateScatterPlot}
