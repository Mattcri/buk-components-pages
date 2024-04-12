import { CalcLiquidaciones } from "./calc.js"
import { Validator } from "./validations.js"

const calc = new CalcLiquidaciones({})
const validate = new Validator()

class Director {

  calculateLiquidation () {
    let salary = Number(document.getElementById('salary').value)
    let salaryType = document.getElementById('salary-type').value
    let contractType = document.getElementById('contract-type').value
    let withdrawalReason = document.getElementById('withdrawal-reason').value
    let daysWorked = Number(document.getElementById('days-worked').value)
    let daysNotWorked = Number(document.getElementById('days-not-worked').value)

    let startContractDate = new Date(`${document.getElementById('start-contract-date').value}T00:00:00`)
    let layoffDate = new Date(`${document.getElementById('layoff-date').value}T00:00:00`)
    let endFixedDate = new Date(`${document.getElementById('end-contract-fixed-date').value}T00:00:00`)
    let otherSalaries = Number(document.getElementById('other-salaries').value)
    let otherNotSalaries = Number(document.getElementById('other-not-salaries').value)
    let vacationsPending = Number(document.getElementById('vacations-pending').value)
    let otherConceptsPrima = Number(document.getElementById('sum-variables-concepts-prima').value)
    let otherUnemploymentConcepts = Number(document.getElementById('sum-variables-concepts-unemployment').value)
    let variablesVacationsConcepts = Number(document.getElementById('sum-variables-concepts-vacations').value)
    let otherDiscounts = Number(document.getElementById('other-discounts').value)

    validate.salaryNotEmpty(salary)
    validate.salaryIsValid(salary)
    validate.daysWorkedInMonth(daysWorked)
    validate.datesIsNotEmpty(startContractDate, layoffDate)
    validate.dateAdmissionIsBefore(startContractDate, layoffDate)
    validate.dateEndContractIsAfter(startContractDate, layoffDate)
    validate.dateEndContractFixTermNotEmpty(endFixedDate, withdrawalReason, contractType)
    validate.dateEndContractFixTermIsAfterAdmission(startContractDate, endFixedDate, withdrawalReason, contractType)
    validate.raiseUpModal()
    validate.resetValuesIfFindErrors()

    if (validate.errorsList.length === 0) {
      calc.rsltLiquidationDays(startContractDate, layoffDate, daysNotWorked)
      calc.rsltInitPrima(layoffDate)
      calc.rsltInitLayoff(layoffDate, daysNotWorked)
      calc.rsltCompensationDays(salary, withdrawalReason, contractType, startContractDate, layoffDate, endFixedDate, daysNotWorked)
      calc.ibcSocialSecurity(salary, salaryType, otherSalaries, otherNotSalaries)
      calc.devengosValues(salary, salaryType, contractType, otherConceptsPrima, otherUnemploymentConcepts, otherSalaries, otherNotSalaries, daysWorked, daysNotWorked, variablesVacationsConcepts, vacationsPending)
      calc.discountsValues(salary, salaryType, contractType, otherSalaries, otherNotSalaries, otherDiscounts)
      calc.rsltTotal()
      calc.printInScreen(otherDiscounts)
      calc.logRslt()
    }

  }

}

export { Director, validate }