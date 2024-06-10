let storeChart12 = undefined
let industrySelectedInputsAndOutputs = undefined

const loadDataChart12 = async () => {
  let data = await fetchDataIndustrias('https://assets.buktechnology.com/movilidad_trabajadores/variacion_entradasSalidas_industria.json')
  storeChart12 = await data
  industrySelectedInputsAndOutputs = await storeChart12[0].industry
  getIndustriesNames2(storeChart12)
  await initChartIndustrias2()
  backgroundIndustrySelected('menu-industries-2', industrySelectedInputsAndOutputs)
}

const initChartIndustrias2 = async () => {
  const chart12 = echarts.init(document.getElementById("chart12"))
  let findIndustryData = searchIndustry(storeChart12, industrySelectedInputsAndOutputs)
  await chart12.setOption(getOptionChart12(findIndustryData))
}

const searchIndustry = (data, industry) => {
  let filterInds = data.filter(e => e.industry === industry)
  let xAxisData = filterInds.map(e => e.trimester)
  let yAxisInputs = filterInds.map(e => e.tipo.entradas)
  let yAxisOutputs = filterInds.map(e => e.tipo.salidas)

  return {
    xAxisData,
    yAxisInputs,
    yAxisOutputs,
    industry
  }

}

const backgroundIndustrySelected = (chartMenu, industryActive) => {
  let DOMliItems = [...document.querySelectorAll(`#${chartMenu} li`)]

  DOMliItems.forEach(li => li.dataset.targetIndustry === industryActive ? li.classList.add('selected') : li.classList.remove('selected'))
}

const getIndustriesNames2 = (data) => {
  let DOMsubmenu = document.getElementById('menu-industries-2__wrap')
  let uniqueIndustries = [...new Set(data.map(e => e.industry))]

  const builder = (wrapper) => {
    uniqueIndustries.forEach((item) => {
      let html = `
        <li onclick="updateChart2(this, 'chart12')" data-target-industry="${item}" class="menu-industries__item">${item}</li>
      `
      wrapper.insertAdjacentHTML('beforeend', html)
    })
  }

  builder(DOMsubmenu)
}

const addChartSelected = (filteredData, chart) => {
  const chartTarget = echarts.init(document.getElementById(chart))
  let currentOptions = chartTarget.getOption()
  
  currentOptions.title[0].text = filteredData.industry
  currentOptions.xAxis[0].data = filteredData.xAxisData
  currentOptions.series[0].data = filteredData.yAxisInputs
  currentOptions.series[1].data = filteredData.yAxisOutputs

  // update chart in canvas front
  chartTarget.setOption(currentOptions, { notMerge: false })

}

const updateChart2 = (DOMitem, chart) => {
  let industrySelected = DOMitem.dataset.targetIndustry
  let industryToCompare = industrySelectedInputsAndOutputs
  let search = searchIndustry(storeChart12, industrySelected)

  if (industrySelected !== industryToCompare) {
    industrySelectedInputsAndOutputs = industrySelected
    addChartSelected(search, chart)
    backgroundIndustrySelected('menu-industries-2', industrySelectedInputsAndOutputs)
  }

}

const getOptionChart12 = (filteredData) => {
  let seriesData = [
    {
      name: 'Entradas',
      type: 'line',
      data: filteredData.yAxisInputs
    },
    {
      name: 'Salidas',
      type: 'line',
      data: filteredData.yAxisOutputs
    },
  ]
  console.log('obj filter: ', filteredData)

  return {
    title: {
      text: filteredData.industry
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: 40,
      data: ['Entradas', 'Salidas']
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
      data: filteredData.xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: seriesData

  };
}

window.addEventListener("load", () => {
  loadDataChart12()
})

document.querySelector('body').addEventListener('click', function (event) {
  if (!event.target.closest('#btn-industries-2')) {
    let btn = document.getElementById('btn-industries-2')
    let menu = document.getElementById('menu-industries-2')
    btn.classList.remove('open')
    btn.style.borderRadius = '21px'
    menu.style.height = `0px`
    menu.style.border = 'none'
    menu.style.overflowY = 'hidden'
  }
})