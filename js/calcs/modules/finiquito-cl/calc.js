import { diffDates } from "../diffBetweenDates.js"
import { NationalValues } from "./nationalValues.js"
import { clFormatter } from "../currencyCL.js"

const natv = new NationalValues()

class CalcFiniquito {
  constructor({
    timeWorked = null,
    gratification = 0,
    sumFixRent = 0,
    avgVariableRent = 0,
    baseRent = 0,
    baseRentPerDay = null,
    vacation = null,
    accumVacationDays = 0,
    legalCompesations = null,

  }) {
    this.timeWorked = timeWorked
    this.gratification = gratification
    this.sumFixRent = sumFixRent
    this.avgVariableRent = avgVariableRent
    this.baseRent = baseRent
    this.baseRentPerDay = baseRentPerDay
    this.vacation = vacation
    this.legalCompesations = legalCompesations
    this.accumVacationDays = accumVacationDays
  }

  rslTimeWorked(startDate, endDate) {
    this.timeWorked = diffDates(startDate, endDate)
  }

  rsltVacationDays() {
    this.accumVacationDays = this.timeWorked.years * 15
  }

  rsltFixedRent(baseSalary, taxableRemu) {
    let DOMlblFixedRentAmount = document.getElementById('lbl-fixed-rent')
    let DOMlblGratification = document.getElementById('lbl-gratification')
    let imm = natv.getIMM()
    let gratification = Math.min(baseSalary * 0.25, 4.75 * imm / 12)
    let sumFixedValues = baseSalary + taxableRemu + gratification

    this.sumFixRent = Number((sumFixedValues).toFixed(0))
    this.gratification = Number((gratification).toFixed(0))

    this.displayValue('clp', DOMlblFixedRentAmount, sumFixedValues)
    this.displayValue('clp', DOMlblGratification, gratification)

  }

  displayValue(type, element, amount) {
    if(type == 'clp') {
      element.textContent = clFormatter.format(amount)
    } else if (type == 'days') {
      amount != 1
        ? element.textContent = `${amount} días`
        : element.textContent = `${amount} día`
    }
  }


  log() {
    console.log(this)
  }

}

export { CalcFiniquito }