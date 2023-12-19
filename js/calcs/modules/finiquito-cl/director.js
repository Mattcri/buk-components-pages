import { CalcFiniquito } from "./calc.js"

const calc = new CalcFiniquito({})

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
    let variableRemuIsTrue = document.getElementById('true-remuneracion').checked

    calc.rslTimeWorked(dateAdmission, endContractDate)
    calc.rsltVacationDays()
    calc.rsltFixedRent(baseSalary, taxableFixedRemu)
    calc.rsltAvgVariableRent(variableRemuIsTrue)
    calc.sumBaseRent()
    calc.rentsPerDays(baseSalary)
    calc.vacationsValues(vacationsTaken, endContractDate)
    await calc.rsltCompensations(typeCausal, endContractDate, noticeDate)
    calc.rsltTotalLiquidation()

    calc.log()

  }
}

export { Director }