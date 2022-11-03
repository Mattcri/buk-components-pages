const API = "https://mattguz.github.io/buk-numbers/data_buknumbers.json"


const getData = async (urlapi) => {
  let response = await fetch(urlapi) 
  return response.json()
}

const minimumSecondsValues = (num) => {
  let value = Math.floor(num % 60)
  if (value >= 10) {
    return value.toString()
  } else {
    return value.toString().padStart(2, '0')
  }
}

const minimunMinutesValues = (num) => {
  let remanient = num % 3600
  return Math.floor(remanient / 60).toString().padStart(2, '0')
}

const chatTime = async () => {
  try {
    const startTime = performance.now()
    const chat = await getData(API).then(response => response.chat.responseTime)
    const dates = chat.data.map(e => e.date)
    const avgs = chat.data.map(e => e.avg_responseTime_chat)
    const avg = chat.average90Days
    const avgMin = Math.floor(avg / 60).toString()
    const avgSec = minimumSecondsValues(avg)
    const DOMavg = document.getElementById('chat-avg-time')
    DOMavg.textContent = `${avgMin}min ${avgSec}s`
    const valuesMin = avgs.map(e => Math.floor(e / 60).toString())
    const valuesSec = avgs.map(e => minimumSecondsValues(e))

    const minutesAndsecond = valuesMin.map((value, index) => `${value}.${valuesSec[index]}`)
    // const minutesAndsecond = []
    // for (let i = 0; i < valuesMin.length; i++ ) {
    //   let min = valuesMin[i]
    //   let sec = valuesSec[i]
    //   let formatt = `${min}.${sec}`
    //   minutesAndsecond.push(formatt)
    // }
    // let t = valuesMin.join(`.${valuesSec}`)
    const endTime = performance.now()

    console.log('Min:', valuesMin)
    console.log('Sec: ', valuesSec)
    console.log('A VERR', minutesAndsecond)

    console.log(`Tiempo de respuesta del código: ${(endTime - startTime) / 60} seg`)
    // let minute = Math.floor(avg).toString()
    // let seconds = avg.toFixed(2).toString().slice(2)

    // let i = 1
    // avgs.forEach(item => {
    //   let fomattMinutes = Math.trunc(item / 60)
    //   let formattSeconds = item % 60
    
    //   console.log(i++, '-' , fomattMinutes)
    //   console.log(formattSeconds)
    // })

    // console.log('Promedio chat: ', avg)
    // console.log('Fechas chat: ', dates)
    // console.log('Promedios chat: ', avgs)
    
    // console.log(typeof avg, avg)
    // console.log('minutos: ', typeof minute, minute)
    // console.log('segundos: ', typeof seconds, seconds)
    
    const ctx = document.getElementById('chat-response-time').getContext('2d')
    
    const chart = new Chart(ctx, abstractConfig(dates.reverse(), minutesAndsecond.reverse(), 'Minutos', 4, 1))
    
  } catch (err) {
    // const DOMerror = document.querySelector('.chart__content ')
    // DOMerror.insertBefore('h3')
    console.error(err)
  }
}

const chatCS = async () => {
  try {
    const chatCS = await getData(API).then(response => response.chat.csat)
    const dates = chatCS.data.map(e => e.date)
    const avgs = chatCS.data.map(e => e.avg_csat.toFixed(1))
    const avg = chatCS.average90Days.toFixed(1)
    const DOMavg = document.getElementById('chat-avg-cs')
    DOMavg.textContent = `${avg} / 5`
    const ctx = document.getElementById('chat-customer-satisfaction').getContext('2d')

    const chart = new Chart(ctx, abstractConfig(dates.reverse(), avgs.reverse(), 'Customer Satisfaction', 5, 1 ))
  } catch (err) {
    console.error(err)
  }
}

const callTime = async () => {
  try {
    const call = await getData(API).then(response => response.call.responseTime)
    const dates = call.data.map(e => e.date)
    const avgs = call.data.map(e => e.avg_answerSpeed_call)
    const avg = call.average90Days
    const avgMin = Math.floor(avg / 60).toString()
    const avgSec = minimumSecondsValues(avg)
    const DOMavg = document.getElementById('call-avg-time')
    DOMavg.textContent = `${avgMin}min ${avgSec}s`
    const valuesMin = avgs.map(e => Math.floor(e / 60).toString())
    const valuesSec = avgs.map(e => minimumSecondsValues(e))
    const minutesAndsecond = valuesMin.map((value, index) => `${value}.${valuesSec[index]}`)

    // console.log('Promedios call: ', minutesAndsecond)
    
    // console.log(typeof avg, avg)
    // console.log('minutos call: ', typeof minute, minute)
    // console.log('segundos call: ', typeof seconds, seconds)
    const ctx = document.getElementById('call-response-time').getContext('2d')

    const chart = new Chart(ctx, abstractConfig(dates.reverse() , minutesAndsecond.reverse(), 'Minutos' , 4, 1))

  } catch (err) {
    console.error(err)
  }
}

