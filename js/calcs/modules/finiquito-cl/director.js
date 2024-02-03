import { CalcFiniquito } from "./calc.js"
import { Validator } from "./validations.js"

const calc = new CalcFiniquito({})
const validate = new Validator()

class Director {

  async calculateFiniquito() {
    let typeCausal = document.getElementById('type_causal').value
    let dateAdmission = new Date(`${document.getElementById('date-admission').value}T00:00:00`)
    let endContractDate = new Date(`${document.getElementById('end-contract-date').value}T00:00:00`)
    let noticeDate = new Date(`${document.getElementById('notice-date').value}T00:00:00`)
    let vacationsTaken = Number(document.getElementById('vacations-taken').value)
    let baseSalary = Number(document.getElementById('base-salary').value)
    let taxableFixedRemu = Number(document.getElementById('taxable-fixed-remu').value)
    let nonTaxableFixedRemu = Number(document.getElementById('non-taxable-fixed-remu').value)
    let lastVariableRent = Number(document.getElementById('last-variable-rent').value)
    let variableRemuIsTrue = document.getElementById('true-remuneracion').checked

    validate.datesIsNotEmpty(dateAdmission, endContractDate)
      .then(() => validate.dateAdmissionIsBefore(dateAdmission, endContractDate))
      .then(() => validate.dateNoticationIsNotEmpty(typeCausal, noticeDate))
      .then(() => validate.dateNotificationIsSameOrBeforeEndContract(typeCausal, noticeDate, endContractDate))
      .then(() => validate.dateNotificationIsAfterAdmission(typeCausal, noticeDate, dateAdmission))
      .then(() => validate.baseSalaryNotEmpty(baseSalary))
      .then(() => calc.rslTimeWorked(dateAdmission, endContractDate))
      .then(() => calc.rsltVacationDays())
      .then(() => calc.rsltFixedRent(baseSalary, taxableFixedRemu, nonTaxableFixedRemu, lastVariableRent))
      .then(() => calc.rsltAvgVariableRent(variableRemuIsTrue))
      .then(() => calc.sumBaseRent())
      .then(() => calc.rentsPerDays(baseSalary))
      .then(() => calc.vacationsValues(vacationsTaken, endContractDate))
      .then(() => calc.rsltCompensations(typeCausal, endContractDate, noticeDate))
      .then(() => calc.rsltTotalLiquidation())
      .then(() => calc.log())


  }
}

export { Director }