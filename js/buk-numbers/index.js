const API = "https://mattguz.github.io/buk-numbers/graphics-api.json"


const getData = async (urlapi) => {
  let response = await fetch(urlapi)
  let data = await response.json()
  return data
}

const getChat = async () => {
  try {
    let chat = await getData(API).then(response => response.chat)
    let dates = chat.data.map(e => e.date)
    let avgs = chat.data.map(e => e.averagePerDay)
    let avg = chat.average90Days
    let minute = Math.floor(avg).toString()
    let seconds = avg.toFixed(2).toString().slice(2)
    console.log(dates)
    console.log(typeof avg, avg)
    console.log('minutos: ', typeof minute, minute)
    console.log('segundos: ', typeof seconds, seconds)
    const DOMavg = document.getElementById('chatAvg')
    const ctx = document.getElementById('graphiChat').getContext('2d')
    
    DOMavg.textContent = `${minute} min ${seconds} seg`
    const chart = new Chart(ctx, abstractConfig(dates, avgs, 'Minutos'))

  } catch (err) {
    console.error(err)
  }
}

const getCall = async () => {
  try {
    let chat = await getData(API).then(response => response.call)
    let dates = chat.data.map(e => e.date)
    let avgs = chat.data.map(e => e.averagePerDay)
    let avg = chat.average90Days
    let minute = Math.floor(avg)
    let seconds = avg.toString().slice(2)
    console.log(dates)
    console.log(typeof avg, avg)
    console.log('minutos call: ', typeof minute, minute)
    console.log('segundos call: ', typeof seconds, seconds)
    const DOMavg = document.getElementById('callAvg')
    const ctx = document.getElementById('graphiCall').getContext('2d')

    DOMavg.textContent = `${minute} min ${seconds} seg`
    const chart = new Chart(ctx, abstractConfig(dates, avgs, 'Minutos'))

  } catch (err) {
    console.error(err)
  }
}

const getEmail = async () => {
  try {
    let chat = await getData(API).then(response => response.email)
    let dates = chat.data.map(e => e.date)
    let avgs = chat.data.map(e => e.averagePerDay)
    let avg = chat.average90Days
    let hours = Math.floor(avg).toString()
    let minutes = avg.toFixed(2).toString().slice(2)
    console.log(dates)
    console.log(typeof avg, avg)
    console.log('minutos email: ', typeof hours, hours)
    console.log('segundos email: ', typeof minutes, minutes)
    const DOMavg = document.getElementById('emailAvg')
    const ctx = document.getElementById('graphicEmail').getContext('2d')

    DOMavg.textContent = `${hours} h ${minutes} min`
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
          min: 0,
          max: 4,
          // suggestedMin: 10,
          // suggestedMax: 100
          ticks: {
            stepSize: 1,
            padding: 5
          },
          
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