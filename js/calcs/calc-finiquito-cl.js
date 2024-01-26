import { Director } from "./modules/finiquito-cl/director.js"

moment.locale('es')

const director = new Director()
const btn = document.getElementById('btn-calc-finiquito')

btn.addEventListener('click', () => {
  director.calculateFiniquito()
})

const acc = [...document.getElementsByClassName("button-large ")];

acc.forEach(item => {
  item.addEventListener('click', function () {
    let active = document.querySelector(".button-large.active")
    let mql = window.matchMedia('(min-width:1020px)')
    if (active && active != this && mql.matches) {
      active.classList.remove("active");
      active.nextElementSibling.classList.remove("show");
    }
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");
  })
})

const variableSalaryRadio = [...document.getElementsByName('remu-variable')]

variableSalaryRadio.forEach(radio => {
  radio.addEventListener('change', function() {
    let varaibleSection = document.getElementById('apply-variable-salary')
    let variableInputs = [...document.querySelectorAll('[data-variable-salary="true"]')]

    if (document.getElementById('true-remuneracion').checked !== true) {
      varaibleSection.classList.add('ds-none')
      variableInputs.forEach(input => input.value = '')
    } else {
      varaibleSection.classList.remove('ds-none')
    }
  })
})

let typeCausal = document.getElementById('type_causal')
let compDismiss = [...document.querySelectorAll('[data-type-causal="dismiss"]')]
let compConclusionService = [...document.querySelectorAll('[data-type-causal="conclusion-service"]')]

typeCausal.addEventListener('change', () => {
  let blockNoticeDate = document.getElementById('block-notice-date')

  blockNoticeDate.classList.add('ds-none')
  compConclusionService.forEach(item => item.classList.add('ds-none'))
  compDismiss.forEach(item => item.classList.add('ds-none'))

  if (typeCausal.value == '3') {
    compConclusionService.forEach(item => item.classList.remove('ds-none'))

  } else if (typeCausal.value == '4') {
    compDismiss.forEach(item => item.classList.remove('ds-none'))

    blockNoticeDate.classList.remove('ds-none')
  } else if (typeCausal.value !== '4') {
    let noticeDate = document.getElementById('notice-date')
    noticeDate.value = ''
  }

})

if (typeCausal.value !== '4' ) {
  let blockNoticeDate = document.getElementById('block-notice-date')
  blockNoticeDate.classList.add('ds-none')

  compDismiss.forEach(item => item.classList.add('ds-none'))
}

if (typeCausal.value !== '3') {
  compConclusionService.forEach(item => item.classList.add('ds-none'))
}

let endContractDate = document.getElementById('end-contract-date')

endContractDate.addEventListener('change', () => {
  let valueDate = new Date(`${endContractDate.value}T00:00:00`)
  let date = moment(valueDate)
  let maxMonths = 3
  let findDates = []
  let DOMlabels = [...document.querySelectorAll('[data-month="variable"]')]

  for (let i = 0; i < maxMonths; i++) {
    let numMonth = date.month()
    let year = date.year()
    let nameMonth = moment().month(numMonth).format('MMMM')

    findDates.push(
      { 
        month: nameMonth.charAt(0).toUpperCase() + nameMonth.slice(1),
        year
      }
    )

    date.subtract(1, 'months')
  }

  DOMlabels.forEach((label, index) => {
    label.textContent = `${findDates[index].month} ${findDates[index].year}`
  })

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


document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.button-large.button-large__color').click()
})

