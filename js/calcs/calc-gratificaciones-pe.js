import { data } from "./modules/gratificacion-pe/dataTable.js"
import { Validator } from "./modules/gratificacion-pe/validations.js"
import { days360 } from "./modules/days-360.js"

document.getElementById('gratf-period').addEventListener('change', () => {
  putMonthsPeriods()
})

document.getElementById('calc').addEventListener('click', () => {
  calc.director()
})

const validate = new Validator()


class calcGratf {
  constructor({baseGratf=0, total=0, amountVariable=0, applyVariables=false}) {
    this.baseGratf = baseGratf
    this.total = total
    this.amountVariable = amountVariable
    this.applyVariables = applyVariables
    this.init()
  }

  async init() {
    await putMonthsPeriods()
    document.getElementById('gratf-period').click()
  }

  director() {
    let selectedPeriod = document.getElementById('gratf-period').value
    let inputDate = document.getElementById('gratf-date').value
    let searchPeriod = data.table.find(p => p.period == selectedPeriod)

    if (validate.isInRangeDate(inputDate, searchPeriod.startDevengue, searchPeriod.endDevengue)) {
      this.computableTime(inputDate, searchPeriod)
      this.checkSalariesVariables()
    } else {
      console.log('La fecha no se encuentra en el rango');
    }

  }

  checkSalariesVariables() {
    let extraSalaries = [...document.querySelectorAll('[data-variable="extra-salary"]')]
    let amount = 0
    extraSalaries.forEach(item => item.value > 0 ? amount++ : false)
    console.log('cantidad de sueldos variables: ', amount)
    if (amount >= 3) this.applyVariables = true
    console.log(this)
  }

  computableTime (inputDate, period) {
    // let selectedPeriod = document.getElementById('gratf-period').value
    // let inputDate = document.getElementById('gratf-date').value
    let DOMcomputableMonth = document.getElementById('gratf-months')
    // let searchPeriod = data.table.find(p => p.period == selectedPeriod)
    let date = new Date(`${inputDate}T00:00:00`)
    let endPeriod = new Date(`${period.endDevengue}T00:00:00`)

    let computableDays = days360(date, endPeriod) + 1
    let computableMonths = Math.floor(computableDays / 30)

    DOMcomputableMonth.value = computableMonths
  }


}


const calc = new calcGratf({})



console.log(data)
// console.log('calc: ', calc)

function putMonthsPeriods() {
  const selectedPeriod = document.getElementById('gratf-period').value
  const DOMperiods = [...document.querySelectorAll('[data-variable="extra-salary"]')]
  const monthsJuly = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
  const monthsDecember = ['Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre']
  const findPeriod = data.table.find(p => p.period == selectedPeriod)

  if (findPeriod.period.includes('julio')) {
    // Recorremos DOMperiods y se cambia el texto según los meses del periodo
    DOMperiods.forEach((item, index) => {
      let { previousElementSibling } = item
      previousElementSibling && (previousElementSibling.textContent = monthsJuly[index])
    })
    // console.log('julio')
  } else {
    DOMperiods.forEach((item, index) => {
      let { previousElementSibling } = item
      previousElementSibling && (previousElementSibling.textContent = monthsDecember[index])
    })
    // console.log('decem')
  }

  console.log(findPeriod)

}

