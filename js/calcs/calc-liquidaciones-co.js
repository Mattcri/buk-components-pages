import { Director, validate } from "./modules/liquidaciones-co/director.js"

const director = new Director()
const btnCalculate = document.getElementById('btn-calculate')
const sectionResults = document.getElementById('calc-results')

btnCalculate.addEventListener('click', () => {
  director.calculateLiquidation()
  sectionResults.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })

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

function checkShowFixedTermInput() {
  if (typeOfContract.value === 'fixed-term' && withdrawalReason.value === 'option-3') {
    fixedTerm.style.visibility = 'visible'
  } else {
    fixedTerm.style.visibility = 'hidden'
    document.getElementById('end-contract-fixed-date').value = ''
  }
}

fixedTerm.style.visibility = 'hidden'

typeOfContract.addEventListener('change', () => {
  checkShowFixedTermInput()
})
withdrawalReason.addEventListener('change', () => {
  checkShowFixedTermInput()
})

const inputsRequired = [...document.querySelectorAll('input[required]')]

inputsRequired.forEach(input => {
  input.addEventListener('blur', function() {
    let dateAdmission = new Date(`${document.getElementById('start-contract-date').value}T00:00:00`)
    let dateEndContract = new Date(`${document.getElementById('layoff-date').value}T00:00:00`)
    let dateFixedTerm = new Date(`${document.getElementById('end-contract-fixed-date').value}T00:00:00`)

    this.classList.contains('border-error')
      ? this.classList.remove('border-error')
      : false

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

  })
})

