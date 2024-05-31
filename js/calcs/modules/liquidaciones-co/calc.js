import { coFormatter } from "../currencyCO.js"
import { days360v2 } from "../days-360.js"
import { NationalValuesCO } from "./nationalValues.js"
import { upperLimitTable, retentionTable } from "./dataTables.js"

const nvtCO = new NationalValuesCO()

class CalcLiquidaciones {
  constructor({
    liquidationsDays = 0,
    initPrima = 0,
    initLayoff = 0,
    compensationDays = 0,
    ibc = 0,
    totalToPay = 0,
    devengos = null,
    discounts = null,
    applyPreviousYear = false,
    previousYear = null
  }) {
    this.liquidationsDays = liquidationsDays
    this.initPrima = initPrima
    this.initLayoff = initLayoff
    this.compensationDays = compensationDays
    this.ibc = ibc
    this.totalToPay = totalToPay
    this.devengos = devengos
    this.discounts = discounts
    this.applyPreviousYear = applyPreviousYear
    this.previousYear = previousYear
  }

  rsltLiquidationDays (startContractDate, layoffDate, daysNotWorked) {
    let days = days360v2(startContractDate, layoffDate) + 1

    this.liquidationsDays = days - daysNotWorked
  }

  rsltInitPrima (layoffDate) {
    let currentYear = new Date().getFullYear().toString()
    let firstSemester = moment(`01/01/${currentYear}T00:00:00`, "DD/MM/YYYY")
    let secondSemester = moment(`01/07/${currentYear}T00:00:00`, "DD/MM/YYYY")

    let datePrima

    if (moment(layoffDate).isSameOrAfter(firstSemester) && moment(layoffDate).isBefore(secondSemester) ) {
      datePrima = firstSemester
    } else if (moment(layoffDate).isSameOrAfter(secondSemester) ) {
      datePrima = secondSemester
    }

    let prima = days360v2(datePrima, layoffDate) + 1

    // console.log(datePrima.format("DD/MM/YYYY"))
    // console.log('prima: ', prima);

    this.initPrima = prima
  }

  rsltInitLayoff (layoffDate, daysNotWorked) {
    let currentYear = new Date().getFullYear().toString()
    let firstDayOfYear = moment(`01/01/${currentYear}T00:00:00`, "DD/MM/YYYY")
    
    let daysLayoff = (days360v2(firstDayOfYear, layoffDate) + 1) - daysNotWorked

    this.initLayoff = daysLayoff
  }

  rsltCompensationDays (salary, withdrawalReason, contractType, startContractDate, layoffDate, endFixedContractDate, daysNotWorked) {
    if (withdrawalReason !== "option-3") {
      this.compensationDays = 0
      return
    }

    if (withdrawalReason === "option-3" && contractType === "fixed-term") {
      this.compensationDays = days360v2(layoffDate, endFixedContractDate)
      return
    }

    let countDays = days360v2(startContractDate, layoffDate) + 1 - daysNotWorked
    // console.log('días corridos: ', countDays)
    let extraDays
    let baseDays

    if ( salary < (nvtCO.getSMLV() * 10) ) {
      baseDays = 30
      extraDays = countDays > 360 ? ((countDays - 360) * 20 / 360) : 0
    } else {
      baseDays = 20
      extraDays = countDays > 360 ? ((countDays - 360) * 15 / 360) : 0
    }

    this.compensationDays = Number((baseDays + extraDays).toFixed(2))
    return
  }

  devengosValues(salary, salaryType, contractType, otherConceptsPrima, otherUnemploymentConcepts, otherSalaries, otherNotSalaries, daysWorked, daysNotWorked, variablesVacationsConcepts, vacationsPending) {
    let salaryCalc = this.salary(salary, daysWorked)
    let prima = this.prima(salary, salaryType, contractType, otherConceptsPrima, otherSalaries)
    let unemployment = this.unemployment(salary, salaryType, contractType, otherUnemploymentConcepts, otherSalaries, daysNotWorked)
    let unemploymentInterest = this.unemploymentInterest(salary, salaryType, contractType, otherUnemploymentConcepts, otherSalaries, daysNotWorked)
    let vacations = this.vacations(salary, contractType, variablesVacationsConcepts, otherSalaries, vacationsPending)
    let compensation = this.compensation(salary, contractType, variablesVacationsConcepts, otherSalaries)
    let totalLastYear = this.applyPreviousYear === true ? this.previousYear.total : 0
    let totalDevengos = salaryCalc + prima + unemployment + unemploymentInterest + vacations + compensation + otherSalaries + otherNotSalaries + totalLastYear

    this.devengos = {
      salaryCalc,
      prima,
      unemployment,
      unemploymentInterest,
      vacations,
      compensation,
      totalDevengos
    }
  }

