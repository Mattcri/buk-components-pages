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

  rentsPerDays() {
    let baseSalary = Number(document.getElementById('base-salary').value)
    
    let compensationFixed = Number((this.baseRent / 30).toFixed(0))
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

    this.vacation = {
      pendingDays: Number(pendingDays.toFixed(2)),
      proportionalDays: Number(proportionalDays.toFixed(2)),
      weekends: countVacations.weekends,
      holidays: countVacations.holidays,
      consecutiveDays: Number(consecutiveDays.toFixed(2)),
      lastLaboralDay: countVacations.lastLaboralDay,
      endContractDate: countVacations.endContractDate
    }

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
    firstDate.add(toMonday, 'days')

    while (firstDate.isBefore(finalDate)) {
      if (firstDate.day() === 0 || firstDate.day() === 6) {
        weekends++
      }
      firstDate.add(1, 'days')
    }

    let lastLaboralDay = endLaboralDate.format('DD-MM-YYYY')
    let holidays = this.countHolidays(endContractDate, finalDate)

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

    console.log('init counter date: ', initCounterDate);
    console.log('edDate: ', edDate);

    while (initCounterDate.isBefore(edDate)) {
      initCounterDate.add(1, 'days')

      console.log('counter date: ', initCounterDate.format('DD-MM-YYYY'));

      let findIndex = convertHolidaysToMoment.findIndex(date => initCounterDate.isSame(date))
      let findDate = convertHolidaysToMoment.find(date => initCounterDate.isSame(date))
      console.log('holiday find index: ', findIndex);
      console.log('holiday find: ', findDate);

      if (initCounterDate.isSame(findDate)) {
        holidays++
      }

      if (findIndex !== -1) {
        convertHolidaysToMoment.splice(findIndex, 1)
      }

      console.log('delete date find in holidays array: ', convertHolidaysToMoment);

    }
    
    return holidays

  }

  countConsecutiveDays(date, param) {
    let endContract = moment(date)
    let getDayOfWeek = endContract.day()
    let goToMonday = getDayOfWeek === 6 ? 2 : getDayOfWeek === 0 ? 1 : 0
    let initDayToCount = moment(date).add(goToMonday, 'days')
    let endConsecutiveDays = moment(initDayToCount)
    let holidays = 0
    let weekends = 0

    console.log('param', param)
    console.log('end: ', endContract.format('DD-MM-YYYY'))
    console.log('next monday: ', initDayToCount.format('DD-MM-YYYY'));
    // console.log('firts end consecutive days: ', endConsecutiveDays.format('DD-MM-YYYY'));
    
    while (param > 0) {
      if(endConsecutiveDays.day() !== 6 || endConsecutiveDays.day() !== 0 || endConsecutiveDays.day() !== 1 ) {
        endConsecutiveDays.add(1, 'days')
      }


      let nextDay = endConsecutiveDays.clone().add(1, 'days')
      let dayAfterNextDay = nextDay.clone().add(1, 'days')
      let daysAddToNextWorkingDay = nextDay.day() === 6 
                                      ? 2 
                                      : nextDay.day() === 0 
                                        ? 1 
                                        : 0
      
      // let nextWorkingDay = nextDay.day() !== 6 || nextDay.day() !== 0
      //                       ? nextDay.clone().add(daysAddToNextWorkingDay, 'days') 
      //                       : nextDay.clone().add(1, 'days')
      let nextWorkingDay = nextDay.clone().add(daysAddToNextWorkingDay, 'days')


      console.log('end consecutive days: ', endConsecutiveDays.format('DD-MM-YYYY'));
      console.log('next consecutive days: ', nextDay.format('DD-MM-YYYY'))
      console.log('day after next day: ', dayAfterNextDay.format('DD-MM-YYYY'))
      console.log('next working day: ', nextWorkingDay.format('DD-MM-YYYY'))
      console.log('-------------------');

      if (nextDay.day() === 6 || nextDay.day() === 0) holidays++
      if (dayAfterNextDay.day() === 6 || dayAfterNextDay.day() === 0) holidays++

      param--
    }

    return holidays
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