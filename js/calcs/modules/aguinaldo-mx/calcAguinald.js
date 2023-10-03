import { DefaultValues } from "./defaultValues.js"
import { mxFormatter } from "../currencyMX.js"

const dfv = new DefaultValues()

class CalcAguinaldo {
  constructor({
    aguinaldoDays = 0,
    aguinaldoPR = 0,
    aguinaldoExempt = 0,
    countDays = 0,
    dates = null,

    baseTax = 0,
    baseTaxFT = 0,
    ISRbase = 0,
    ISRmonth = 0,
    aguinaldoLISR = 0,

    totalAguinaldo = 0,
    totalISR = 0,
    totalToPay = 0
  }) {
    this.aguinaldoDays = aguinaldoDays
    this.aguinaldoPR = aguinaldoPR
    this.aguinaldoExempt = aguinaldoExempt
    this.countDays = countDays
    this.dates = dates

    this.baseTax = baseTax
    this.baseTaxFT = baseTaxFT
    this.ISRbase = ISRbase
    this.ISRmonth = ISRmonth
    this.aguinaldoLISR = aguinaldoLISR

    this.totalAguinaldo = totalAguinaldo
    this.totalISR = totalISR
    this.totalToPay = totalToPay
  }

  getDates(addmissionDate, dischargeDate) {
    let firstDay = dfv.firstDayYear()
    let lastDay = dfv.lastDayYear()
    let inputDateStart = new Date(`${addmissionDate}T00:00:00`)
    let inputDateEnd = new Date(`${dischargeDate}T00:00:00`)
    let validateStartDate = inputDateStart < firstDay ? firstDay : inputDateStart
    let validateEndDate = inputDateEnd > lastDay 
                            ? lastDay 
                            : dischargeDate === '' 
                              ? lastDay 
                              : inputDateEnd
    this.dates = {
      start: moment(validateStartDate).format(),
      end: moment(validateEndDate).format()
    }
  }

  daysInYear() {
    let DOMfldDaysYear = document.getElementById('fld-days-year')
    let startDay = moment(this.dates.start)
    let endDay = moment(this.dates.end)
    let diffBetweenDays = endDay.diff(startDay, 'day') + 1
    this.countDays = diffBetweenDays
    this.displayValues('text', DOMfldDaysYear, diffBetweenDays)
  }

  resultSalaryPerDay(salary) {
    let DOMsalaryPerDay = document.getElementById('lbl-salary-day')
    
  }

  displayValues(type, element, value) {
    if(type == 'currency') {
      element.value = mxFormatter.format(value)
    } else if (type == 'text') {
      element.value = value
    }
  }

  printLog() {
    console.log(this)
  }

}

export { CalcAguinaldo }