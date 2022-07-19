const DOMcipher = document.getElementById('num')
const DOMcipher2 = document.getElementById('num2')
const DOMcipher3 = document.getElementById('num3')
const DOMcipher4 = document.getElementById('num4')
const cipherToNum = Number(DOMcipher.textContent)
const cipherToNum2 = Number(DOMcipher2.textContent)
const cipherToNum3 = Number(DOMcipher3.textContent)
const cipherToNum4 = Number(DOMcipher4.textContent)
const sectionCounter = document.getElementById('counter')

console.log(DOMcipher.textContent)
console.log(typeof cipherToNum);
console.log(cipherToNum);
console.log(cipherToNum2);

DOMcipher.textContent = '+ 0'
DOMcipher2.textContent = '+ 0'
DOMcipher3.textContent = '+ 0'
DOMcipher4.textContent = '+ 0'

// for (let i = 0; i <= numValue; i++) {
  //   setInterval(function() {
    //     DOMnum.textContent = i
    //   }, 1500)
    //   console.log(i)
    // }
const initCounter = (DOM, increment) => {
  DOM.textContent = `+ ${increment.toLocaleString()}`
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

const count2 = (DOMelement, numLimit) => {
  let to = 0
  const counter = () => {
    let increment = to++
    increment <= numLimit ? initCounter(DOMelement, increment) : clearInterval(timer)
  }

  const timer = setInterval(counter, 100)
}

const options = {
  threshold: .15,
  rootMargin: "-160px 0px",
}

const observerCounter = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target)
      count(DOMcipher, cipherToNum)
      count2(DOMcipher2, cipherToNum2)
      count2(DOMcipher3, cipherToNum3)
      count(DOMcipher4, cipherToNum4)
      observerCounter.unobserve(sectionCounter)
    }

  })
}, options)

observerCounter.observe(sectionCounter)

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


// console.log(sectionCounter)

// const initCounter = ( increment) => {
//   const classNum = Array.from(document.getElementsByClassName('foo'))
//   classNum.forEach(element => {
//     element.textContent = increment
//   });
//   classNum.textContent = increment
// }

