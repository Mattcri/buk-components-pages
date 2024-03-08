import { DefaultValues } from "./defaultValues.js"
import { mxFormatter } from "../currencyMX.js"
import { ISRdataMonth } from "./tableISRmonth.js"

const dfv = new DefaultValues()

class CalcAguinaldo {
  constructor({
    aguinaldoDays = 0,
    aguinaldoPR = 0,
    aguinaldoExempt = 0,
    aguinaldoTaxed = 0,
    countDays = 0,
    dates = null,

    ISRbase1 = 0,
    ISRbase2 = 0,
    ISRtotal = 0,
  }) {
    this.aguinaldoDays = aguinaldoDays
    this.aguinaldoPR = aguinaldoPR
    this.aguinaldoExempt = aguinaldoExempt
    this.aguinaldoTaxed = aguinaldoTaxed
    this.countDays = countDays
    this.dates = dates

    this.ISRbase1 = ISRbase1
    this.ISRbase2 = ISRbase2
    this.ISRtotal = ISRtotal
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

  getAguinaldoDays(day) {
    let DOMfldAguinaldoDays = document.getElementById('fld-aguinaldo-day')
    let result = Number(((this.countDays / dfv.daysPerYear()) * day).toFixed(2))
    this.aguinaldoDays = result
    this.displayValues('text', DOMfldAguinaldoDays, result)
  }

  getProportional(salary, day) {
    let DOMfldProportional = document.getElementById('fld-proportional')
    let DOMfldSalaryPerDay = document.getElementById('fld-salary-day')
    let salaryPerDay = salary / 30
    let calcProportional = ((day / dfv.daysPerYear()) * this.countDays * salaryPerDay)
    this.aguinaldoPR = calcProportional
    // console.log('pr: ', calcProportional)
    this.displayValues('currency', DOMfldProportional, calcProportional)
    this.displayValues('currency', DOMfldSalaryPerDay, salaryPerDay)
  }

  getExempt() {
    let DOMfldExempt = document.getElementById('fld-exempt')
    let calcExempt = Number((30 * dfv.UMA()).toFixed(1))
    this.aguinaldoExempt = calcExempt
    this.displayValues('currency', DOMfldExempt, calcExempt)
  }

  getTaxed() {
    let DOMfldTaxed = document.getElementById('fld-taxed')
    let calcTaxed = this.aguinaldoPR - this.aguinaldoExempt
    this.aguinaldoTaxed = calcTaxed
    this.displayValues('currency', DOMfldTaxed, calcTaxed)
  }

  getISRvalues(salary, tax) {
    let DOMfldLisrOrRisr = document.getElementById('fld-risr-lisr')

    if (tax === 'risr') {
      let perMonth = this.calcRISRaguinaldoMonth(this.aguinaldoTaxed)
      let base1 = (salary + perMonth)
      let base2 = salary
      let isr1 = Number(this.calcLimitsISRtablePerMonth(base1).toFixed(2))
      let isr2 = Number(this.calcLimitsISRtablePerMonth(base2).toFixed(2))
      let diff = Number((isr1 - isr2).toFixed(2))
      let percent = (diff / perMonth)
      let risr = Number((this.aguinaldoTaxed * percent).toFixed(3))

      this.ISRbase1 = isr1
      this.ISRbase2 = isr2
      this.ISRtotal = risr
      this.displayValues('currency', DOMfldLisrOrRisr, risr)

      console.log('base1: ', base1)
      console.log('base2: ', base2)
      console.log('diff: ', diff)
      console.log('%: ', percent)
    } else {
      let base1 = (salary + this.aguinaldoTaxed)
      let base2 = salary
      let isr1 = Number(this.calcLimitsISRtablePerMonth(base1).toFixed(2))
      let isr2 = Number(this.calcLimitsISRtablePerMonth(base2).toFixed(2))
      let lisr = Number((isr1 - isr2).toFixed(2))

      this.ISRbase1 = isr1
      this.ISRbase2 = isr2
      this.ISRtotal = lisr

      this.displayValues('currency', DOMfldLisrOrRisr, lisr)

    }
  }

  getTotalsValues() {
    let DOMfldTotalAguinaldo = document.getElementById('fld-aguinaldo')
    let DOMfldTotalISR = document.getElementById('fld-isr')
    let DOMfldTotalToPay = document.getElementById('fld-total-deposit')
    let totalAguinaldo = this.aguinaldoPR
    let totalISR = this.ISRtotal
    let totalToPay = (totalAguinaldo - totalISR)

    this.displayValues('content', DOMfldTotalAguinaldo, totalAguinaldo)
    this.displayValues('content', DOMfldTotalISR, totalISR)
    this.displayValues('content', DOMfldTotalToPay, totalToPay)
  }

  calcRISRaguinaldoMonth(amount) {
    return Number(((amount / 365) * 30.4).toFixed(2))
  }

  calcLimitsISRtablePerMonth(amount) {
    let lastRange = ISRdataMonth.table[ISRdataMonth.table.length - 1]

    let findRange = amount <= lastRange.upperLimit
      ? ISRdataMonth.table.find(item => this.betweenLimits(item.lowerLimit, item.upperLimit, amount, item))
      : { lowerLimit: 375975.62, fixedFee: 117912.32, overExc: 35 }
    let lowerLimit = findRange.lowerLimit
    let overExc = findRange.overExc / 100
    let fixedFee = findRange.fixedFee
    let calcISR = ((amount - lowerLimit) * overExc) + fixedFee
    return calcISR
  }

  betweenLimits(lower, upper, amount, obj) {
    if (amount >= lower && amount <= upper) return obj
  }

  displayValues(type, element, value) {
    if (type == 'currency') {
      element.value = mxFormatter.format(value)
    } else if (type == 'text') {
      element.value = value
    } else if (type == 'content') {
      element.textContent = mxFormatter.format(value)
    }
  }

  printLog() {
    console.log(this)
  }

}

export { CalcAguinaldo }