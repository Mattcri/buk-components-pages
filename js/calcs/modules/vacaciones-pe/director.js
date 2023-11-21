import { CalcHolidays } from "./calc.js"
import { Validator } from "./validations.js"

const calc = new CalcHolidays({})
const validate = new Validator()

class Director {
  calculate () {
    let salary = Number(document.getElementById('salary').value)
    let familyBonus = Number(document.getElementById('family-assignment').value)
    let otherFix = Number(document.getElementById('fix-cost').value)
    let absentDays = Number(document.getElementById('absent-days').value)
    let daysToTake = Number(document.getElementById('holidays-to-take').value)
    let dateAdmission = new Date(`${document.getElementById('date-admission').value}T00:00:00`) 
    let dateRequest = new Date(`${document.getElementById('holidays-date').value}T00:00:00`)

    validate.isAnyDateIsEmpty(dateAdmission, dateRequest)
      .then(() => validate.dateAdmIsLowerToDateReq(dateAdmission, dateRequest))
      .then(() => validate.daysToTakeIsNotEmpty(daysToTake))
      .then(() => validate.salaryIsNotEmpty(salary))
      .then(() => calc.checkSalariesVariables())
      .then(() => calc.holidaysBalance(dateAdmission, dateRequest, absentDays))
      .then(() => calc.avgAndSumVariables())
      .then(() => calc.rsltBase(salary, familyBonus, otherFix))
      .then(() => calc.rsltTotal(daysToTake))
      .then(() => calc.logConsole())

  }
}

export { Director }