  salary (salary, daysWorked) {
    return Number((salary / 30 * daysWorked).toFixed(0))
  }

  prima(salary, salaryType, contractType, otherConceptsPrima, otherSalaries) {
    if (salaryType === 'integral') {
      return 0
    }

    if (contractType === 'learning') {
      return 0
    }

    let calcPrima = (salary + ((otherConceptsPrima + otherSalaries) / this.initPrima * 30)) * this.initPrima / 360

    return Number(calcPrima.toFixed(0))
  }

  unemployment(salary, salaryType, contractType, otherUnemploymentConcepts, otherSalaries, daysNotWorked) {
    if (salaryType === 'integral') {
      return 0
    }

    if (contractType === 'learning') {
      return 0
    }

    let calcUnemployment = (salary + ((otherUnemploymentConcepts + otherSalaries) / (this.initLayoff + daysNotWorked) * 30)) * this.initLayoff / 360

    return Number(calcUnemployment.toFixed(0))
  }

  unemploymentInterest(salary, salaryType, contractType, otherUnemploymentConcepts, otherSalaries, daysNotWorked) {
    if (salaryType === 'integral') {
      return 0
    }

    if (contractType === 'learning') {
      return 0
    }

    let unemployment = this.unemployment(salary, salaryType, contractType, otherUnemploymentConcepts, otherSalaries, daysNotWorked)
    let calcInterest = (unemployment * (this.initLayoff + daysNotWorked) * 0.12) / 360

    return Number(calcInterest.toFixed(0))
  }

  vacations(salary, contractType, variablesVacationsConcepts, otherSalaries, vacationsPending) {
    if (contractType === 'learning') {
      return 0
    }

    let calcVacations = (salary + (variablesVacationsConcepts + otherSalaries) / 12) / 30 * vacationsPending

    return Number(calcVacations.toFixed(0))
  }

  compensation (salary, contractType, variablesVacationsConcepts, otherSalaries) {
    if (contractType === 'learning') {
      return 0
    }

    let calcCompensation = ((salary + (variablesVacationsConcepts + otherSalaries) / 12) / 30) * this.compensationDays

    return Number(calcCompensation.toFixed(0))
  }

  ibcSocialSecurity(salary, salaryType, otherSalaries, otherNotSalaries) {
    let sumSalaries = salary + otherSalaries + otherNotSalaries
    let maxAmount = nvtCO.maxSocialSecurity()
    let fortyPct = Number((sumSalaries * 0.4).toFixed(0))
    let excessLaw1393 = (otherNotSalaries - fortyPct) > 0
      ? Number(otherNotSalaries - fortyPct)
      : 0
    let calcIbc = salaryType === 'integral'
      ? Number((((sumSalaries * 0.7) + excessLaw1393)).toFixed(0))
      : Number(salary + otherSalaries + excessLaw1393)

    // console.log('40%: ', fortyPct)
    // console.log('excess: ', excessLaw1393)

    if (calcIbc <= maxAmount) {
      this.ibc = calcIbc
    } else {
      this.ibc = maxAmount
    }
  }

  discountsValues(salary, salaryType, contractType, otherSalaries, otherNotSalaries, otherDiscounts) {
    let health = this.healthAndPension(salaryType, contractType, otherSalaries, otherNotSalaries)
    let pension = this.healthAndPension(salaryType, contractType, otherSalaries, otherNotSalaries)
    let rtCompensation = this.witholdingCompensation(salary)
    let solidarityPlusSubsistence = this.solidarityAndSubsistence().total
    let solidarity = this.solidarityAndSubsistence().solidarity
    let subsistence = this.solidarityAndSubsistence().subsistence
    let source = this.holdingSource(salaryType, contractType, otherSalaries, otherNotSalaries)
    let totalDiscounts = health + pension + rtCompensation + solidarityPlusSubsistence + source + otherDiscounts

    // console.log('holding source: ', source)

    this.discounts = {
      health,
      pension,
      rtCompensation,
      solidarityPlusSubsistence,
      solidarity,
      subsistence,
      source,
      totalDiscounts
    }
  }

