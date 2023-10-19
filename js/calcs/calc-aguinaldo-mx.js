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

lisrDetail.addEventListener('click', function () {
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

btnCalc.addEventListener('click', function () {
  let taxOption = document.getElementById('type-tax')
  let selectTax = [...document.querySelectorAll('[data-display-type-tax="tax"]')]
  taxOption.value === 'risr'
    ? selectTax.forEach(item => item.textContent = 'RISR')
    : selectTax.forEach(item => item.textContent = 'LISR')

  director.calculate()

})


const closeDialog = document.getElementById('close-dialog-errs')
const dialogErrors = document.querySelector('.buk-modal.buk-modal--control-errs')

closeDialog.addEventListener('click', () => {
  document.querySelector('body').classList.remove('non-scroll')
  document.querySelector('.buk-modal.buk-modal--control-errs').classList.remove('buk-modal--show')
})

dialogErrors.addEventListener('click', function (event) {
  if (!event.target.closest('.buk-modal__content')) {
    document.querySelector('body').classList.remove('non-scroll')
    document.querySelector('.buk-modal.buk-modal--control-errs').classList.remove('buk-modal--show')
  }
})