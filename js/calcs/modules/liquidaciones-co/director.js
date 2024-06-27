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

    let salaryLastYear = Number(document.getElementById('salary-last-year').value)
    let variablesLastYear = Number(document.getElementById('variables-last-year').value)
    let auxTransportLastYear = Number(document.getElementById('aux-transport-last-year').value)
    let daysNotWorkedLastYear = Number(document.getElementById('days-not-worked-last-year').value)

    validate.salaryNotEmpty(salary)
    validate.salaryIsValid(salary)
    validate.daysWorkedInMonth(daysWorked)
    validate.datesIsNotEmpty(startContractDate, layoffDate)
    validate.dateAdmissionIsBefore(startContractDate, layoffDate)
    validate.dateEndContractIsAfter(startContractDate, layoffDate)
    validate.dateEndContractFixTermNotEmpty(endFixedDate, withdrawalReason, contractType)
    validate.dateEndContractFixTermIsAfterAdmission(startContractDate, endFixedDate, withdrawalReason, contractType)
    validate.endContractIsInCurrentYear(layoffDate)
    calc.checkApplyLastYear(salaryType, layoffDate)
    validate.salaryLastYearIsNotEmpty(salaryLastYear, calc.applyPreviousYear)
    validate.raiseUpModal()
    validate.resetValuesIfFindErrors()

    if (validate.errorsList.length === 0) {
      let sectionResults = document.getElementById('calc-results')
      let buttonDetail = document.querySelector(".calc-detail .button-detail")
      let infoDetail = buttonDetail.nextElementSibling

      if (!buttonDetail.classList.contains('active')) {
        buttonDetail.classList.add('active')
        infoDetail.classList.add('show')
      }
      sectionResults.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      
      calc.rsltLiquidationDays(startContractDate, layoffDate, daysNotWorked)
      calc.rsltInitPrima(layoffDate)
      calc.rsltInitLayoff(layoffDate, daysNotWorked)
      calc.rsltCompensationDays(salary, withdrawalReason, contractType, startContractDate, layoffDate, endFixedDate, daysNotWorked)
      calc.ibcSocialSecurity(salary, salaryType, otherSalaries, otherNotSalaries, daysWorked)
      calc.liquidationLastYear(salaryLastYear, variablesLastYear, auxTransportLastYear, daysNotWorkedLastYear, startContractDate, contractType)
      calc.devengosValues(salary, salaryType, contractType, otherConceptsPrima, otherUnemploymentConcepts, otherSalaries, otherNotSalaries, daysWorked, daysNotWorked, variablesVacationsConcepts, vacationsPending)
      calc.discountsValues(salary, salaryType, contractType, otherSalaries, otherNotSalaries, otherDiscounts)
      calc.rsltTotal()
      calc.printInScreen(otherDiscounts)
      calc.logRslt()
    }

  }

}

export { Director, validate }