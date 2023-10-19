import { CalcAguinaldo } from "./calc.js";
import { Validator } from "./validators.js";

const calc = new CalcAguinaldo({})
const validator = new Validator()

class Director {
  calculate() {
    let dateAdmission = document.getElementById('date-admission').value
    let dischargeDate = document.getElementById('discharge-date').value
    let day = Number(document.getElementById('aguinaldo-days').value)
    let salary = Number(document.getElementById('salary').value)
    let tax = document.getElementById('type-tax').value

    validator.dateIsEmpty(dateAdmission)
      .then(() => validator.dateIsInRange(dateAdmission))
      .then(() => validator.dayIsEmpty(day))
      .then(() => validator.salaryIsEmpty(salary))
      .then(() => calc.getDates(dateAdmission, dischargeDate))
      .then(() => calc.daysInYear())
      .then(() => calc.getAguinaldoDays(day))
      .then(() => calc.getProportional(salary, day))
      .then(() => calc.getExempt())
      .then(() => calc.getTaxed())
      .then(() => calc.getISRvalues(salary, tax))
      .then(() => calc.getTotalsValues())
      .then(() => calc.printLog())
      
  }
}

export { Director }