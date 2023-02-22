function filterDates(data, startDate, endDate) {
    return data.filter(d => {
        const start = d3.timeParse('%d/%m/%Y')(startDate);
        const end = d3.timeParse('%d/%m/%Y')(endDate);
        // console.log("start data", start)
        // console.log("d", d.date)
      return (
        d.date >= start &&
        d.date < end
        );
    });
  }
  
  function prepareLineChartData(data, continents, colors){


    const groupBy = d => d.date;
    const reduceTotalCases = values => d3.sum(values, leaf => leaf.total_cases);
    const totalCasesMapAsia = d3.rollup(data[0], reduceTotalCases, groupBy);
    const totalCasesAsia = Array.from(totalCasesMapAsia).sort((a, b) => a[0] - b[0]);
    const datesAsia = totalCasesAsia.map(d =>d[0]);
    
    const groupByEurope = d => d.date;
    const reduceTotalCasesEurope = values => d3.sum(values, leaf => leaf.total_cases);
    const totalCasesMapEurope = d3.rollup(data[1], reduceTotalCasesEurope, groupByEurope);
    const totalCasesEurope = Array.from(totalCasesMapEurope).sort((a, b) => a[0] - b[0]);
    const datesEurope = totalCasesEurope.map(d =>d[0]);

    
    const groupByAfrica = d => d.date;
    const reduceTotalCasesAfrica = values => d3.sum(values, leaf => leaf.total_cases);
    const totalCasesMapAfrica = d3.rollup(data[2], reduceTotalCasesAfrica, groupByAfrica);
    const totalCasesAfrica = Array.from(totalCasesMapAfrica).sort((a, b) => a[0] - b[0]);
    const datesAfrica = totalCasesAfrica.map(d =>d[0]);


    const groupByNorthAmerica = d => d.date;
    const reduceTotalCasesNorthAmerica = values => d3.sum(values, leaf => leaf.total_cases);
    const totalCasesMapNorthAmerica = d3.rollup(data[3], reduceTotalCasesNorthAmerica, groupByNorthAmerica);
    const totalCasesNorthAmerica = Array.from(totalCasesMapNorthAmerica).sort((a, b) => a[0] - b[0]);
    const datesNAmerica = totalCasesNorthAmerica.map(d =>d[0]);


    const groupBySAmerica = d => d.date;
    const reduceTotalCasesSAmerica = values => d3.sum(values, leaf => leaf.total_cases);
    const totalCasesMapSAmerica = d3.rollup(data[4], reduceTotalCasesSAmerica, groupBySAmerica);
    const totalCasesSAmerica = Array.from(totalCasesMapSAmerica).sort((a, b) => a[0] - b[0]);
    const datesSAmerica = totalCasesSAmerica.map(d =>d[0]);


    const groupByOceania = d => d.date;
    const reduceTotalCasesOceania = values => d3.sum(values, leaf => leaf.total_cases);
    const totalCasesMapOceania = d3.rollup(data[5], reduceTotalCasesOceania, groupByOceania);
    const totalCasesOceania = Array.from(totalCasesMapOceania).sort((a, b) => a[0] - b[0]);
    const datesOceania = totalCasesOceania.map(d =>d[0]);

    const dates  = datesAsia.concat(datesEurope, datesAfrica, datesNAmerica, datesSAmerica, datesOceania);
    console.log("Africa ", totalCasesAfrica)
    console.log("Oceania ", totalCasesOceania)
    console.log("dates", dates[dates.length-1])
    const yValuesMax = [
      totalCasesAsia[totalCasesAsia.length-1][1],
      totalCasesEurope[totalCasesEurope.length-1][1],
      totalCasesAfrica[totalCasesAfrica.length-1][1],
      totalCasesNorthAmerica[totalCasesNorthAmerica.length-1][1],
      totalCasesSAmerica[totalCasesSAmerica.length-1][1],
      totalCasesOceania[totalCasesOceania.length-1][1],
      
    ];
    const yValuesMin = [
      totalCasesAsia[0][1],
      totalCasesEurope[0][1],
      totalCasesAfrica[0][1],
      totalCasesNorthAmerica[0][1],
      totalCasesSAmerica[0][1],
      totalCasesOceania[0][1],
      
    ];
    const yMax = d3.max(yValuesMax);
    const yMin = d3.min(yValuesMin)
    // const yMax2 = yValuesMax.sort((a, b) => a - b) - testing max
    // const yMin2 = yValuesMin.sort((a, b) => a - b) - testing min

    console.log("yMax", yMax)
    console.log("yMin", yMin)



   
      // Produce final data.
      const lineData = {
        series: [
          {
            name: `${continents[0]}`,
            lblClass:`${continents[0]}`,
            area:`area${continents[0].toLowerCase()}`,
            color: `${colors[0]}`,
            values: totalCasesAsia.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,0],
          },
          {
            name: `${continents[1]}`,
            lblClass:`${continents[1]}`,
            area:`area${continents[1].toLowerCase()}`,
            color: `${colors[1]}`,
            values: totalCasesEurope.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,12],

          },
          {
            name: `${continents[2]}`,
            lblClass:`${continents[2]}`,
            color: `${colors[2]}`,
            values: totalCasesAfrica.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,24],

          },
          {
            name: `${continents[3]}`,
            lblClass:`namerica`,
            color: `${colors[3]}`,
            values: totalCasesNorthAmerica.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,36],

          },
          {
            name: `${continents[4]}`,
            lblClass:`samerica`,
            color: `${colors[4]}`,
            values: totalCasesSAmerica.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,48],

          },
          {
            name: `${continents[5]}`,
            lblClass:`oceania`,
            color: `${colors[5]}`,
            values: totalCasesOceania.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,60],
          }
        ],
          // dates object (array of possible dates)
          dates: dates,
          yMin: yMin,
          yMax: yMax,
        
      }
      
      return lineData;
  
  } 


  export { filterDates, prepareLineChartData }