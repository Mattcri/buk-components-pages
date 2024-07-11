let storeChart9 = undefined
let industrySelectedSize = undefined
let totalCompanies = undefined

const loadDataChart9 = async () => {
  let data = await fetchDataIndustrias('https://assets.buktechnology.com/movilidad_trabajadores/muestra_empresas.json')
  storeChart9 = await data
  industrySelectedSize = await storeChart9[0].industry
  let DOMtotalCompanies = document.getElementById('total-samples-companies')

  getIndustriesNames3(storeChart9)
  await initChartIndustrias3()
  backgroundIndustrySelected('menu-industries-3', industrySelectedSize)
  // totalSamples(storeChart9)
  DOMtotalCompanies.textContent = totalCompanies.toLocaleString('es-CL')
}

const initChartIndustrias3 = async () => {
  const chart9 = echarts.init(document.getElementById("chart9"))
  // let findIndustryData = searchIndustrySize(storeChart9, industrySelectedSize)
  let getSampples = totalSamples(storeChart9)
  // console.log('size: ', findIndustryData)
  await chart9.setOption(getOptionChart9(getSampples))
}

const totalSamples = (data) => {
  let micro = data.reduce((accum, item) => accum + (item["Microempresa"] || 0), 0)
  let small = data.reduce((accum, item) => accum + (item["Pequeña Empresa"] || 0), 0)
  let median = data.reduce((accum, item) => accum + (item["Mediana Empresa"] || 0), 0)
  let large = data.reduce((accum, item) => accum + (item["Gran Empresa"] || 0), 0)
  let total = micro + small + median + large
  totalCompanies = total
  // console.log('micro: ', micro)
  // console.log('small: ', small)
  // console.log('median: ', median)
  // console.log('large: ', large)
  // console.log('total: ', total)

  return {
    micro,
    small,
    median,
    large,
    total
  }
}

const searchIndustrySize = (data, industry) => {
  let filterInds = data.filter(e => e.industry === industry)
  let xAxisData = filterInds.map(e => e.trimester)
  let yAxisMicro = filterInds.map(e => e["Microempresa"])
  let yAxisSmall = filterInds.map(e => e["Pequeña Empresa"])
  let yAxisMedian = filterInds.map(e => e["Mediana Empresa"])
  let yAxisLarge = filterInds.map(e => e["Gran Empresa"])

  console.log('filter: ', filterInds)
  // console.log('x: ', xAxisData)
  console.log('micro: ', yAxisMicro)
  console.log('small: ', yAxisSmall)
  console.log('median: ', yAxisMedian)
  console.log('large: ', yAxisLarge)
  console.log('indus: ', industry)

  return {
    xAxisData,
    yAxisMicro,
    yAxisSmall,
    yAxisMedian,
    yAxisLarge,
    industry
  }

}

const getIndustriesNames3 = (data) => {
  let DOMsubmenu = document.getElementById('menu-industries-3__wrap')
  let uniqueIndustries = [...new Set(data.map(e => e.industry))]

  const builder = (wrapper) => {
    uniqueIndustries.forEach((item) => {
      let html = `
        <li onclick="updateChart3(this, 'chart9')" data-target-industry="${item}" class="menu-industries__item">${item}</li>
      `
      wrapper.insertAdjacentHTML('beforeend', html)
    })
  }

  builder(DOMsubmenu)
}

const addChartSelectedSize = (filteredData, chart) => {
  const chartTarget = echarts.init(document.getElementById(chart))
  let currentOptions = chartTarget.getOption()

  console.log('add chart9: ', currentOptions.series)

  currentOptions.title[0].text = filteredData.industry
  currentOptions.xAxis[0].data = filteredData.xAxisData
  currentOptions.series[0].data = filteredData.yAxisMicro
  currentOptions.series[1].data = filteredData.yAxisSmall
  currentOptions.series[2].data = filteredData.yAxisMedian
  currentOptions.series[3].data = filteredData.yAxisLarge

  // update chart in canvas front
  chartTarget.setOption(currentOptions, { notMerge: false })

}

const updateChart3 = (DOMitem, chart) => {
  let industrySelected = DOMitem.dataset.targetIndustry
  let industryToCompare = industrySelectedSize
  let search = searchIndustrySize(storeChart9, industrySelected)

  if (industrySelected !== industryToCompare) {
    industrySelectedSize = industrySelected
    addChartSelectedSize(search, chart)
    backgroundIndustrySelected('menu-industries-3', industrySelectedSize)
  }

}

const getOptionChart9 = (sample) => {
  let seriesData = [
    {
      // name: 'Microempresa',
      type: 'bar',
      barWidth: '60%',
      data: [ sample.micro, sample.small, sample.median, sample.large ]
    },
  ]
  // console.log('obj filter: ', filteredData)

  return {
    title: {
      text: 'Muestra'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    // legend: {
    //   // top: 40,
    //   data: ['Microempresa', 'Pequeña Empresa', 'Mediana Empresa', 'Gran Empresa']
    // },
    grid: {
      // top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      // height: '70%',
      // width: '97%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: ["Microempresa", "Pequeña Empresa", "Mediana Empresa", "Gran Empresa"],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: seriesData

  }
}

// const samplesXindustry = (data) => {
  
// }

window.addEventListener("load", () => {
  loadDataChart9()
})

document.querySelector('body').addEventListener('click', function (event) {
  if (!event.target.closest('#btn-industries-3')) {
    let btn = document.getElementById('btn-industries-3')
    let menu = document.getElementById('menu-industries-3')
    btn.classList.remove('open')
    btn.style.borderRadius = '21px'
    menu.style.height = `0px`
    menu.style.border = 'none'
    menu.style.overflowY = 'hidden'
  }
})