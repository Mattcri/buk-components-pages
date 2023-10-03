import { CalcAguinaldo } from "./calcAguinald.js";

const calc = new CalcAguinaldo({})

class Director {
  calculate() {
    let dateAdmission = document.getElementById('date-admission').value
    let dischargeDate = document.getElementById('discharge-date').value


    Promise.all([
      calc.getDates(dateAdmission, dischargeDate),
      calc.daysInYear(),

      calc.printLog()
    ])
  }
}

export { Director }