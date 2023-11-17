import { peFormatter } from "../currencyPE.js"
import { days360 } from "../days-360.js"

class CalcHolidays {
  constructor({
    sumVariablesDivAccumHolidays = 0,
    applyVariables = false,
    accumHolidays = 0,
    baseHolidays = 0,
    total = 0
  }) {
    this.sumVariablesDivAccumHolidays = sumVariablesDivAccumHolidays
    this.applyVariables = applyVariables
    this.accumHolidays = accumHolidays
    this.baseHolidays = baseHolidays
    this.total = total
  }

  checkSalariesVariables() {
    let extraSalaries = [...document.querySelectorAll('[data-variable="extra-salary"]')]
    let variablesWithAmounts = 0
    extraSalaries.forEach(item => Number(item.value) > 0 ? variablesWithAmounts++ : false)
    console.log('cantidad de sueldos variables: ', variablesWithAmounts)
    variablesWithAmounts >= 3 ? this.applyVariables = true : this.applyVariables = false
  }

  avgAndSumVariables() {
    let DOMavgSalaries = document.getElementById('avg-variables-salaries')
    let extraSalariesInputs = [...document.querySelectorAll('[data-variable="extra-salary"]')]
    let extSalariesValues = extraSalariesInputs.map(item => Number(item.value))
    let sumExtSalaries = () => {
      if (this.applyVariables === true) {
        return extSalariesValues.reduce((prev, acum) => prev + acum, 0)
      } else {
        return 0
      }
    }
    let avg = sumExtSalaries() / 6
    this.sumVariablesDivAccumHolidays = Number((sumExtSalaries() / this.accumHolidays).toFixed(2))
    this.displayValue('curr', DOMavgSalaries, avg)
    console.log('array Salaries: ', extSalariesValues)
    console.log('sum Salaries: ', sumExtSalaries())
    console.log('accum Holidays 2: ', this.accumHolidays)
  }

  holidaysBalance (dateAdmission, dateRequest, absentDays) {
    let DOMaccumHolidays = document.getElementById('accum-holidays')
    let DOMbalanceHolidays = document.getElementById('balance-holidays')

    let countDays = days360(dateAdmission, dateRequest) + 1
    let calcDays = Number((countDays / 30 * 2.5).toFixed(2))
    this.accumHolidays = calcDays
    
    let balance = Number(((calcDays - absentDays) - (absentDays / 30 * 2.5)).toFixed(2))

    this.displayValue('val', DOMaccumHolidays, this.accumHolidays)
    this.displayValue('val', DOMbalanceHolidays, balance)

    console.log('accum: ', countDays / 30 * 2.5)
    console.log('balance: ', (calcDays - absentDays) - (absentDays / 30 * 2.5))
  }

  rsltBase(salary, familyBonus, otherFix) {
    let DOMbaseHolidays = document.getElementById('base-holidays')
    let calcBase = Number(( (salary + familyBonus + otherFix) + this.sumVariablesDivAccumHolidays ).toFixed(2))
    this.baseHolidays = calcBase
    this.displayValue('val', DOMbaseHolidays, calcBase)
  }

  displayValue(type, DOMelement, amount) {
    if (type === 'dom') {
      DOMelement.textContent = amount
    } else if (type === 'val') {
      DOMelement.value = amount
    } else if (type === 'curr') {
      DOMelement.value = peFormatter.format(amount)
    }
  }

  logConsole() {
    console.log(this)
  }

}

export { CalcHolidays }