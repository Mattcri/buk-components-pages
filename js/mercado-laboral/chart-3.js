document.addEventListener("DOMContentLoaded", async function () {
  const toggleLegendButton = document.getElementById("toggleLegendButton");
  const chart = echarts.init(document.getElementById('chart3'));

  let legendVisible = true;

  await initChartsInd(); // Inicializar el gráfico al cargar la página
});



const getOptionChart3 = (data) => {
  const xAxisData = [];
  const industriaData1 = [];
  const industriaData2 = [];
  const industriaData3 = [];
  const industriaData4 = [];
  const industriaData5 = [];
  const industriaData6 = [];
  const industriaData7 = [];
  const industriaData8 = [];
  const industriaData9 = [];
  const industriaData10 = [];
  const industriaData11 = [];
  const industriaData12 = [];
  const industriaData13 = [];
  const industriaData14 = [];
  const industriaData15 = [];
  const industriaData16 = [];

  data.forEach(entry => {
    xAxisData.push(entry.trimester);
    entry.industries.forEach(industria => {
      if (industria.industry === "Actividades artísticas, de entretenimiento y recreativas") {
        industriaData1.push(industria.percent);
      }
      if (industria.industry === "Actividades de alojamiento y de servicio de comidas") {
        industriaData2.push(industria.percent);
      };
      if (industria.industry === "Actividades de atención de la salud humana y de asistencia social") {
        industriaData3.push(industria.percent);
      };
      if (industria.industry === "Actividades de servicios administrativos y de apoyo") {
        industriaData4.push(industria.percent);
      };
      if (industria.industry === "Actividades financieras y de seguros") {
        industriaData5.push(industria.percent);
      };
      if (industria.industry === "Actividades profesionales, científicas y técnicas") {
        industriaData6.push(industria.percent);
      };
      if (industria.industry === "Administración pública y defensa; planes de seguridad social de afiliación obligatoria") {
        industriaData7.push(industria.percent);
      };
      if (industria.industry === "Agricultura, ganadería, silvicultura y pesca") {
        industriaData8.push(industria.percent);
      };
      if (industria.industry === "Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas") {
        industriaData9.push(industria.percent);
      };
      if (industria.industry === "Construcción") {
        industriaData10.push(industria.percent);
      };
      if (industria.industry === "Enseñanza") {
        industriaData11.push(industria.percent);
      };
      if (industria.industry === "Explotación de minas y canteras") {
        industriaData12.push(industria.percent);
      };
      if (industria.industry === "Industria manufacturera") {
        industriaData13.push(industria.percent);
      };
      if (industria.industry === "Información y comunicaciones") {
        industriaData14.push(industria.percent);
      };
      if (industria.industry === "Suministro de electricidad, gas, vapor y aire acondicionado") {
        industriaData15.push(industria.percent);
      };
      if (industria.industry === "Transporte y almacenamiento") {
        industriaData16.push(industria.percent);
      };
    });
  });

  return {
    title: {
      text: 'Tamaño'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let tooltip = params[0].name + '<br/>';
        params.forEach(function (item) {
          tooltip += item.seriesName + ': ' + item.value + '%' + '<br/>';
        });
        return tooltip;
      }
    },
    legend: {
      show: true,
      zlevel: 3,
      type: "scroll",
      right: 0,
      top: 20,
      bottom: 20,
      height: '100%',
      width: '45%',
      backgroundColor: "rgb(246 248 254)",
      padding: [15, 5, 15, 5],
      borderRadius: [8, 8, 8, 8],
      orient: "vertical",
      pageTextStyle: {
        width: 50,
      },
      data: ['Actividades artísticas, de entretenimiento y recreativas',
        'Actividades de alojamiento y de servicio de comidas',
        'Actividades de atención de la salud humana y de asistencia social',
        'Actividades de servicios administrativos y de apoyo',
        'Actividades financieras y de seguros',
        'Actividades profesionales, científicas y técnicas',
        'Administración pública y defensa; planes de seguridad social de afiliación obligatoria',
        'Agricultura, ganadería, silvicultura y pesca',
        'Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas',
        'Construcción',
        'Enseñanza',
        'Explotación de minas y canteras',
        'Industria manufacturera',
        'Información y comunicaciones',
        'Suministro de electricidad, gas, vapor y aire acondicionado',
        'Transporte y almacenamiento'],
      selected: {
        // selected'series 1'
        'Actividades artísticas, de entretenimiento y recreativas': true,
        // unselected'series 2'
        'Actividades de alojamiento y de servicio de comidas': true,
        'Actividades de atención de la salud humana y de asistencia social': true,
        'Actividades de servicios administrativos y de apoyo': true,
        'Actividades financieras y de seguros': false,
        'Actividades profesionales, científicas y técnicas': false,
        'Administración pública y defensa; planes de seguridad social de afiliación obligatoria': false,
        'Agricultura, ganadería, silvicultura y pesca': false,
        'Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas': false,
        'Construcción': false,
        'Enseñanza': false,
        'Explotación de minas y canteras': false,
        'Industria manufacturera': false,
        'Información y comunicaciones': false,
        'Suministro de electricidad, gas, vapor y aire acondicionado': false,
        'Transporte y almacenamiento': false
      }
    },
    dataZoom: [

      {
        zlevel: 0,
        type: 'slider',
        start: 50,
        end: 70
      },
      {
        type: 'inside',
        start: 50,
        end: 70
      }
    ],
    grid: {
      top: '10%',
      left: '0',
      right: '45%',
      bottom: '20%',
      height: '70%',
      width: '50%',
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
        name: 'Actividades artísticas, de entretenimiento y recreativas',
        type: 'line',
        stack: 'value',
        data: industriaData1
      },
      {
        name: 'Actividades de alojamiento y de servicio de comidas',
        type: 'line',
        stack: 'value',
        data: industriaData2
      },
      {
        name: 'Actividades de atención de la salud humana y de asistencia social',
        type: 'line',
        stack: 'value',
        data: industriaData3
      },
      {
        name: 'Actividades de servicios administrativos y de apoyo',
        type: 'line',
        stack: 'value',
        data: industriaData4
      },
      {
        name: 'Actividades financieras y de seguros',
        type: 'line',
        stack: 'value',
        data: industriaData5
      },
      {
        name: 'Actividades profesionales, científicas y técnicas',
        type: 'line',
        stack: 'value',
        data: industriaData6
      },
      {
        name: 'Administración pública y defensa; planes de seguridad social de afiliación obligatoria',
        type: 'line',
        stack: 'value',
        data: industriaData7
      },
      {
        name: 'Agricultura, ganadería, silvicultura y pesca',
        type: 'line',
        stack: 'value',
        data: industriaData8
      },
      {
        name: 'Comercio al por mayor y al por menor; reparación de vehículos automotores y motocicletas',
        type: 'line',
        stack: 'value',
        data: industriaData9
      },
      {
        name: 'Construcción',
        type: 'line',
        stack: 'value',
        data: industriaData10
      },
      {
        name: 'Enseñanza',
        type: 'line',
        stack: 'value',
        data: industriaData11
      },
      {
        name: 'Explotación de minas y canteras',
        type: 'line',
        stack: 'value',
        data: industriaData12
      },
      {
        name: 'Industria manufacturera',
        type: 'line',
        stack: 'value',
        data: industriaData13
      },
      {
        name: 'Información y comunicaciones',
        type: 'line',
        stack: 'value',
        data: industriaData14
      },
      {
        name: 'Suministro de electricidad, gas, vapor y aire acondicionado',
        type: 'line',
        stack: 'value',
        data: industriaData15
      },
      {
        name: 'Transporte y almacenamiento',
        type: 'line',
        stack: 'value',
        data: industriaData16
      }
    ]
  };
};

const fetchDataInd = async () => {
  try {
    const responseInd = await fetch("https://assets.buktechnology.com/movilidad_trabajadores/variacion_industria.json");
    const { data } = await responseInd.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
};

const initChartsInd = async () => {
  const chart3 = echarts.init(document.getElementById("chart3"));
  const data = await fetchDataInd();
  if (data) {
    chart3.setOption(getOptionChart3(data));
  }
};

window.addEventListener("load", () => {
  initChartsInd();
});