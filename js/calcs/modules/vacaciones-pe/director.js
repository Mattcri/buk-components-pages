import { CalcHolidays } from "./calc.js"

const calc = new CalcHolidays({})

class Director {
  calculate () {
    let salary = Number(document.getElementById('salary').value)
    let familyBonus = Number(document.getElementById('family-assignment').value)
    let otherFix = Number(document.getElementById('fix-cost').value)
    let absentDays = Number(document.getElementById('absent-days').value)
    let daysToTake = Number(document.getElementById('holidays-to-take').value)
    let dateAdmission = new Date(`${document.getElementById('date-admission').value}T00:00:00`) 
    let dateRequest = new Date(`${document.getElementById('holidays-date').value}T00:00:00`)

    calc.checkSalariesVariables()
    calc.holidaysBalance(dateAdmission, dateRequest, absentDays)
    calc.avgAndSumVariables()
    calc.rsltBase(salary, familyBonus, otherFix)
    calc.rsltTotal(daysToTake)
    calc.logConsole()

  }
}

export { Director }