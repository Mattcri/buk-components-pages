import { CalcRemu } from "./calc.js"

const calc = new CalcRemu({})

class Director {
  
  remuneration () {
    let salary = Number(document.getElementById('fld-salary').value)
    let bonus = Number(document.getElementById('fld-bonus').value)
    let taxBonus = Number(document.getElementById('fld-tax-bonus').value)
    let notTaxBonus = Number(document.getElementById('fld-not-tax-bonus').value)
    let otherDiscounts = Number(document.getElementById('fld-other-discounts').value)
    let medicine = Number(document.getElementById('fld-medicine').value)
    let pac = Number(document.getElementById('fld-pac').value)
    let mandatoryPensions = Number(document.getElementById('fld-mandatory-pensions').value)
    let voluntaryPensions = Number(document.getElementById('fld-voluntary-pensions').value)
    let afc = Number(document.getElementById('fld-afc').value)
    let interest = Number(document.getElementById('fld-housting-interest').value)



    console.log(taxBonus)

    Promise.all([
      calc.taxDevengos(salary, bonus, taxBonus),
      calc.auxTransport(salary, bonus),
      calc.calcPrepaidMedicine(medicine, pac),
      calc.calcPensions(mandatoryPensions, voluntaryPensions, afc),
      calc.calcDependents(),
      calc.calcHousingInterest(interest),
      calc.totalExemptDeductions(),
      calc.log()

    ])
  }
}

export { Director }