  healthAndPension(salaryType, contractType, otherSalaries, otherNotSalaries) {
    if (contractType === 'learning') {
      return 0
    }

    let sumSalaries = this.devengos.salaryCalc + otherSalaries + otherNotSalaries
    let discounts = 0

    if (sumSalaries * 0.4 < otherNotSalaries) {
      discounts = salaryType === 'integral' ? (sumSalaries - (sumSalaries * 0.4)) * 0.7 : sumSalaries - (sumSalaries * 0.4)
    } else {
      discounts = salaryType === 'integral' ? (this.devengos.salaryCalc + otherSalaries) * 0.7 : this.devengos.salaryCalc + otherSalaries
    }

    return Number((Math.min(discounts, nvtCO.getSMLV() * 25) * 0.04).toFixed(0))
  }

  witholdingCompensation (salary) {
    let compensation = this.devengos.compensation
    if (salary > (nvtCO.getUVT() * 204)) {
      return Number(((compensation - (compensation * 0.25)) * 0.2).toFixed(0))
    } else {
      return 0
    }
  }

  solidarityAndSubsistence() {
    let ibc = this.ibc
    let lastLimit = upperLimitTable[upperLimitTable.length - 1].limit
    let firstLimit = upperLimitTable[0].limit
    let range = ibc < lastLimit
      ? upperLimitTable.find(item => this.searchUpperLimit(item.limit, ibc, item))
      : { 'limit': ibc, 'pct': 2, 'solidarity': 0.5, 'subsistence': 1.5 }
    let calcSolidarity = ibc > firstLimit 
                          ? ibc * (range.solidarity / 100)
                          : 0
    let calcSubsistence = ibc > firstLimit 
                            ? ibc * (range.subsistence / 100)
                            : 0

    return {
      solidarity: Number(calcSolidarity.toFixed(0)),
      subsistence: Number(calcSubsistence.toFixed(0)),
      total: Number((calcSolidarity + calcSubsistence).toFixed(0))
    }
  }

  searchUpperLimit(limit, ibc, obj) {
    if (ibc <= limit) {
      return obj
    }
  }

  holdingSource(salaryType, contractType, otherSalaries, otherNotSalaries) {
    let salary = this.devengos.salaryCalc
    let vacations = this.devengos.vacations
    let healthPension = this.healthAndPension(salaryType, contractType, otherSalaries, otherNotSalaries) * 2 
    let solidaritySubsistence = this.solidarityAndSubsistence().total
    let uvt = nvtCO.getUVT()
    let sumValues = (salary + otherSalaries + otherNotSalaries + vacations)
    let calcBase = sumValues - (healthPension + solidaritySubsistence) - ((sumValues - (healthPension + solidaritySubsistence)) * 0.25)
    let calcTaxRange = calcBase / uvt

    const range = retentionTable.find(item => calcTaxRange >= item.start && calcTaxRange < item.end)

    // console.log('degub 0.25: ', ((sumValues - (healthPension + solidaritySubsistence)) * 0.25)); // check
    // console.log('debug sumValues: ', sumValues - (healthPension + solidaritySubsistence));
    // console.log('range source: ', range)
    // console.log('calc base source: ', calcBase)
    // console.log('calc tax range: ', calcTaxRange)

    if (range !== undefined) {
      let calcSource = ((calcTaxRange - range.start) * range.factor) + range.basePay
      return Number((calcSource * uvt).toFixed(0))
    } else {
      return 0
    }
  }

  rsltTotal () {
    let devengos = this.devengos.totalDevengos
    let discounts = this.discounts.totalDiscounts
    // let totalLastYear = this.applyPreviousYear === true ? this.previousYear.total : 0
    let total = devengos - discounts
    this.totalToPay = total
  }

  checkApplyLastYear(salaryType, dateEndContract) {
    let currentYear = new Date().getFullYear().toString()
    let lastYear = (currentYear - 1).toString()
    let initDateToShowLastYear = moment(`31/12/${lastYear}T00:00:00`, "DD/MM/YYYY")
    let maxDateToShowLastYear = moment(`01/02/${currentYear}T00:00:00`, "DD/MM/YYYY")

    salaryType !== 'integral' && moment(dateEndContract).isBetween(initDateToShowLastYear, maxDateToShowLastYear)
      ? this.applyPreviousYear = true
      : this.applyPreviousYear = false
  }

  liquidationDaysLastYear(startDate, notWorked) {
    let currentYear = new Date().getFullYear().toString()
    let lastYear = (currentYear - 1).toString()
    // let dateAdmission = moment(startDate)
    let initDateLastYear = moment(`01/01/${lastYear}T00:00:00`, "DD/MM/YYYY")
    let maxDateLastYear = moment(`30/12/${lastYear}T00:00:00`, "DD/MM/YYYY")


    if (moment(startDate).isBefore(initDateLastYear)) {
      let days = days360v2(initDateLastYear, maxDateLastYear)
      return (days + 1) - notWorked
    } else {
      let days = days360v2(startDate, maxDateLastYear)
      return (days + 1) - notWorked
    }

  }

