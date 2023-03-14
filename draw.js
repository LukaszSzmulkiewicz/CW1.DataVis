
  function addYAxisLabel(svg, x, y, text) {
    const label = svg.append("text")
      .attr("class", "axisLabel")
      .attr("text-anchor", "start")
      .attr("x", x)
      .attr("y", y)
      .text(text)
      .attr("transform", "rotate(-90)");
    return label;
  }
  function addXAxisLabel(svg, x, y, text) {
    const label = svg.append("text")
      .attr("class", "axisLabel")
      .attr("text-anchor", "end")
      .attr("x", x + text.length)
      .attr("y", y)
      .text(text)
    return label;
  }
function updateLineChart(lineChartData, xScale, yScale, svg, xAxis, yAxis, subheader, text){
    
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

 // Create a update selection: bind to the new data
   const u = svg.selectAll('.line-series')
   .data(lineChartData.series, function(d){return d.series})

  // Update the line
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
  .on('mouseover', mouseover)
  .on("mouseout", mouseout);

  svg
  .selectAll('.series-labels')
  .data(lineChartData.series, function(d){return d.series})
  .join(
    enter => enter
      .append('text')
      .attr('class', d => `series-labels ${d.lblClass.toLowerCase()}`)
      .attr('x', d => d.lblPosition[0])
      .attr('y', d => d.lblPosition[1])
      .text(d => d.name)
      .style('dominant-baseline', 'central')
      .style('font-size', '1em')
      .style('font-weight', 'bold')
      .style('fill', d => d.color),
        
      
    update => update
    .attr('class', d => `series-labels ${d.lblClass.toLowerCase()}`)
    .attr('x', d => d.lblPosition[0])
    .attr('y', d => d.lblPosition[1])
    .text(d => d.name)
    .style('dominant-baseline', 'central')
    .style('font-size', '1em')
    .style('font-weight', 'bold')
    .style('fill', d => d.color),
   
    exit => exit.remove()
  )
  .on('mouseover', mouseover)
  .on("mouseout", mouseout);

   // Subheader content.
   subheader.join().text(`${text}`)
    

  }

  function updateScatterPlot (data, xScaleScatter, yScaleScatter, svgScatter, xAxisScatter, yAxisScatter, subheader, text){
       

    // updating scales 
    xScaleScatter.domain([data.xMax, data.xMin]);
    svgScatter.selectAll(".xAxis")
       .transition()
       .duration(1000)
       .call(xAxisScatter); 
       
    yScaleScatter.domain([data.yMin, data.yMax]);
    svgScatter.selectAll(".yAxis")
       .transition()
       .duration(1000)
       .call(yAxisScatter);
         
   
       // Draw header.
    const header = svgScatter
      .append('g')
      .attr('class', 'scatter-header')
      .attr('transform', `translate(5, -40)`)
      .append('text')

          // Rotate xAxis ticks
      d3.selectAll(".xAxis .tick text")
      .attr("transform", "rotate(-22)")



    // Subheader content.
   subheader.join().text(`${text}`)
  
    // Add Scatter Circles
      addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[0].objects);
      addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[1].objects);
      addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[2].objects);
      addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[3].objects);
      addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[4].objects);
      addScatterCirc(svgScatter, xScaleScatter, yScaleScatter, data.series[5].objects);
  }

  function addScatterCirc(svg, xScaleScatter, yScaleScatter, data){
    svg.selectAll(`.circle-series`)
        .data(data,  function(d){return d.total_cases_per_million})
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
            .attr('fill-opacity', 0.8),
            
          update => update
            .transition()
            .duration(1500)
            .attr('cx', d => xScaleScatter(d.gdp_per_capita))
            .attr('cy', d => yScaleScatter(d.total_cases_per_million))
            .attr('r', 3)
            .style('fill', d => d.color),
      
          exit => exit.remove()
        )
        .on("mousemove", function (event, d) {
          console.log("circles data", d)
          d3.select(this).transition().attr('r', 8)
          d3.select(".tooltip-seasons")
            .html(
              "<strong> Continent: " +
                d.continent +
                "</strong><br><strong>Country: " +
                d.location +
                "</strong><br>GDP per capita: " +
                d.gdp_per_capita.toFixed(2) + "$" +
                "</strong><br>Total Cases Per Million: " +
                d.total_cases_per_million.toFixed(2)
            )
            .transition()
            .duration(150)
            .style("opacity", 0.9)
            .style("left", event.pageX -120 + "px")
            .style("top", event.pageY -100 + "px");
        })
        .on("mouseout", function (event, d) {
          d3.select(this).transition().attr('r', 3);
          d3.select(".tooltip-seasons").transition().duration(500).style("opacity", 0);
        });

        var tooltip = d3
        .select(".seasons-container")
        .append("div")
        .attr("class", "tooltip-seasons")
        .style("opacity", 0);
     
        
  }
  function drawLineChartVacs(lineChartData, xScale, yScale, svg, xAxis, yAxis){
     

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

    // Update the line
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
        .style('stroke', d => d.color)
        
    )
    .on('mouseover', mouseover)
    .on("mouseout", mouseout);
    
    svg
    .selectAll('.series-labels')
    .data(lineChartData.series, function(d){return d.series})
    .join(
      enter => enter
        .append('text')
        .attr('class', d => `series-labels ${d.name.toLowerCase()}`)
        .attr('x', d => d.lblPosition[0])
        .attr('y', d => d.lblPosition[1])
        .text(d => d.lbl)
        .style('dominant-baseline', 'central')
        .style('font-size', '1em')
        .style('font-weight', 'bold')
        .style('fill', d => d.color),
      
    )
    .on('mouseover', mouseover)
    .on("mouseout", mouseout)


    var tooltip = d3
    .select(".seasons-container")
    .append("div")
    .attr("class", "tooltip-seasons")
    .style("opacity", 0);

  //    Draw header and subheader.
    const header = svg
    .append("g")
    .attr("class", "scatter-header")
    .attr("transform", `translate(70, -40)`)
    .append("text");
  // first title
  header.append("tspan").transition().text("Total cases per houndred");

  }
  function mouseover(d, i){
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
    
  }

  function mouseout(){
    d3.selectAll(`.line-series`).style('stroke-width', 2);
    d3.selectAll(`.series-labels`).style('stroke-width', 2)
      .transition()
      .style('font-size', '1em')
      .attr('x', 4);
    d3.selectAll(`.circle-series`)
      .transition()
      .attr('r', 3)
      .attr('fill-opacity', 0.8)
  }
  


export { updateLineChart, updateScatterPlot, drawLineChartVacs, addXAxisLabel, addYAxisLabel}
