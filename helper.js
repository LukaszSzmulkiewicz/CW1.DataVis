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

  function filterDatesNew(data, startDate, endDate) {
    return data.filter(d => {
        const start = d3.timeParse('%d/%m/%Y')(startDate);
        const end = d3.timeParse('%d/%m/%Y')(endDate);
        // console.log("start data", start)
        // console.log("d", d.date)
      return (
        d.dates >= start &&
        d.dates < end
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
            lblPosition: [4,-20],
          },
          {
            name: `${continents[1]}`,
            lblClass:`${continents[1]}`,
            area:`area${continents[1].toLowerCase()}`,
            color: `${colors[1]}`,
            values: totalCasesEurope.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,-6],

          },
          {
            name: `${continents[2]}`,
            lblClass:`${continents[2]}`,
            color: `${colors[2]}`,
            values: totalCasesAfrica.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,10],

          },
          {
            name: `${continents[3]}`,
            lblClass:`namerica`,
            color: `${colors[3]}`,
            values: totalCasesNorthAmerica.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,24],

          },
          {
            name: `${continents[4]}`,
            lblClass:`samerica`,
            color: `${colors[4]}`,
            values: totalCasesSAmerica.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,40],

          },
          {
            name: `${continents[5]}`,
            lblClass:`oceania`,
            color: `${colors[5]}`,
            values: totalCasesOceania.map(d =>({ date: d[0], value: d[1] })),
            lblPosition: [4,54],
          }
        ],
          // dates object (array of possible dates)
          dates: dates,
          yMin: yMin,
          yMax: yMax,
          data: data,
      }
      
      return lineData;
  
  } 
  
  function formatTicks(d) {
    if (d >= 1000000000) {
        return (d / 1000000000).toFixed(1) + "bl";
    } else if (d >= 1000000) {
        return (d / 1000000).toFixed(1) + "mil";
    } else if (d>= 1000){
        return (d/1000).toFixed(0)+ "k";
    } else {
      return d
    }
}
function prepareScatterPlotData(data){
  const asia = {}
  data.data[0].forEach((entry) => {
    if (entry.location) {
      asia[entry.location] = entry;
    }
  });
  const asiaTop5 = Object.entries(asia)
  .sort(([, a], [, b]) => b.total_cases - a.total_cases).slice(0,5);
  for (let i = 0; i < asiaTop5.length; i++) {
    asiaTop5[i][1].label = "asia"
    asiaTop5[i][1].color = "dodgerblue"

    
}
  const asiaObjects = []
  console.log("Asia", asia)
  console.log("Asia top 5", asiaTop5);
  const asiaCasesTotal = asiaTop5.map(d=> d[1].total_cases_per_million);
  const asiaGDPTotal = asiaTop5.map(d=> d[1].gdp_per_capita);
  for (const [ , obj ] of asiaTop5) {
    asiaObjects.push(obj)
  }
  console.log("Asia objects", asiaObjects)

  const europe = {}
  data.data[1].forEach((entry) => {
    if (entry.location) {
      europe[entry.location] = entry;
    }
  });
  const europeTop5 = Object.entries(europe)
  .sort(([, a], [, b]) => b.total_cases - a.total_cases).slice(0,5);
  console.log("europe top 5", europeTop5);
  for (let i = 0; i < europeTop5.length; i++) {
    europeTop5[i][1].label = "europe"
    europeTop5[i][1].color = "darkorange"
    
    // add new property to each object
}
  const europeObjects = []
  console.log("europe", europe)
  const europeCasesTotal = europeTop5.map(d=> d[1].total_cases_per_million);
  const europeGDPTotal = europeTop5.map(d=> d[1].gdp_per_capita);
  for (const [ , obj ] of europeTop5) {
    europeObjects.push(obj)
  }
  console.log("europe objects", europeObjects)

  const africa = {}
  data.data[2].forEach((entry) => {
    if (entry.location) {
      africa[entry.location] = entry;
    }
  });
  const africaTop5 = Object.entries(africa)
  .sort(([, a], [, b]) => b.total_cases - a.total_cases).slice(0,5);
  console.log("europe top 5", africaTop5);
  for (let i = 0; i < africaTop5.length; i++) {
    africaTop5[i][1].label = "africa"
    africaTop5[i][1].color = "green"
    
    // add new property to each object
}
  const africaObjects = []
  console.log("europe", europe)
  const africaCasesTotal = africaTop5.map(d=> d[1].total_cases_per_million);
  const africaGDPTotal = africaTop5.map(d=> d[1].gdp_per_capita);
  for (const [ , obj ] of africaTop5) {
    africaObjects.push(obj)
  }
  console.log("europe objects", africaObjects)

  const nAmerica = {}
  data.data[3].forEach((entry) => {
    if (entry.location) {
      nAmerica[entry.location] = entry;
    }
  });
  const nAmericaTop5 = Object.entries(nAmerica)
  .sort(([, a], [, b]) => b.total_cases - a.total_cases).slice(0,5);
  console.log("nAmerica top 5", nAmericaTop5);
  for (let i = 0; i < nAmericaTop5.length; i++) {
    nAmericaTop5[i][1].label = "namerica"
    nAmericaTop5[i][1].color = "red"
    
    // add new property to each object
}
  const nAmericaObjects = []
  console.log("nAmerica", nAmerica)
  const nAmericaCasesTotal = nAmericaTop5.map(d=> d[1].total_cases_per_million);
  const nAmericaGDPTotal = nAmericaTop5.map(d=> d[1].gdp_per_capita);
  for (const [ , obj ] of nAmericaTop5) {
    nAmericaObjects.push(obj)
  }
  console.log("nAmerica objects", nAmericaObjects)

  const sAmerica = {}
  data.data[4].forEach((entry) => {
    if (entry.location) {
      nAmerica[entry.location] = entry;
    }
  });
  const sAmericaTop5 = Object.entries(nAmerica)
  .sort(([, a], [, b]) => b.total_cases - a.total_cases).slice(0,5);
  console.log("nAmerica top 5", nAmericaTop5);
  for (let i = 0; i < nAmericaTop5.length; i++) {
    sAmericaTop5[i][1].label = "samerica"
    sAmericaTop5[i][1].color = "purple"
    
    // add new property to each object
}
  const sAmericaObjects = []
  console.log("sAmerica", sAmerica)
  const sAmericaCasesTotal = sAmericaTop5.map(d=> d[1].total_cases_per_million);
  const sAmericaGDPTotal = sAmericaTop5.map(d=> d[1].gdp_per_capita);
  for (const [ , obj ] of sAmericaTop5) {
    sAmericaObjects.push(obj)
  }
  console.log("nAmerica objects", sAmericaObjects)
  const oceania = {}
  data.data[5].forEach((entry) => {
    if (entry.location) {
      oceania[entry.location] = entry;
    }
  });
  const oceaniaTop5 = Object.entries(oceania)
  .sort(([, a], [, b]) => b.total_cases - a.total_cases).slice(0,5);
  console.log("nAmerica top 5", oceaniaTop5);
  for (let i = 0; i < oceaniaTop5.length; i++) {
    oceaniaTop5[i][1].label = "oceania"
    oceaniaTop5[i][1].color = "blue"
    
    // add new property to each object
}
  const oceaniaObjects = []
  console.log("sAmerica", oceania)
  const oceaniaCasesTotal = oceaniaTop5.map(d=> d[1].total_cases_per_million);
  const oceaniaGDPTotal = oceaniaTop5.map(d=> d[1].gdp_per_capita);
  for (const [ , obj ] of oceaniaTop5) {
    oceaniaObjects.push(obj)
  }
  console.log("oceania objects", oceaniaObjects)

  
const minMaxCases  = asiaCasesTotal.concat(europeCasesTotal, africaCasesTotal, nAmericaCasesTotal, sAmericaCasesTotal, oceaniaCasesTotal);
const minMaxGDP  = asiaGDPTotal.concat(europeGDPTotal, africaGDPTotal, nAmericaGDPTotal, sAmericaGDPTotal, oceaniaGDPTotal);


  console.log("asia top", asiaTop5[0])
  const lineData = {
    series: [
      {
        total_cases_per_million: asiaTop5.map(d=>(d[1].total_cases_per_million)),
        objects: asiaObjects,
        lblPosition: [4,-20],
      },
      {
        total_cases_per_million: europeTop5.map(d=>(d[1].total_cases_per_million)),
        objects: europeObjects,
        lblPosition: [4,-20],
      },
      {
        total_cases_per_million: africaTop5.map(d=>(d[1].total_cases_per_million)),
        objects: africaObjects,
        lblPosition: [4,-20],
      },
      {
        total_cases_per_million: nAmericaTop5.map(d=>(d[1].total_cases_per_million)),
        objects: nAmericaObjects,
        lblPosition: [4,-20],
      },
      {
        total_cases_per_million: sAmericaTop5.map(d=>(d[1].total_cases_per_million)),
        objects: sAmericaObjects,
        lblPosition: [4,-20],
      },
      {
        total_cases_per_million: oceaniaTop5.map(d=>(d[1].total_cases_per_million)),
        objects: oceaniaObjects,
        lblPosition: [4,-20],
      },
   
    ],

    minMaxCases: minMaxCases,
    minMaxGDP: minMaxGDP
      // dates object (array of possible dates)
      // dates: dates,
      // yMin: yMin,
      // yMax: yMax,
      // data: data,
  }
  return lineData;
  
}


  export { filterDates, prepareLineChartData, prepareScatterPlotData ,filterDatesNew, formatTicks}