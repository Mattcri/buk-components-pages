const API = "http://localhost:3000"

let chatAverages = []
let chatDates = []

const getData = async (urlapi) => {
  let response = await fetch(urlapi)
  let data = await response.json()
  return data
}

(async () => {
  try {
    let chat = await getData(`${API}/chat`)
    console.log(chat)
    console.log(chat.graphicName)
    let getDates = chat.data.map(e => e.date)
    let getAverages = chat.data.map(e => e.averagePerDay)
    console.log(getDates);
    console.log(getAverages);
    // let info = await chat.forEach(e => {
    //   e.data.forEach(data => {
    //     console.log('data', data);
    //     chatDates = data.date
    //   })
    // })
    
    // await info
    // console.log(chatDates)
    // let graphicInfo = await chat
  }
  catch (err) {
    console.error(err)
  }
})()

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

// if (typeof window !== "undefined") {
//   window.onload = getData(`${API}/chat`)
// }