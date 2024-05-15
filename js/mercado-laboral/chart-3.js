const fetchDataIndustrias = async (URL) => {
  try {
    let response = await fetch(URL)
    let { data } = await response.json()

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    return data

  } catch (error) {
    console.error(error.message)
  }
}

let storeChart3 = undefined
// let storeDataSelectedChart3 = undefined

const loadDataChart3 = async () => {
  let data = await fetchDataIndustrias('https://assets.buktechnology.com/movilidad_trabajadores/variacion_industria.json')
  storeChart3 = await data
  await initChartIndustrias()
}

const initChartIndustrias = async () => {
  const chart3 = echarts.init(document.getElementById("chart3"));
  await chart3.setOption(getOptionChart3(storeChart3))

}

const industriesMatcher = (industryTarget) => {
  let filteredSerie = []
  storeChart3.forEach((item) => {
    let target = item.industries.find(e => e.industry === industryTarget)
    filteredSerie.push(target.percent)
    // console.log('industry data: ', target);
  })
  // console.log(`${industryTarget}: `, filteredSerie)
  return {
    'nameIndustry': industryTarget,
    'serieData': filteredSerie
  }
}

let industriesSelected = [
  'Actividades artísticas, de entretenimiento y recreativas',
  'Actividades de alojamiento y de servicio de comidas',
  'Actividades de atención de la salud humana y de asistencia social',
  'Actividades de servicios administrativos y de apoyo'
]

const getOptionChart3 = (data) => {
  const xAxisData = [];

  const industryTargets = industriesSelected.map(industry => industriesMatcher(industry))

  // let industryTarget1 = industriesMatcher(industriesSelected[0])
  // let industryTarget2 = industriesMatcher(industriesSelected[1])
  // let industryTarget3 = industriesMatcher(industriesSelected[2])
  // let industryTarget4 = industriesMatcher(industriesSelected[3])

  console.log('return 1: ', industryTargets)

  let seriesData = industryTargets.map((industry, index) => {
    return {
      name: industry.nameIndustry,
      type: 'line',
      stack: 'value',
      data: industry.serieData
    };
  })

  console.log('return 2: ', seriesData)

  // const industriaData1 = [];
  // const industriaData2 = [];
  // const industriaData3 = [];
  // const industriaData4 = [];
  // const industriaData5 = [];
  // const industriaData6 = [];
  // const industriaData7 = [];
  // const industriaData8 = [];
  // const industriaData9 = [];
  // const industriaData10 = [];
  // const industriaData11 = [];
  // const industriaData12 = [];
  // const industriaData13 = [];
  // const industriaData14 = [];
  // const industriaData15 = [];
  // const industriaData16 = [];

  data.forEach(entry => {
    xAxisData.push(entry.trimester)
  });

  return {
    title: {
      text: 'Industria'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let tooltip = params[0].name + '<br/>';
        params.forEach(function (item) {
          tooltip += `${item.seriesName}: <span style="font-weight: 600;">${item.value}%</span> <br/>`
          // tooltip += item.seriesName + ': ' + item.value + '%' + '<br/>';
        });
        return tooltip;
      }
    },
    legend: {
      selectedMode: false,
      borderRadius: [8, 8, 8, 8],
      padding: [15, 5, 15, 5],
      top: 16,
      data: [
        industryTargets[0].nameIndustry, 
        industryTargets[1].nameIndustry,
        industryTargets[2].nameIndustry,
        industryTargets[3].nameIndustry
      ]
    },
    // legend: {
    //   show: true,
    //   zlevel: 3,
    //   type: "scroll",
    //   right: 0,
    //   top: 20,
    //   bottom: 20,
    //   height: '100%',
    //   width: '45%',
    //   backgroundColor: "rgb(246 248 254)",
    //   padding: [15, 5, 15, 5],
    //   borderRadius: [8, 8, 8, 8],
    //   orient: "vertical",
    //   pageTextStyle: {
    //     width: 50,
    //   },
    // },
    dataZoom: [
      {
        zlevel: 0,
        type: 'slider',
        start: 50,
        end: 100
      },
      {
        type: 'inside',
        start: 50,
        end: 100
      }
    ],
    grid: {
      top: '20%',
      left: '0',
      right: '0',
      bottom: '15%',
      // height: '70%',
      width: '97%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: seriesData
    
  };
};

window.addEventListener("load", () => {
  loadDataChart3();
});