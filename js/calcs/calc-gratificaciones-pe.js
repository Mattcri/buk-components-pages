import { data } from "./modules/gratificacion-pe/dataTable.js"
import { Validator } from "./modules/gratificacion-pe/validations.js"
import { days360, days360v2 } from "./modules/days-360.js"

document.getElementById('gratf-period').addEventListener('change', () => {
  putMonthsPeriods()
})

document.getElementById('btn-calculate').addEventListener('click', () => {
  director.gratification()
})

const peFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const validator = new Validator()

class Director {
  gratification () {
    let selectedPeriod = document.getElementById('gratf-period').value
    let inputDate = document.getElementById('gratf-date').value
    let searchPeriod = data.table.find(p => p.period == selectedPeriod)

    validator.dateInputIsEmpty(inputDate)
      .then(() => validator.isInRangeDate(inputDate, searchPeriod.startDevengue, searchPeriod.endDevengue))
      .then(() => calc.computableTime(inputDate, searchPeriod))
      .then(() => calc.checkSalariesVariables())
      .then(() => calc.sumSalariesVariables())
      .then(() => calc.avgSalariesVariables())
      .then(() => calc.base())
      .then(() => calc.total())
      .catch((err) => {
        console.error(err)
      })
  }
}

const director = new Director()
class calcGratf {
  constructor({ baseGratf=0, totalGratf=0, bonus=0, months=0, amountVariable=0, applyVariables=false}) {
    this.baseGratf = baseGratf
    this.totalGratf = totalGratf
    this.bonus = bonus
    this.months = months
    this.amountVariable = amountVariable
    this.applyVariables = applyVariables
    this.init()
  }

  async init() {
    await putMonthsPeriods()
    document.getElementById('gratf-period').click()
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

  avgSalariesVariables() {
    let DOMavg = document.getElementById('gratf-avg-variables')
    if (this.applyVariables === true) {
      let avg = this.amountVariable / 6
      this.displayValue('val', DOMavg, peFormatter.format(avg))
      console.log('avg: ', avg);
    } else {
      this.displayValue('val', DOMavg, peFormatter.format(0))
    }
  }

  computableTime (inputDate, period) {
    let DOMcomputableMonth = document.getElementById('gratf-months')
    let date = new Date(`${inputDate}T00:00:00`)
    let endPeriod = new Date(`${period.endDevengue}T00:00:00`)
    let maxMonths = 6

    // let computableDays = days360(date, endPeriod) + 1
    let computableDays = days360v2(date, endPeriod)
    console.log('360v2: ', computableDays);
    let computableMonths = Math.floor(computableDays / 30)
    computableMonths >= maxMonths ? this.months = maxMonths : this.months = computableMonths
    DOMcomputableMonth.value = this.months
  }

  healthBonus() {
    let esSalud = document.getElementById('soc-essalud')
    let eps = document.getElementById('soc-eps')
    if (esSalud.checked === true) {
      return 0.09
    } else if (eps.checked === true) {
      return 0.0675
    }
  }

  base() {
    let salary = Number(document.getElementById('salary').value)
    let family = Number(document.getElementById('family-assignment').value)
    let fixCost = Number(document.getElementById('fix-cost').value)
    let DOMlblBaseGratf = document.getElementById('lbl-base-gratf')
    
    let sumAmount = this.applyVariables === true ? (salary + family + fixCost) + (this.amountVariable / this.months) : (salary + family + fixCost)
    let baseAmount = Number((sumAmount).toFixed(2))

    this.baseGratf = baseAmount
    this.displayValue('val', DOMlblBaseGratf, this.baseGratf)
  }

  total() {
    let DOMlblTotal = document.getElementById('lbl-total-gratf')
    let DOMgratfOrdinary = document.getElementById('lbl-ordinary')
    let DOMgratfBonus = document.getElementById('lbl-bonus')
    let absentDays = Number(document.getElementById('absent-days').value)

    let calcTotal = (this.baseGratf / 6 * this.months) - (this.baseGratf / 180 * absentDays)
    let bonification = Number(calcTotal.toFixed(2)) * this.healthBonus()
    this.totalGratf = Number(calcTotal.toFixed(2))
    this.bonus = Number(bonification.toFixed(2))
    let totalDeposit = this.totalGratf + this.bonus

    this.displayValue('dom', DOMgratfOrdinary, peFormatter.format(calcTotal))
    this.displayValue('dom', DOMgratfBonus, peFormatter.format(bonification))
    this.displayValue('dom',DOMlblTotal, peFormatter.format(totalDeposit))
    console.log(this)
  }

  displayValue(type, DOMelement, amount) {
    if (type === 'dom') {
      DOMelement.textContent = amount
    } else if (type === 'val') {
      DOMelement.value = amount
    }
  }

}

const calc = new calcGratf({})

console.log(data)

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
  }

  console.log(findPeriod)

}

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