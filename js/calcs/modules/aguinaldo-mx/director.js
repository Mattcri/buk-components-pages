import { CalcAguinaldo } from "./calcAguinald.js";

const calc = new CalcAguinaldo({})

class Director {
  calculate() {
    let dateAdmission = document.getElementById('date-admission').value
    let dischargeDate = document.getElementById('discharge-date').value
    let day = Number(document.getElementById('aguinaldo-days').value)
    let salary = Number(document.getElementById('salary').value)

    Promise.all([
      calc.getDates(dateAdmission, dischargeDate),
      calc.daysInYear(),
      calc.getAguinaldoDays(day),
      calc.getProportional(salary),
      calc.getExempt(),
      calc.getBaseTax(),
      calc.getBaseTaxFT(salary),
      calc.getISRbase(),
      calc.getISRmonth(salary),

      calc.printLog()
    ])
  }
}

export { Director }