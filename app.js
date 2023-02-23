import {filterDates, prepareLineChartData} from "./helper.js";
import { drawLineChart } from "./draw.js";

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

    drawLineChart('line-chart-container', lineChartData, "Covid Data in Winter 2020");
    drawLineChart('line-chart-container1', lineChartData1 , "Covid Data in Spring 2020");
    drawLineChart('line-chart-container2', lineChartData, "Covid Data in Winter 2020");
    drawLineChart('line-chart-container3', lineChartData1 , "Covid Data in Spring 2020");
  

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