  liquidationLastYear(salaryLastYear, variablesLastYear, auxTransportLastYear, daysNotWorkedLastYear, startContractDate, contractType) {
    if (this.applyPreviousYear === false || contractType === 'learning') {
      return
    }

    let daysLiquidationLastYear = this.liquidationDaysLastYear(startContractDate, daysNotWorkedLastYear)
    let unemployment = (salaryLastYear + auxTransportLastYear + (variablesLastYear / daysLiquidationLastYear * 30)) * daysLiquidationLastYear / 360
    let interest = unemployment * daysLiquidationLastYear * 0.12 / 360
    let total = Number((unemployment + interest).toFixed(0)) 

    this.previousYear = {
      daysLiquidationLastYear,
      unemployment: Number(unemployment.toFixed(0)),
      interest: Number(interest.toFixed(0)),
      total
    }

  }

  printInScreen (otherDisc) {
    let totalDevengos = document.getElementById('lbl-total-devengos')
    let totalDiscounts = document.getElementById('lbl-total-discounts')
    let totalToPay = document.getElementById('lbl-total-pay')

    let initPrima = document.getElementById('lbl-init-prima')
    let initUnemployment = document.getElementById('lbl-init-unemployment')
    let daysLiquidation = document.getElementById('lbl-days-liquidation')
    let daysCompensation = document.getElementById('lbl-days-compensation')

    let salary = document.getElementById('lbl-salary')
    let prima = document.getElementById('lbl-prima')
    let unemployment = document.getElementById('lbl-unemployment')
    let unemploymentInterest = document.getElementById('lbl-unemployment-interest')
    let vacations = document.getElementById('lbl-vacations')
    let compensation = document.getElementById('lbl-compensation')
    let health = document.getElementById('lbl-health')
    let pension = document.getElementById('lbl-pension')
    let solidarity = document.getElementById('lbl-solidarity')
    let subsistence = document.getElementById('lbl-subsitence')
    let otherDiscounts = document.getElementById('lbl-other-discounts')
    let source = document.getElementById('lbl-source')
    let holdingCompensation = document.getElementById('lbl-holding-compensation')

    let daysLiquidationLastYear = document.getElementById('lbl-days-liquidation-last-year')
    let unemploymentLastYear = document.getElementById('lbl-unemployment-last-year')
    let unemploymentInterestLastYear = document.getElementById('lbl-unemployment-interest-last-year')

    this.display('currency', totalDevengos, this.devengos.totalDevengos)
    this.display('currency', totalDiscounts, this.discounts.totalDiscounts)
    this.display('currency', totalToPay, this.totalToPay)
    this.display('txt', initPrima, this.initPrima)
    this.display('txt', initUnemployment, this.initLayoff)
    this.display('txt', daysLiquidation, this.liquidationsDays)
    this.display('txt', daysCompensation, this.compensationDays)
    this.display('currency', salary, this.devengos.salaryCalc)
    this.display('currency', prima, this.devengos.prima)
    this.display('currency', unemployment, this.devengos.unemployment)
    this.display('currency', unemploymentInterest, this.devengos.unemploymentInterest)
    this.display('currency', vacations, this.devengos.vacations)
    this.display('currency', compensation, this.devengos.compensation)
    this.display('currency', health, this.discounts.health)
    this.display('currency', pension, this.discounts.pension)
    this.display('currency', solidarity, this.discounts.solidarity)
    this.display('currency', subsistence, this.discounts.subsistence)
    this.display('currency', otherDiscounts, otherDisc)
    this.display('currency', source, this.discounts.source)
    this.display('currency', holdingCompensation, this.discounts.rtCompensation)
    
    if (this.applyPreviousYear === true) {
      this.display('txt', daysLiquidationLastYear, this.previousYear.daysLiquidationLastYear)
      this.display('currency', unemploymentLastYear, this.previousYear.unemployment)
      this.display('currency', unemploymentInterestLastYear, this.previousYear.interest)
    }

  }

  display(type, element, amount) {
    if (type == 'currency') {
      element.textContent = coFormatter.format(amount)
    } else if (type == 'txt') {
      element.textContent = amount
    }
  }

  logRslt () {
    console.log(this)
  }

}

export { CalcLiquidaciones, nvtCO }