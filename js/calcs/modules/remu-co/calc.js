import { coFormatter } from "../currencyCO.js"
import { nationalValues } from "./initialValues.js"

class CalcRemu {
  constructor({
    totalTaxDevengos = 0,
    prepaidMedicine = 0,
    pensions = 0,
    dependents = 0,
    housingInterest = 0,
    totalDevengos = 0,
    totalDiscount = 0,
    totalNetSalary = 0
  }) {
    this.totalTaxDevengos = totalTaxDevengos
    this.prepaidMedicine = prepaidMedicine
    this.pensions = pensions
    this.dependents = dependents
    this.housingInterest = housingInterest
    this.totalDevengos = totalDevengos
    this.totalDiscount = totalDiscount
    this.totalNetSalary = totalNetSalary
  }

  taxDevengos (salary, bonus, taxBonus) {
    let total = salary + bonus + taxBonus
    this.totalTaxDevengos = total
  }

  auxTransport (salary, bonus) {
    let FLDauxTransport = document.getElementById('fld-aux-transport')
    if ((salary + bonus) < (nationalValues.minSalary * 2)) {
      FLDauxTransport.value = coFormatter.format(nationalValues.auxTransport)
    } else {
      FLDauxTransport.value = '$0'
    }
  }

  calcPrepaidMedicine(medicine, pac) {
    let maxAmount = nationalValues.maxMedicinePac
    if ((medicine + pac) > maxAmount) {
      this.prepaidMedicine = maxAmount
    } else {
      this.prepaidMedicine = medicine + pac
    }
  }

  calcPensions (mandatoryPensions, voluntaryPensions, afc) {
    let thirtyPercentTaxDevengos = 0.3 * this.totalTaxDevengos
    let sumFields = mandatoryPensions + voluntaryPensions + afc

    if (sumFields > thirtyPercentTaxDevengos) {
      this.pensions = thirtyPercentTaxDevengos
    } else {
      this.pensions = sumFields
    }
  }

  calcDependents () {
    let dependentsOption = document.getElementById('bol-dependents')
    let maxAmount = nationalValues.maxDependents
    let taxDevengos = this.totalTaxDevengos

    if (dependentsOption.checked == true) {
      (taxDevengos * 0.1) > maxAmount
        ? this.dependents = maxAmount
        : this.dependents = taxDevengos * 0.1
    } else {
      this.dependents = 0
    }
  }

  calcHousingInterest (interest) {
    let maxAmount = nationalValues.housingInterest
    interest > maxAmount
      ? this.housingInterest = maxAmount 
      : this.housingInterest = interest
  }

  totalExemptDeductions () {
    let DOMfld = document.getElementById('fld-exempt-deductions')
    let sumValues = (this.prepaidMedicine + this.pensions + this.dependents + this.housingInterest)

    DOMfld.value = coFormatter.format(sumValues)
  }

  log () {
    console.log(this)
  }

}

export { CalcRemu }