import { data } from "./modules/gratificacion-pe/dataTable.js"
import { Validator } from "./modules/gratificacion-pe/validations.js"
import { days360 } from "./modules/days-360.js"

document.getElementById('gratf-period').addEventListener('change', () => {
  putMonthsPeriods()
})

document.getElementById('calc').addEventListener('click', () => {
  calc.director()
})

const peFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const validate = new Validator()
class calcGratf {
  constructor({ baseGratf=0, totalGratf=0, months=0, amountVariable=0, applyVariables=false}) {
    this.baseGratf = baseGratf
    this.totalGratf = totalGratf
    this.months = months
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
      this.sumSalariesVariables()
      this.base()
      this.total()
    } else {
      console.log('La fecha no se encuentra en el rango');
    }

  }

  checkSalariesVariables() {
    let extraSalaries = [...document.querySelectorAll('[data-variable="extra-salary"]')]
    let variablesWithAmounts = 0
    extraSalaries.forEach(item => item.value > 0 ? variablesWithAmounts++ : false)
    console.log('cantidad de sueldos variables: ', variablesWithAmounts)
    variablesWithAmounts >= 3 ? this.applyVariables = true : this.applyVariables = false
    // console.log(this)
  }

  sumSalariesVariables () {
    let extraSalariesInputs = [...document.querySelectorAll('[data-variable="extra-salary"]')]
    let extSalariesValues = extraSalariesInputs.map(item => Number(item.value))
    this.applyVariables === true
      ? this.amountVariable = extSalariesValues.reduce((prev, acum) => prev + acum, 0)
      : this.amountVariable = 0

    console.log('sueldos variables: ', extSalariesValues)
    
  }

  computableTime (inputDate, period) {
    let DOMcomputableMonth = document.getElementById('gratf-months')
    let date = new Date(`${inputDate}T00:00:00`)
    let endPeriod = new Date(`${period.endDevengue}T00:00:00`)

    let computableDays = days360(date, endPeriod) + 1
    let computableMonths = Math.floor(computableDays / 30)
    this.months = computableMonths
    DOMcomputableMonth.value = computableMonths
  }

  base() {
    let salary = Number(document.getElementById('salary').value)
    let family = Number(document.getElementById('family-assignment').value)
    let fixCost = Number(document.getElementById('fix-cost').value)
    let DOMlblBaseGratf = document.getElementById('lbl-base-gratf')
    
    let sumAmount = this.applyVariables === true ? (salary + family + fixCost) + (this.amountVariable / 6) : (salary + family + fixCost)
    let baseAmount = Number((sumAmount).toFixed(2))

    this.baseGratf = baseAmount
    this.displayValue(DOMlblBaseGratf, this.baseGratf)
  }

  total() {
    let DOMlblTotal = document.getElementById('lbl-total-gratf')
    let calcTotal = this.baseGratf / 6 * this.months
    this.totalGratf = Number(calcTotal.toFixed(2))
    this.displayValue(DOMlblTotal, peFormatter.format(this.totalGratf))
    console.log(this)
  }

  displayValue(DOMelement, amount) {
    DOMelement.textContent = amount
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

