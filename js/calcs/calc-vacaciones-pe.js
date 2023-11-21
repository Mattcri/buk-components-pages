import { Director } from "./modules/vacaciones-pe/director.js"

const director = new Director()
const btnCalculate = document.getElementById('btn-calc-holidays')

btnCalculate.addEventListener('click', function() {
  director.calculate()
})

const holidaysDate = document.getElementById('holidays-date')
moment.locale('es')

holidaysDate.addEventListener('change', function() {
  let dateRequest = new Date(`${holidaysDate.value}T00:00:00`)
  let subtrOneMonth = dateRequest.getMonth() - 1
  let previusMonth = subtrOneMonth == -1 ? 11 : subtrOneMonth
  let maxMonths = 6
  let months = []

  for (let i=0; i < maxMonths; i++) {
    let txtMonth = moment().month(previusMonth).format('MMMM')
    months.push(txtMonth.charAt(0).toUpperCase() + txtMonth.slice(1))
    previusMonth--
  }

  let DOMvariablePeriods = [...document.querySelectorAll('[data-variable="extra-salary"]')]

  DOMvariablePeriods.forEach((item, index) => {
    let { previousElementSibling } = item
    previousElementSibling.firstElementChild.textContent = `Variable ${months[index]}`
  })

  console.log('months: ', months)

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
