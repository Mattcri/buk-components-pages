import { Director } from "./modules/aguinaldo-mx/director.js"

const director = new Director()

const lisrDetail = document.getElementById('lisr-detail')
const dischargeDateOptions = [...document.getElementsByName('discharge-date-option')]

dischargeDateOptions.forEach(option => {
  option.addEventListener('change', function () {
    let dischargeDateVisibility = document.getElementById('discharge-date-visibility')
    if (option.id == "bol-discharge-date-true") {
      dischargeDateVisibility.classList.remove('ds-none')
    } else {
      let dsDate = document.getElementById('discharge-date')
      dischargeDateVisibility.classList.add('ds-none')
      dsDate.value = ''
    }
  })
})

lisrDetail.addEventListener('click', function() {
  let dropdown = document.querySelector('.calc__fields.calc__fields--dropdown')
  this.classList.toggle('active')

  if (this.classList.contains('active')) {
    let height = dropdown.scrollHeight
    dropdown.style.height = `${height}px`
  } else {
    dropdown.style.height = '0px'
  }
})

const btnCalc = document.getElementById('btn-calculate-aguinaldo')

btnCalc.addEventListener('click', function() {
  director.calculate()
})