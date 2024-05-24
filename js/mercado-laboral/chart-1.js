
const fetchDataNacional = async (URL) => {
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

let storeChart1 = undefined

const loadedDataChart1 = async () => {
  let data = await fetchDataNacional('https://assets.buktechnology.com/movilidad_trabajadores/variacion_nacional.json')
  storeChart1 = await data
  await initChartNacional()
}

const initChartNacional = async () => {
  const chart1 = echarts.init(document.getElementById("chart1"));
  chart1.setOption(getOptionChart1(storeChart1))

}

const getOptionChart1 = (data) => {
  const hombresData = [];
  const mujeresData = [];
  const xAxisData = [];
  const totalData = [];
  console.log('store nacional: ', storeChart1)

  data.forEach(entry => {
    xAxisData.push(entry.trimester);
    mujeresData.push(entry.Mujeres && entry.Mujeres.length >= 0 ? entry.Mujeres[0] : NaN);
    totalData.push(entry.Total && entry.Total.length >= 0 ? entry.Total[0] : NaN);
    hombresData.push(entry.Hombres && entry.Hombres.length >= 0 ? entry.Hombres[0] : NaN);
  });

  return {
    title: {
      text: 'Nacional'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Mujeres', 'Total', 'Hombres']
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
        name: 'Mujeres',
        type: 'line',
        stack: 'Total',
        data: mujeresData
      },
      {
        name: 'Total',
        type: 'line',
        stack: 'Total',
        data: totalData
      },
      {
        name: 'Hombres',
        type: 'line',
        stack: 'Total',
        data: hombresData
      }
    ]
  };
};

if (typeof window !== "undefined") {
  loadedDataChart1()
}

// window.addEventListener("load", () => {
//   initCharts();
// });