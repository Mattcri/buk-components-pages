let DOMnum = document.getElementById('num')
let DOMnum2 = document.getElementById('num2')
let DOMnum3 = document.getElementById('num3')
let DOMnum4 = document.getElementById('num4')
let numValue = Number(DOMnum.textContent)
let numValue2 = Number(DOMnum2.textContent)
let numValue3 = Number(DOMnum3.textContent)
let numValue4 = Number(DOMnum4.textContent)

// for (let i = 0; i <= numValue; i++) {
  //   setInterval(function() {
    //     DOMnum.textContent = i
    //   }, 1500)
    //   console.log(i)
    // }
const initCounter = (DOM, increment) => {
  DOM.textContent = `+${increment}`
}

const count = (DOMelement, numLimit) => {
  let to = 0
  const counter = () => {
    let increment = (to++) * 100
    increment <= numLimit ? initCounter(DOMelement, increment) : clearInterval(timer)
    // increment <= numValue2 ? initCounter(increment) : clearInterval(timer)
    // if (increment <= numValue) {
      //   DOMnum.innerText = increment
      //   console.log(increment)
      // } else {
        //   clearInterval(timer)
        // }
  }
  
  const timer = setInterval(counter, 70)

}

count(DOMnum, numValue)
count(DOMnum2, numValue2)
count(DOMnum3, numValue3)
count(DOMnum4, numValue4)


// function counter() {
//   setInterval(function() {
//     let from = 0
//     let to = 100
  
//     if (from <= to) {
//       from++
//       DOMnum.textContent = from
//       counter()
//     } 
//     // DOMnum.textContent = count
//     // let count = from <= to ? from+=1 : 0
  
//   }, 150)
  
// }

// counter()

console.log(DOMnum.textContent)
console.log(typeof numValue);
console.log(numValue);

// const initCounter = ( increment) => {
//   const classNum = Array.from(document.getElementsByClassName('foo'))
//   classNum.forEach(element => {
//     element.textContent = increment
//   });
//   classNum.textContent = increment
// }

