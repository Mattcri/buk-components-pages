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

  rsltFixedRent(baseSalary, taxableRemu, nonTaxableRemu, lastVariableRent) {
    let DOMlblFixedRentAmount = document.getElementById('lbl-fixed-rent')
    let DOMlblGratification = document.getElementById('lbl-gratification')
    let imm = natv.getIMM()
    let gratification = Math.min((baseSalary + taxableRemu + lastVariableRent) * 0.25, 4.75 * imm / 12)
    let sumFixedValues = baseSalary + taxableRemu + gratification + nonTaxableRemu

    this.sumFixRent = Number((sumFixedValues).toFixed(0))
    this.gratification = Number((gratification).toFixed(0))

    this.displayValue('clp', DOMlblFixedRentAmount, sumFixedValues)
    this.displayValue('clp', DOMlblGratification, gratification)

  }

  rsltAvgVariableRent(variableCheck) {
    let DOMlblVariableRent = document.getElementById('lbl-variable-rent')
    if(variableCheck == true) {
      let variableInputs = [...document.querySelectorAll('[data-variable-salary="true"]')]
      let values = variableInputs.map(input => Number(input.value))
      let sumValues = values.reduce((prev, acum) => prev + acum, 0)
      let avg = (sumValues / 3)
  
      this.avgVariableRent = Number(avg.toFixed(0))

      this.displayValue('clp', DOMlblVariableRent, avg)
    } else {
      let avg = 0
      this.avgVariableRent = avg

      this.displayValue('clp', DOMlblVariableRent, avg)
    }

  }

  sumBaseRent() {
    let DOMlblBaseRent = document.getElementById('lbl-base-rent')
    let sumValues = this.sumFixRent + this.avgVariableRent

    this.baseRent = Number((sumValues).toFixed(0))
    this.displayValue('clp', DOMlblBaseRent, sumValues)
  }

  rentsPerDays(baseSalary) {
    let compensationFixed = Number((this.sumFixRent / 30).toFixed(0))
    let compensationVariable = Number((this.avgVariableRent / 30).toFixed(0))
    let compensationTotal = compensationFixed + compensationVariable

    let vacationFixed = Number((baseSalary / 30).toFixed(0))
    let vacationVariable = Number((this.avgVariableRent / 30).toFixed(0))
    let vacationTotal = vacationFixed + vacationVariable

    this.baseRentPerDay = {
      compensation: {
        fixed: compensationFixed,
        variable: compensationVariable,
        total: compensationTotal
      },
      vacations: {
        fixed: vacationFixed,
        variable: vacationVariable,
        total: vacationTotal
      }
    }

  }

  vacationsValues(daysTaken, endDate) {
    let years = this.timeWorked.years
    let months = this.timeWorked.amountMonths
    let days = this.timeWorked.days
    let balanceDays = this.accumVacationDays - daysTaken
    let pendingDays = balanceDays > 0 ? balanceDays : 0

    let proportionalDays = balanceDays <= 0
      ? balanceDays + 1.25 * (months - years * 12 + days / 30)
      : 1.25 * (months - years * 12 + days / 30)

    let buildParam = Math.ceil(proportionalDays) + Number(pendingDays.toFixed(2))

    let countVacations = this.countWeekendsHolidaysAndFinalWorkingDay(endDate, buildParam)
    let consecutiveDays = (countVacations.weekends + countVacations.holidays + proportionalDays + pendingDays)

    // console.log(countVacations)
    let vacationsCompensation = this.baseRentPerDay.vacations.total
    let totalCompensation = vacationsCompensation * consecutiveDays < 0 ? 0 : vacationsCompensation * consecutiveDays

    this.vacation = {
      pendingDays: Number(pendingDays.toFixed(2)),
      proportionalDays: Number(proportionalDays.toFixed(2)),
      weekends: countVacations.weekends,
      holidays: countVacations.holidays,
      consecutiveDays: Number(consecutiveDays.toFixed(2)),
      compensationAmount: Number(totalCompensation.toFixed(0)),
      lastLaboralDay: countVacations.lastLaboralDay,
      endContractDate: countVacations.endContractDate
    }

    this.showVacationValuesInDOM()

  }

  countWeekendsHolidaysAndFinalWorkingDay(date, param) {
    let endContractDate = moment(date)
    let firstDate = endContractDate.clone()
    let endLaboralDate = endContractDate.clone()
    let advancedLaboralDays = 0
    let weekends = 0

    while (advancedLaboralDays < param) {
      endLaboralDate.add(1, 'days')
      // console.log('print endLaboralDate: ', endLaboralDate.format('DD-MM-YYYY'))
      if (endLaboralDate.day() !== 0 && endLaboralDate.day() !== 6) {
        advancedLaboralDays++
      }
    }

    let toMonday = firstDate.day() === 6 
                    ? 2 
                    : firstDate.day() === 0
                      ? 1
                      : 0

    if (firstDate.day() === 5) {
      weekends--
    }
    let finalDate = moment(endLaboralDate)
    // console.log('FECHA FINAL: ', endLaboralDate)
    firstDate.add(toMonday, 'days')
    
    let holidays = this.countHolidays(endContractDate, finalDate)

    if (holidays > 0 && firstDate.day() !== 5) {
      finalDate.add(holidays, 'days')
      
      finalDate.day() === 6 
        ? finalDate.add(2, 'days')
        : finalDate.day() === 0
          ? finalDate.add(1, 'days')
          : finalDate.add(0, 'days')
    }


    while (firstDate.isSameOrBefore(finalDate)) {
      if (firstDate.day() === 0 || firstDate.day() === 6) {
        weekends++
      }
      console.log('date weekend: ', firstDate.format('DD-MM-YYYY'))
      console.log('weekends: ', weekends)
      firstDate.add(1, 'days')
    }

    let lastLaboralDay = finalDate.format('DD-MM-YYYY')
    

    return {
      weekends,
      holidays,
      lastLaboralDay,
      endContractDate: endContractDate.format('DD-MM-YYYY')
    }

  }

  countHolidays(startDate, endDate) {
    let stDate = moment(startDate)
    let initCounterDate = stDate.clone()
    let edDate = moment(endDate)
    let convertHolidaysToMoment = natv.getHolidaysDates().map(date => moment(date))

    let holidays = 0

    // console.log('init counter date: ', initCounterDate);
    // console.log('edDate: ', edDate);

    while (initCounterDate.isBefore(edDate)) {
      initCounterDate.add(1, 'days')

      // console.log('counter date: ', initCounterDate.format('DD-MM-YYYY'));

      let findIndex = convertHolidaysToMoment.findIndex(date => initCounterDate.isSame(date))
      let findDate = convertHolidaysToMoment.find(date => initCounterDate.isSame(date))
      console.log('holiday find index: ', findIndex);
      // console.log('holiday find: ', findDate);

      if (initCounterDate.isSame(findDate)) {
        holidays++
      }

      if (findIndex !== -1) {
        convertHolidaysToMoment.splice(findIndex, 1)
      }

      // console.log('delete date find in holidays array: ', convertHolidaysToMoment);

    }
    
    return holidays

  }

  showVacationValuesInDOM() {
    let DOMlblPendingDays = document.getElementById('lbl-vacation-pending-days')
    let DOMlblPropotionalDays = document.getElementById('lbl-vacation-proportional-days')
    let DOMlblHolidays = document.getElementById('lbl-vacation-holidays')
    let DOMlblConsecutiveDays = document.getElementById('lbl-vacation-consecutive-days')
    let DOMlblTotalCompensation = document.getElementById('lbl-vacation-compensation')

    let sumHolidaysAndWeekends = this.vacation.holidays + this.vacation.weekends

    this.displayValue('days', DOMlblPendingDays, this.vacation.pendingDays)
    this.displayValue('days', DOMlblPropotionalDays, this.vacation.proportionalDays)
    this.displayValue('days', DOMlblHolidays, sumHolidaysAndWeekends)
    this.displayValue('days', DOMlblConsecutiveDays, this.vacation.consecutiveDays)
    this.displayValue('clp', DOMlblTotalCompensation, this.vacation.compensationAmount)
  }

  async rsltCompensations(causal, endContractDay, noticeDay) {
    await natv.getUF()

    let yearsOfService = this.yearsOfService()
    let top = natv.UFvalue.Valor * 90
    let avgHaberes = Math.min(top, this.baseRent)

    console.log('uf calc: ', natv.UFvalue.Valor)

    let yearsOfCompensation = 0
    let monthsServiceCompensation = 0
    let preNotification = 0

    if (causal === '4') {
      yearsOfCompensation = avgHaberes * yearsOfService
      preNotification = this.prevNotificationDismiss(avgHaberes, endContractDay, noticeDay)
    } else {
      yearsOfCompensation = 0
      preNotification = 0
    }

    if (causal === '3') {
      let years = this.timeWorked.years
      let months = this.timeWorked.months
      let days = this.timeWorked.days
      let compensation = this.baseRentPerDay.compensation.total
      let days2xByCompesation = Number((2.5 * compensation).toFixed(0))

      monthsServiceCompensation = days >= 15
                                    ? (months + 1 + (years * 12)) * days2xByCompesation
                                    : (months + (years * 12)) * days2xByCompesation

    } else {
      monthsServiceCompensation = 0
    }

    let totalCompensation = (yearsOfCompensation + preNotification + monthsServiceCompensation)

    this.legalCompesations = {
      yearsOfService,
      avgHaberes,
      yearsOfCompensation,
      preNotification,
      monthsServiceCompensation,
      totalCompensation
    }
    
    this.showLegalCompensationsInDOM()

  }

  yearsOfService () {
    let yearsWorked = this.timeWorked.years
    let monthsWorked = this.timeWorked.months

    let years = 0

    if (yearsWorked < 11) {
      years = yearsWorked >= 1 && monthsWorked >= 6
        ? yearsWorked + 1
        : yearsWorked
    } else {
      years = 11
    }

    return years
  }

  prevNotificationDismiss(haberes, endContractDate, notificationDate) {
    let end = moment(endContractDate)
    let notification = moment(notificationDate)

    let diffDates = end.diff(notification, 'day')

    console.info('diff dates: ', diffDates)

    if (diffDates < 30) {
      return Math.min(this.baseRent, haberes)
    } else {
      return 0
    }

  }

  showLegalCompensationsInDOM() {
    let DOMyearsOfService = document.getElementById('lbl-years-of-service')
    let DOMcompensationYearsService = document.getElementById('lbl-compesation-years-of-service')
    let DOMprevNotification = document.getElementById('lbl-compesation-prev-notification')
    let DOMmonthServiceCompensation = document.getElementById('lbl-compesation-end-service')
    let DOMtotalLegalCompensations = document.getElementById('lbl-total-compensation')

    let compensation = this.legalCompesations

    this.displayValue('txt', DOMyearsOfService, compensation.yearsOfService)
    this.displayValue('clp', DOMcompensationYearsService, compensation.yearsOfCompensation)
    this.displayValue('clp', DOMprevNotification, compensation.preNotification)
    this.displayValue('clp', DOMmonthServiceCompensation, compensation.monthsServiceCompensation)
    this.displayValue('clp', DOMtotalLegalCompensations, compensation.totalCompensation)

  }

  rsltTotalLiquidation() {
    let DOMtotal = document.getElementById('lbl-total-liquidation')
    let vacation = this.vacation.compensationAmount
    let compensation = this.legalCompesations.totalCompensation
    let total = vacation + compensation

    this.displayValue('clp', DOMtotal, total)
  }

  displayValue(type, element, amount) {
    if(type == 'clp') {
      element.textContent = clFormatter.format(amount)
    } else if (type == 'days') {
      amount != 1
        ? element.textContent = `${amount} días`
        : element.textContent = `${amount} día`
    } else if (type == 'txt') {
      element.textContent = amount
    }
  }

  log() {
    console.log(this)
  }

}

export { CalcFiniquito }