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
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
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
};

const fetchDataSize = async (fechaInicioSize, fechaFinSize) => {
  try {
    const responseSize = await fetch("https://assets.buktechnology.com/movilidad_trabajadores/variacion_companysize.json");
    const { data } = await responseSize.json();

    // Filtrar los datos por el período deseado
    const datosFiltradosSize = data.filter(dato => {
      const fechaDatoSize = new Date(dato.month);
      return fechaDatoSize >= fechaInicioSize && fechaDatoSize <= fechaFinSize;
    });

    return datosFiltradosSize;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
};

const initChartsSize = async () => {
  const chart2 = echarts.init(document.getElementById("chart2"));
  const fechaiSelectSize = document.getElementById("fechais");
  const fechafSelectSize = document.getElementById("fechafs");

  // Agregar event listener para los selects de fecha
  fechaiSelectSize.addEventListener("change", async () => {
    const fechaInicioSize = new Date(fechaiSelectSize.value);
    const fechaFinSize = new Date(fechafSelectSize.value);
    const data = await fetchData(fechaInicioSize, fechaFinSize);
    if (data) {
      chart2.setOption(getOptionChart1(data));
    }
  });

  fechafSelectSize.addEventListener("change", async () => {
    const fechaInicioSize = new Date(fechaiSelectSize.value);
    const fechaFinSize = new Date(fechafSelectSize.value);
    const data = await fetchDataSize(fechaInicioSize, fechaFinSize);
    if (data) {
      chart2.setOption(getOptionChart1(data));
    }
  });

  // Obtener datos iniciales y mostrar el gráfico
  const fechaInicioSize = new Date(fechaiSelectSize.value);
  const fechaFinSize = new Date(fechafSelectSize.value);
  const data = await fetchDataSize(fechaInicioSize, fechaFinSize);
  if (data) {
    chart2.setOption(getOptionChart2(data));
  }
};

window.addEventListener("load", () => {
  initChartsSize();
});