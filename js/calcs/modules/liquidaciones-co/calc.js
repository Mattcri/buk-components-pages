import { coFormatter } from "../currencyCO.js"
import { days360v2 } from "../days-360.js"
import { NationalValuesCO } from "./nationalValues.js"

const nvtCO = new NationalValuesCO()

class CalcLiquidaciones {
  constructor({
    liquidationsDays = 0,
    initPrima = 0,
    initLayoff = 0,
    compensationDays = 0,
    devengos = null,
    discounts = null
  }) {
    this.liquidationsDays = liquidationsDays
    this.initPrima = initPrima
    this.initLayoff = initLayoff
    this.compensationDays = compensationDays
    this.devengos = devengos
    this.discounts = discounts
  }

  rsltLiquidationDays (startContractDate, layoffDate, daysNotWorked) {
    let days = days360v2(startContractDate, layoffDate)

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

    console.log(datePrima.format("DD/MM/YYYY"))
    console.log('prima: ', prima);

    this.initPrima = prima
  }

  rsltInitLayoff (layoffDate, daysNotWorked) {
    let currentYear = new Date().getFullYear().toString()
    let firstDayOfYear = moment(`01/01/${currentYear}T00:00:00`, "DD/MM/YYYY")
    
    let daysLayoff = (days360v2(firstDayOfYear, layoffDate) + 1) - daysNotWorked

    this.initLayoff = daysLayoff
  }

  rsltCompensationDays(salary, withdrawalReason, contractType, startContractDate, layoffDate, endFixedContractDate, daysNotWorked) {
    if (withdrawalReason !== "option-3") {
      this.compensationDays = 0
      return
    }

    if (withdrawalReason === "option-3" && contractType === "fixed-term") {
      this.compensationDays = days360v2(layoffDate, endFixedContractDate)
      return
    }

    let countDays = days360v2(startContractDate, layoffDate) - daysNotWorked
    console.log('días corridos: ', countDays)
    let extraDays
    let baseDays

    if ( salary < (nvtCO.getSMLV() * 10) ) {
      baseDays = 30
      extraDays = countDays > 360 ? ((countDays - 360) * 20 / 360) : 0
    } else {
      baseDays = 20
      extraDays = countDays > 360 ? ((countDays - 360) * 15 / 360) : 0
    }

    this.compensationDays = baseDays + extraDays
    return
  }


  logRslt () {
    console.log(this)
  }

}

export { CalcLiquidaciones }