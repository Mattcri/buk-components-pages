import { CalcRemu } from "./calc.js"

const calc = new CalcRemu({})

class Director {
  
  remuneration () {
    let salary = Number(document.getElementById('fld-salary').value)
    let bonus = Number(document.getElementById('fld-bonus').value)
    let taxBonus = Number(document.getElementById('fld-tax-bonus').value)
    let notTaxBonus = Number(document.getElementById('fld-not-tax-bonus').value)
    let auxTransport = Number(document.getElementById('fld-aux-transport').value)
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
      // calc.auxTransport(salary, bonus),
      calc.rsltPrepaidMedicine(medicine, pac),
      calc.rsltPensions(voluntaryPensions, afc),
      calc.rsltDependents(),
      calc.rsltHousingInterest(interest),
      calc.exemptDeductions(),
      calc.totalBenefitDevengos(salary, bonus),
      calc.totalDevengosWithoutAuxTransport(taxBonus, notTaxBonus),
      calc.fortyPct(salary, bonus, taxBonus, notTaxBonus),
      calc.excessLaw1393(taxBonus, notTaxBonus),
      calc.ibcSocialSecurity(salary, bonus),
      calc.health(),
      calc.pension(),
      calc.solidarityAndSubsistence(),
      calc.sumLegalDiscount(mandatoryPensions),
      calc.exemptIncome(),
      calc.totalExempt(),
      calc.maxLaw1819(),
      calc.rsltTaxBase(),
      calc.holdingSource(),
      calc.rsltTotalDevengos(salary, bonus, taxBonus, notTaxBonus),
      calc.rsltTotalDiscounts(otherDiscounts, mandatoryPensions, voluntaryPensions, afc, auxTransport),
      calc.rsltNetSalary(),
      calc.middleSimpleValues(mandatoryPensions, voluntaryPensions, afc),
      calc.log()

    ])
  }
}

export { Director }