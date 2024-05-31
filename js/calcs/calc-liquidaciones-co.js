import { Director, validate } from "./modules/liquidaciones-co/director.js"
import { nvtCO } from "./modules/liquidaciones-co/calc.js"

const director = new Director()
const btnCalculate = document.getElementById('btn-calculate')

btnCalculate.addEventListener('click', () => {
  director.calculateLiquidation()
})

const closeDialog = document.getElementById('close-dialog-errs')
const dialogErrors = document.querySelector('.buk-modal.buk-modal--control-errs')

closeDialog.addEventListener('click', () => {
  let errorsList = document.querySelectorAll('#errors-list li')
  document.querySelector('body').classList.remove('non-scroll')
  document.querySelector('.buk-modal.buk-modal--control-errs').classList.remove('buk-modal--show')
  errorsList.forEach(li => li.remove())
  validate.errorsList = []
})

dialogErrors.addEventListener('click', function (event) {
  if (!event.target.closest('.buk-modal__content')) {
    let errorsList = document.querySelectorAll('#errors-list li')
    document.querySelector('body').classList.remove('non-scroll')
    document.querySelector('.buk-modal.buk-modal--control-errs').classList.remove('buk-modal--show')
    errorsList.forEach(li => li.remove())
    validate.errorsList = []
  }
})

const fixedTerm = document.querySelector('[data-condition="fixed-term"]')
const typeOfContract = document.getElementById('contract-type')
const withdrawalReason = document.getElementById('withdrawal-reason')

function dsNoneOrVisibleOption (element) {
  let mql = window.matchMedia('(min-width:767px)')
  if (mql.matches) {
    element.style.visibility = 'visible'
  } else {
    element.style.display = 'block'
  }
}

function checkShowFixedTermInput() {
  let mql = window.matchMedia('(min-width:767px)')
  if (typeOfContract.value === 'fixed-term' && withdrawalReason.value === 'option-3') {
    mql.matches === true
      ? fixedTerm.style.visibility = 'visible' 
      : fixedTerm.style.display = 'block'
  } else {
    console.log(mql.matches)
    mql.matches === true
      ? fixedTerm.style.visibility = 'hidden' 
      : fixedTerm.style.display = 'none'
    document.getElementById('end-contract-fixed-date').value = ''
  }
}

checkShowFixedTermInput()

typeOfContract.addEventListener('change', () => {
  checkShowFixedTermInput()
})
withdrawalReason.addEventListener('change', () => {
  checkShowFixedTermInput()
})

const inputsRequired = [...document.querySelectorAll('input[required]')]

inputsRequired.forEach(input => {
  input.addEventListener('blur', function() {
    if (this.classList.contains('border-error')) {
      let dateAdmission = new Date(`${document.getElementById('start-contract-date').value}T00:00:00`)
      let dateEndContract = new Date(`${document.getElementById('layoff-date').value}T00:00:00`)
      let dateFixedTerm = new Date(`${document.getElementById('end-contract-fixed-date').value}T00:00:00`)
      let salary = document.getElementById('salary')
      let salaryLastYear = document.getElementById('salary-last-year')
      let daysWorkedInMonth = document.getElementById('days-worked')

      // this.classList.contains('border-error')
      //   ? this.classList.remove('border-error')
      //   : false

      if (salary.valueAsNumber !== 0 && salary.valueAsNumber >= nvtCO.getSMLV()) {
        salary.classList.remove('border-error')
      }

      if (daysWorkedInMonth.valueAsNumber !== 0 && daysWorkedInMonth.valueAsNumber <= 30) {
        daysWorkedInMonth.classList.remove('border-error')
      }

      if (salaryLastYear.valueAsNumber !== 0 && salaryLastYear.valueAsNumber >= nvtCO.getSMLVlastYear()) {
        salaryLastYear.classList.remove('border-error')
      }

      if (moment(dateAdmission).isBefore(dateEndContract)) {
        document.getElementById('start-contract-date').classList.remove('border-error')
      }

      if (moment(dateEndContract).isAfter(dateAdmission)) {
        document.getElementById('layoff-date').classList.remove('border-error')
      }

      if (typeOfContract.value === 'fixed-term' && withdrawalReason.value === 'option-3') {
        if (moment(dateAdmission).isBefore(dateFixedTerm)) {
          document.getElementById('start-contract-date').classList.remove('border-error')
        }
        else if (moment(dateFixedTerm).isAfter(dateAdmission)) {
          document.getElementById('end-contract-fixed-date').classList.remove('border-error')
        }
      }

    }

  })
})

const inputSalaryType = document.getElementById('salary-type')
const inputDateStartContract = document.getElementById('start-contract-date')
const inputDateEndContract = document.getElementById('layoff-date')

function enablePreviousYear () {
  let DOMsectionPrevYear = document.getElementById('previous-year-liquidation')
  let height = DOMsectionPrevYear.scrollHeight
  let dateAdmission = new Date(`${document.getElementById('start-contract-date').value}T00:00:00`)
  let dateEndContract = new Date(`${document.getElementById('layoff-date').value}T00:00:00`)
  let currentYear = new Date().getFullYear().toString()
  let prevYear = (currentYear - 1).toString()
  let initDateToShowPrevYear = moment(`31/12/${prevYear}T00:00:00`, "DD/MM/YYYY")
  let maxDateToShowPrevYear = moment(`01/02/${currentYear}T00:00:00`, "DD/MM/YYYY")
  let itemsDetailPrevYear = [...document.querySelectorAll('.calc-detail [data-item-prev-year="true"]')]
  let itemsSeparator = [...document.querySelectorAll('.calc-detail [data-item-separator="observe"]')]

  if (inputSalaryType.value !== "integral" && moment(dateEndContract).isBetween(initDateToShowPrevYear, maxDateToShowPrevYear) && moment(dateAdmission).isBefore(dateEndContract) ) {
    DOMsectionPrevYear.style.height = `${height}px`
    itemsDetailPrevYear.forEach(element => element.classList.remove('ds-none'))
    itemsSeparator.forEach(element => element.classList.add('calc-detail--separator'))
  } else {
    DOMsectionPrevYear.style.height = '0px'
    itemsDetailPrevYear.forEach(element => element.classList.add('ds-none'))
    itemsSeparator.forEach(element => element.classList.remove('calc-detail--separator'))
  }
}

enablePreviousYear()
inputSalaryType.addEventListener('change', () => {
  enablePreviousYear()
})
inputDateStartContract.addEventListener('change', () => {
  enablePreviousYear()
})
inputDateEndContract.addEventListener('change', () => {
  enablePreviousYear()
})

const inputSalaryLastYear = document.getElementById('salary-last-year')

inputSalaryLastYear.addEventListener('change', function() {
  let auxTransportLastYear = document.getElementById('aux-transport-last-year')
  let salaryLastYear = Number(this.value)

  if (salaryLastYear > (nvtCO.getSMLVlastYear() * 2)) {
    auxTransportLastYear.value = 0
  } else {
    auxTransportLastYear.value = nvtCO.getAuxTransportLastYear()
  }

})