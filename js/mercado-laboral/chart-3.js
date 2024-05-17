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

const loadDataChart3 = async () => {
  let data = await fetchDataIndustrias('https://assets.buktechnology.com/movilidad_trabajadores/variacion_industria.json')
  storeChart3 = await data
  await initChartIndustrias(storeChart3)
  await getIndustriesNames(storeChart3)
}

const initChartIndustrias = async (data) => {
  const chart3 = echarts.init(document.getElementById("chart3"));
  await chart3.setOption(getOptionChart3(data))

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

// const backgroundIndustriesSelected = () => {
//   let industries = storeChart3[0]
// }

const addToChart = (newIndustry, chart) => {
  const chartTarget = echarts.init(document.getElementById(chart))
  let industryData = industriesMatcher(newIndustry)

  let currentOptions = chartTarget.getOption()

  let newSeries = {
    name: industryData.nameIndustry,
    type: 'line',
    stack: 'value',
    data: industryData.serieData
  }
  

  let industryToRemove = industriesSelected[0]

  industriesSelected.shift()
  industriesSelected.push(newIndustry)
  console.log('new indus: ', industriesSelected)
  // update chart data in options back
  let indexSerieToRemove = currentOptions.series.findIndex(e => e.name === industryToRemove)
  currentOptions.series.splice(indexSerieToRemove, 1)
  currentOptions.series.push(newSeries)

  // update legends in options back
  currentOptions.legend[0].data = currentOptions.series.map(serie => serie.name)
  console.log('legend: ', currentOptions.legend[0])

  // update chart in canvas front
  chartTarget.setOption(currentOptions, { notMerge: false })

}

const updateChart = (DOMitem, chart) => {
  let industryName = DOMitem.dataset.targetIndustry
  let isSelected = industriesSelected.some(e => e === industryName)
  console.log(industryName)
  console.log(isSelected)
  
  if(!isSelected) {
    addToChart(industryName, chart)
  }
  
}

const getIndustriesNames = async (data) => {
  let DOMsubmenu = document.getElementById('submenu-industries__wrap') 
  const industriesNames = await data[0].industries.map(e => e.industry)
  const builder = (wrapper) => {
    industriesNames.forEach((item, index) => {
      let html = `
        <li onclick="updateChart(this, 'chart3')" data-target-industry="${item}">${item}</li>
      `
      wrapper.insertAdjacentHTML('beforeend', html)
    })
  }
  builder(DOMsubmenu)
  // console.log('industries: ', industriesNames)
}

const btnSelects = [...document.querySelectorAll('button.btn-select')]

btnSelects.forEach(button => {
  button.addEventListener('click', function() {
    let submenu = this.nextElementSibling
    let submenuHeight = submenu.scrollHeight 
    this.classList.toggle('open')
    if (this.classList.contains('open')) {
      this.style.borderRadius = '21px 21px 0 0'
      submenu.style.height = `${submenuHeight}px`
      submenu.style.border = '2px solid #D9E3FC'
      submenu.style.overflowY = 'scroll'
    } else {
      this.style.borderRadius = '21px'
      submenu.style.height = `0px`
      submenu.style.border = 'none'
      submenu.style.overflowY = 'hidden'
    }
  })
})

const getOptionChart3 = (data) => {
  const xAxisData = [];

  const industryTargets = industriesSelected.map(industry => industriesMatcher(industry))

  // console.log('return 1: ', industryTargets)

  let seriesData = industryTargets.map((industry) => {
    return {
      name: industry.nameIndustry,
      type: 'line',
      stack: 'value',
      data: industry.serieData
    };
  })

  // console.log('return 2: ', seriesData)

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
        });
        return tooltip;
      }
    },
    legend: {
      selectedMode: false,
      // borderRadius: [8, 8, 8, 8],
      // padding: [15, 5, 15, 5],
      top: 16,
      data: [
        industryTargets[0].nameIndustry, 
        industryTargets[1].nameIndustry,
        industryTargets[2].nameIndustry,
        industryTargets[3].nameIndustry
      ]
    },
    dataZoom: [
      {
        zlevel: 0,
        type: 'slider',
        start: 50,
        end: 100,
        minSpan: 30,
        
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