const emailTime = async () => {
  try {
    const email = await getData(API).then(response => response.email.responseTime)
    const dates = email.data.map(e => e.date)
    const avgs = email.data.map(e => e.avg_responseTime_email)
    const avg = email.average90Days
    const DOMavg = document.getElementById('email-avg-time')
    const avgHour = Math.floor(avg / 3600).toString()
    const avgMinutes = minimunMinutesValues(avg)
    DOMavg.textContent = `${avgHour}h ${avgMinutes}min`
    const avgsHours = avgs.map(e => Math.floor(e / 3600).toString())
    const avgsMinutes = avgs.map(e => minimunMinutesValues(e))
    const hoursAndMinutes = avgsHours.map((value, index) => `${value}.${avgsMinutes[index]}`)
    console.log('HOURS: ', avgsHours)
    console.log('MINUTES: ', avgsMinutes)

    console.log('Promedio email: ', avg)
    console.log('Fechas email: ', dates)
    console.log('Promedios email: ', avgs)
    
    const ctx = document.getElementById('email-response-time').getContext('2d')

    const chart = new Chart(ctx, abstractConfig(dates.reverse(), hoursAndMinutes.reverse(), 'Horas', 4, 2))

  } catch (err) {
    console.error(err)
  }
}

const emailCS = async () => {
  try {
    const emailCS = await getData(API).then(response => response.email.csat)
    const dates = emailCS.data.map(e => e.date)
    const avgs = emailCS.data.map(e => e.avg_csat.toFixed(1))
    const avg = emailCS.average90Days.toFixed(1)
    const DOMavg = document.getElementById('email-avg-cs')
    DOMavg.textContent = `${avg} / 5`

    const ctx = document.getElementById('email-customer-satisfaction').getContext('2d')

    const chart = new Chart(ctx, abstractConfig(dates.reverse(), avgs.reverse(), 'Customer Satisfaction', 5, 1 ))
  } catch (err) {
    console.error(err)
  }
}

const nps = async () => {
  try {
    const nps = await getData(API).then(response => response.nps.nps)
    const dates = nps.data.map(e => e.date)
    const avgs = nps.data.map(e => Math.trunc(e.npsAverage90Days).toString())
    const avg = nps.average90Days
    const DOMavg = document.getElementById('nps-avg')
    const avgNps = Math.trunc(avg)
    DOMavg.textContent = `${avgNps} NPS`

    const ctx = document.getElementById('graphic-nps').getContext('2d')

    const chart = new Chart(ctx, abstractConfig(dates.reverse(), avgs.reverse(), 'NPS', 100, 25))
    console.log('AVGS Nps: ', avgs)
    console.log('Dates Nps: ', dates)
  } catch (err) {
    console.error(err)
  }
}

const abstractConfig = (date, avgs, textY, axisYmax, axisYstep) => {
  return {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        data: avgs,
        borderColor: ['rgba(114, 139, 197, 1)'],
        borderWidth: 3
      }]
    },
    options: {
      plugins: {
        legend: false, // Hide legend
        tooltip: {
          backgroundColor: "#0b2f63",
          cornerRadius: 2,
          displayColors: false,
          padding: {
            x: 12,
            y: 10
          },
          caretPadding: 8,
          caretSize: 7,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 15,
          },
          footerFont: {
            weight: 'normal',
            style: 'italic'
          },
          callbacks: {
            label: function (context) {
              let value = context.raw
              // let dateLabel = context.label
              let first = Math.floor(value).toString()
              let second = first.length <= 1 ? value.slice(2) : value.slice(3)
              console.log('Tooltip: ', context)
              console.log('Tooltip Item: ', value)
              if (textY == 'Minutos') {
                return `${first}min ${second}s`
              } else if (textY == 'Horas') {
                return `${first}h ${second}min`
              } else if (textY == 'NPS' || textY == 'Customer Satisfaction') {
                return `${value}`
              }
              
            },
            footer: function(context) {
              if (textY == 'NPS') {
                return 'Prom. hoy + 90 días anteriores'
              } else {
                return
              }
            }
          }
        },
      },
      scales: {
        y: {
          type: 'linear',
          title: {
            display: true,
            text: textY,
            color: '#2f48a7',
            font: {
              size: 16,
              weight: 'bold',
            }
          },
          // stackWeight: .60,
          // min: 0,
          // max: 4,
          // suggestedMax: 60,
          suggestedMin: 0,
          suggestedMax: axisYmax,
          ticks: {
            stepSize: axisYstep,
            // crossAlign: 'center',
            backdropPadding: 2,
            padding: 5
          },
          
        },
        x: {
          ticks: {
            maxTicksLimit: 7,
          }
        }
      },
      

    }

  }
}

// (async () => {
//   try {
//     let chat = await getData(API).then(response => response.chat)
//     console.log(chat)
//     console.log(chat.graphicName)
//     let getDates = chat.data.map(e => e.date)
//     let getAverages = chat.data.map(e => e.averagePerDay)
//     console.log(getDates);
//     console.log(getAverages);
    
//   }
//   catch (err) {
//     console.error(err)
//   }
// })()

// const getDataGraphic = async () => {
//   try {
//     let chat = await getData(API).then(response => response.chat)
//     console.log(chat)
//     console.log(chat.graphicName)
//     let getDates = chat.data.map(e => e.date)
//     let getAvg = chat.data.map(e => e.averagePerDay)
//     console.log(getDates);
//     console.log(getAvg);
//   } catch (err) {
//     console.error(err)
//   }
// }

// getData(`${API}/chat`)
//   .then(response => response.json())
//   .then(chat => chat.map(e => {
//     console.log(e.data)
//     // return e.data.map(a => a.date)
//     e.data.map(data => {
//       chatDates = data.date
//       console.log('get dates before', chatDates)
//     })
//   }))
//   .catch(err => console.error(err))


// console.log('get dates after', chatDates)


if (typeof window !== "undefined") {
  window.onload = Promise.all[chatTime(), callTime(), emailTime(), nps(), chatCS(), emailCS()]
}

// getChart()