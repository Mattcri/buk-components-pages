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
      // console.log(entry.target)
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

// MultiTab solution

const buttonsCategories = [...document.querySelectorAll('[data-categorie-target]')]
const buttonsSubCategories = [...document.querySelectorAll('[data-sub-categorie-target]')]
const dataContent = [...document.querySelectorAll('[data-categories-content]')]
const dataContentSubCategories = [...document.querySelectorAll('[data-sub-categories-content]')]

buttonsCategories.forEach(button => {
  button.addEventListener('click', function () {
    dataContent.forEach(content => content.classList.remove('categorie-active'))
    buttonsCategories.forEach(btn => btn.classList.remove('categorie-selected'))
    
    let getTargetId = this.dataset.categorieTarget.slice(1)
    let target = document.getElementById(getTargetId)
    // console.log(getTargetId)
    // console.log(target)

    target.classList.add('categorie-active')
    button.classList.add('categorie-selected')

  })
})

buttonsSubCategories.forEach(button => {
  button.addEventListener('click', function () {
    dataContentSubCategories.forEach(content => content.classList.remove('sub-categorie-active'))
    buttonsSubCategories.forEach(btn => btn.classList.remove('sub-categorie-selected'))

    let getTargetsClass = this.dataset.subCategorieTarget
    let targets = [...document.getElementsByClassName(getTargetsClass)]
    console.log('Targets: ', targets)
    
    targets.forEach(e => e.classList.add('sub-categorie-active'))
    // console.log(target);
    button.classList.add('sub-categorie-selected')

    let targetsEbooks = [...document.querySelectorAll(`#ebooks .${getTargetsClass}.sub-categorie-active`)]
    let targetsGuides = [...document.querySelectorAll(`#guides .${getTargetsClass}.sub-categorie-active`)]
    console.log('Elements ebooks: ', targetsEbooks)
    console.log('Elements guides: ', targetsGuides)
    // console.log(targetsEbooks[0].parentElement.parentElement.id);
    // console.log(targetsGuides[0].parentElement.parentElement.id);
    let foundEbooks = targetsEbooks.length
    let foundGuides = targetsGuides.length
    // let idEbooks = targets[0].parentElement.parentElement.id
    // let idGuides = targets[0].parentElement.parentElement.id

    resourcesNotAvailable('ebooks', foundEbooks)
    resourcesNotAvailable('guides', foundGuides)
    
  })
})
// console.log(document.body.contains(document.getElementById('notFoundResults')));
const resourcesNotAvailable = (idSection, results) => {
  let DOMnewTag = document.createElement('p')
  let DOMtarget = document.getElementById(idSection)
  let message = 'No existen resultados'
  let idTxt = 'notFoundResults'

  DOMnewTag.textContent = message
  DOMnewTag.id = idTxt

  results != 0 ? true : DOMtarget.insertAdjacentElement('afterbegin', DOMnewTag)
  results > 0 && document.body.contains(document.getElementById(idTxt))
    ? document.getElementById(idTxt).remove()
    : true

  console.log(document.body.contains(document.getElementById(idTxt)));
}

// const removeMessage = () => {

// }

// console.log(buttonsCategories);
// console.log(buttonsSubCategories);

dataContent[0].classList.add('categorie-active')
buttonsCategories[0].classList.add('categorie-selected')

dataContentSubCategories[0].classList.add('sub-categorie-active')
buttonsSubCategories[0].classList.add('sub-categorie-selected')
