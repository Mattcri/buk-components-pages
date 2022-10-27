const API = "https://mattguz.github.io/buk-numbers/data_buknumbers.json"


const getData = async (urlapi) => {
  let response = await fetch(urlapi) 
  return response.json()
}

const minValues = (num) => {
  let value = Math.floor(num % 60)
  if (value >= 10) {
    return value.toString()
  } else {
    return value.toString().padStart(2, '0')
  }
}

const getChat = async () => {
  try {
    const startTime = performance.now()
    const chat = await getData(API).then(response => response.chat.responseTime)
    const dates = chat.data.map(e => e.date)
    const avgs = chat.data.map(e => e.avg_responseTime_chat)
    let avg = chat.average90Days
    let avgMin = Math.floor(avg / 60).toString()
    let avgSec = minValues(avg)
    const DOMavg = document.getElementById('chatAvg')
    DOMavg.textContent = `${avgMin}min ${avgSec}s`
    const valuesMin = avgs.map(e => Math.floor(e / 60).toString())
    const valuesSec = avgs.map(e => minValues(e))

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

    console.log(`Tiempo de respuesta del código: ${endTime - startTime} ms`)
    // let minute = Math.floor(avg).toString()
    // let seconds = avg.toFixed(2).toString().slice(2)

    // let i = 1
    // avgs.forEach(item => {
    //   let fomattMinutes = Math.trunc(item / 60)
    //   let formattSeconds = item % 60
    
    //   console.log(i++, '-' , fomattMinutes)
    //   console.log(formattSeconds)
    // })

    console.log('Promedio chat: ', avg)
    console.log('Fechas chat: ', dates)
    console.log('Promedios chat: ', avgs)
    
    // console.log(typeof avg, avg)
    // console.log('minutos: ', typeof minute, minute)
    // console.log('segundos: ', typeof seconds, seconds)
    
    const ctx = document.getElementById('graphiChat').getContext('2d')
    
    
    const chart = new Chart(ctx, abstractConfig(dates.reverse(), minutesAndsecond.reverse(), 'Minutos'))
    
  } catch (err) {
    console.error(err)
  }
}

const getCall = async () => {
  try {
    const call = await getData(API).then(response => response.call.responseTime)
    const dates = call.data.map(e => e.date)
    const avgs = call.data.map(e => e.avg_answerSpeed_call)
    const avg = call.average90Days
    const avgMin = Math.floor(avg / 60).toString()
    const avgSec = minValues(avg)
    const DOMavg = document.getElementById('callAvg')
    DOMavg.textContent = `${avgMin}min ${avgSec}s`
    const valuesMin = avgs.map(e => Math.floor(e / 60).toString())
    const valuesSec = avgs.map(e => minValues(e))
    const minutesAndsecond = valuesMin.map((value, index) => `${value}.${valuesSec[index]}`)

    console.log('Promedios call: ', minutesAndsecond)
    
    // console.log(typeof avg, avg)
    // console.log('minutos call: ', typeof minute, minute)
    // console.log('segundos call: ', typeof seconds, seconds)
    const ctx = document.getElementById('graphiCall').getContext('2d')

    const chart = new Chart(ctx, abstractConfig(dates.reverse() , minutesAndsecond.reverse(), 'Minutos'))

  } catch (err) {
    console.error(err)
  }
}

const getEmail = async () => {
  try {
    let email = await getData(API).then(response => response.email.responseTime)
    let dates = email.data.map(e => e.date)
    let avgs = email.data.map(e => e.avg_responseTime_email)
    let avg = email.average90Days
    let hours = Math.floor(avg).toString()
    let minutes = avg.toFixed(2).toString().slice(2)
    console.log('Promedio email: ', avg)
    console.log('Fechas email: ', dates)
    console.log('Promedios email: ', avgs)
    // console.log(typeof avg, avg)
    // console.log('minutos email: ', typeof hours, hours)
    // console.log('segundos email: ', typeof minutes, minutes)
    // const DOMavg = document.getElementById('emailAvg')
    const ctx = document.getElementById('graphicEmail').getContext('2d')

    // DOMavg.textContent = `${hours} h ${minutes} min`
    const chart = new Chart(ctx, abstractConfig(dates, avgs, 'Horas'))

  } catch (err) {
    console.error(err)
  }
}

const abstractConfig = (date, avg, time) => {
  return {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        data: avg,
        borderColor: ['rgba(114, 139, 197, 1)'],
        borderWidth: 3
      }]
    },
    options: {
      plugins: {
        legend: false // Hide legend
      },
      scales: {
        y: {
          type: 'linear',
          title: {
            display: true,
            text: time,
            color: '#2f48a7',
            font: {
              size: 16,
              weight: 'bold',
            }
          },
          // stackWeight: .60,
          min: 0,
          max: 4,
          // suggestedMax: 60,
          // suggestedMin: 0,
          // suggestedMax: 60,
          ticks: {
            stepSize: 1,
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



// const data = {

// }

// const config = {
//   type: 'line',
//   data: data,
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// }



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
  window.onload = Promise.all[getChat(), getCall(), getEmail()]
}

// getChart()