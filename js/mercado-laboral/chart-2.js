
const fetchDataSize = async (URL) => {
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

let storeChart2 = undefined

const loadedDataChart2 = async () => {
  let data = await fetchDataSize('https://assets.buktechnology.com/movilidad_trabajadores/variacion_companysize.json')
  storeChart2 = await data
  await initChartsSize()
}

const initChartsSize = async () => {
  const chart2 = echarts.init(document.getElementById("chart2"));
  chart2.setOption(getOptionChart2(storeChart2))
}

const getOptionChart2 = (data) => {

  const xAxisData = [];
  const sizeMicroData = [];
  const sizePequeData = [];
  const sizeMediaData = [];
  const sizeGranData = [];

  data.forEach(entry => {
    xAxisData.push(entry.trimester);
    entry.companies.forEach(company => {
      if (company.size === "Gran Empresa") {
        sizeGranData.push(company.percent);
      }
      if (company.size === "Microempresa") {
        sizeMicroData.push(company.percent);
      };
      if (company.size === "Pequeña Empresa") {
        sizePequeData.push(company.percent);
      };
      if (company.size === "Mediana Empresa") {
        sizeMediaData.push(company.percent);
      };
    });

  });

  return {
    title: {
      text: 'Tamaño'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Microempresa', 'Pequeña Empresa', 'Mediana Empresa', 'Gran Empresa']
    },
    dataZoom: [
      {
        zlevel: 0,
        type: 'slider',
        start: 50,
        end: 100,
        minSpan: 30,
      },
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '17%',
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
    series: [
      {
        name: 'Microempresa',
        type: 'line',
        stack: 'value',
        data: sizeMicroData
      },
      {
        name: 'Pequeña Empresa',
        type: 'line',
        stack: 'value',
        data: sizePequeData
      },
      {
        name: 'Mediana Empresa',
        type: 'line',
        stack: 'value',
        data: sizeMediaData
      },
      {
        name: 'Gran Empresa',
        type: 'line',
        stack: 'value',
        data: sizeGranData
      }
    ]
  };
}

window.addEventListener("load", () => {
  loadedDataChart2()
});