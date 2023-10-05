import { DefaultValues } from "./defaultValues.js"
import { mxFormatter } from "../currencyMX.js"
import { ISRdataMonth } from "./tableISRmonth.js"

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
    let result = Number( ((this.countDays / dfv.daysPerYear()) * day).toFixed(2) )
    this.aguinaldoDays = result
    this.displayValues('text', DOMfldAguinaldoDays, result)
  }

  getProportional(salary) {
    let DOMfldProportional = document.getElementById('fld-proportional')
    let DOMfldSalaryPerDay = document.getElementById('fld-salary-day')
    let salaryPerDay = salary / 30
    let calcProportional = this.aguinaldoDays * salaryPerDay
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

  getBaseTax() {
    let DOMfldBaseTax = document.getElementById('fld-base-tax')
    let uma = dfv.UMA()
    let calcTax = (this.aguinaldoPR - 30 * uma)
    let rsltBaseTax = calcTax > 0 ? calcTax : 0
    // console.log('base tax: ', rsltBaseTax)
    this.baseTax = rsltBaseTax
    this.displayValues('currency', DOMfldBaseTax, rsltBaseTax)
  }

  getBaseTaxFT(salary) {
    let DOMfldBaseTaxFT = document.getElementById('fld-base-tax-ft')
    let salaryPerDay = salary / 30
    let calc = this.baseTax + (salaryPerDay * 30)
    this.baseTaxFT = calc
    this.displayValues('currency', DOMfldBaseTaxFT, calc)
  }

  getISRbase() {
    let DOMfldISRbase = document.getElementById('fld-isr-base')
    let searchRslt = this.calcLimitsISRtablePerMonth(this.baseTaxFT)
    this.ISRbase = searchRslt
    this.displayValues('currency', DOMfldISRbase, searchRslt)
    // console.log('resultado: ', searchRslt)
  }

  getISRmonth(salary) {
    let DOMfldISRmonth = document.getElementById('fld-isr-month')
    let salaryPerDay = salary / 30
    let searchRslt = this.calcLimitsISRtablePerMonth(salaryPerDay * 30)
    this.ISRmonth = searchRslt
    this.displayValues('currency', DOMfldISRmonth, searchRslt)
  }

  getTotalsValues() {
    let DOMfldTotalAguinaldo = document.getElementById('fld-aguinaldo')
    let DOMfldTotalISR = document.getElementById('fld-isr')
    let DOMfldTotalToPay = document.getElementById('fld-total-deposit')
    let totalAguinaldo = this.aguinaldoPR
    let totalISR = (this.ISRbase - this.ISRmonth)
    let totalToPay = (totalAguinaldo - totalISR)

    this.displayValues('content', DOMfldTotalAguinaldo, totalAguinaldo)
    this.displayValues('content', DOMfldTotalISR, totalISR)
    this.displayValues('content', DOMfldTotalToPay, totalToPay)
  }

  calcLimitsISRtablePerMonth(amount) {
    let lastRange = ISRdataMonth.table[ISRdataMonth.table.length - 1]

    let findRange = amount <= lastRange.upperLimit
                      ? ISRdataMonth.table.find(item => this.betweenLimits(item.lowerLimit, item.upperLimit, amount, item))
                      : { lowerLimit: 324845.02, fixedFee: 101876.9, overExc: 35 }
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
    if(type == 'currency') {
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