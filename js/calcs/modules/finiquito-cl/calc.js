import { diffDates } from "../diffBetweenDates.js"

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

  rsltVacationsDays() {
    this.accumVacationDays = this.timeWorked.years * 15
  }


}