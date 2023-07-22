import { coFormatter } from "../currencyCO.js"
import { upperLimit } from "./dataTables.js"
import { nationalValues } from "./initialValues.js"

class CalcRemu {
  constructor({
    totalTaxDevengos = 0,
    prepaidMedicine = 0,
    pensions = 0,
    dependents = 0,
    housingInterest = 0,
    
    totalExemptDeductions = 0,
    exempt = 0,
    law1819 = 0,

    legalDiscounts = 0,
    fortyPercent = 0,
    law1393 = 0,
    ibc = 0,
    discountHealth = 0,
    discountPension = 0,
    discountSolidarity = 0,
    discountSubsistence = 0,

    totalDevengos = 0,
    totalDiscounts = 0,
    totalNetSalary = 0,
  }) {
    this.totalTaxDevengos = totalTaxDevengos
    this.prepaidMedicine = prepaidMedicine
    this.pensions = pensions
    this.dependents = dependents
    this.housingInterest = housingInterest
    
    this.totalExemptDeductions = totalExemptDeductions
    this.exempt = exempt
    this.law1819 = law1819

    this.legalDiscounts = legalDiscounts
    this.fortyPercent = fortyPercent
    this.law1393 = law1393
    this.ibc = ibc
    this.discountHealth = discountHealth
    this.discountPension = discountPension
    this.discountSolidarity = discountSolidarity
    this.discountSubsistence = discountSubsistence

    this.totalDevengos = totalDevengos
    this.totalDiscounts = totalDiscounts
    this.totalNetSalary = totalNetSalary
    
  }

  taxDevengos (salary, bonus, taxBonus) {
    let total = salary + bonus + taxBonus
    this.totalTaxDevengos = total
  }

  auxTransport (salary, bonus) {
    let FLDauxTransport = document.getElementById('fld-aux-transport')
    if ((salary + bonus) < (nationalValues.minSalary * 2)) {
      this.displayInDOM('value', FLDauxTransport, nationalValues.auxTransport)
    } else {
      this.displayInDOM('value', FLDauxTransport, 0)
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

  exemptDeductions () {
    let DOMfld = document.getElementById('fld-exempt-deductions')
    let sumValues = (this.prepaidMedicine + this.pensions + this.dependents + this.housingInterest)

    this.totalExemptDeductions = sumValues
    this.displayInDOM('value', DOMfld, sumValues)
  }

  totalBenefitDevengos (salary, bonus) {
    let sumValues = salary + bonus
    let DOMfld = document.getElementById('fld-total-benefit-devengos')
    this.displayInDOM('value', DOMfld, sumValues)
  }

  totalDevengosWithoutAuxTransport (taxBonus, notTaxBonus) {
    let sumValues = taxBonus + notTaxBonus
    let DOMfld = document.getElementById('fld-devengos-without-aux-transp')
    this.displayInDOM('value', DOMfld, sumValues)
  }

  fortyPct(salary, bonus, taxBonus, notTaxBonus) {
    let sumValues = (salary + bonus + taxBonus + notTaxBonus)
    let fortyPct = (sumValues * 0.4)
    let DOMfld = document.getElementById('fld-forty-pct')
    this.fortyPercent = fortyPct
    this.displayInDOM('value', DOMfld, fortyPct)
  }

  excessLaw1393(taxBonus, notTaxBonus) {
    let sumValues = taxBonus + notTaxBonus
    let excess = sumValues - this.fortyPercent
    let DOMfld = document.getElementById('fld-excess-law-1393')
    if (excess > 0) {
      this.law1393 = excess
    } else {
      this.law1393 = 0
    }
    this.displayInDOM('value', DOMfld, this.law1393)
  }

  ibcSocialSecurity(salary, bonus) {
    let sumValues = salary + bonus
    let excess = this.law1393
    let maxAmount = nationalValues.maxSocialSecuriry
    let isIntegralSalary = document.getElementById('bol-integral-salary-true')
    let DOMfld = document.getElementById('fld-ibc')
    let calcIbc = isIntegralSalary.checked == true ? ((sumValues * 0.7) + excess) : (sumValues + excess)

    calcIbc > maxAmount ? this.ibc = maxAmount : this.ibc = calcIbc
    this.displayInDOM('value', DOMfld, this.ibc)
  }

  health() {
    let calcHealth = this.ibc * 0.04
    let DOMfld = document.getElementById('fld-health')
    this.discountHealth = calcHealth
    this.displayInDOM('value', DOMfld, calcHealth)
  }

  pension() {
    let calcPension = this.ibc * 0.04
    let DOMfld = document.getElementById('fld-pension')
    this.discountPension = calcPension
    this.displayInDOM('value', DOMfld, calcPension)
  }

  solidarityAndSubsistence() {
    let ibc = this.ibc
    let lastLimit = upperLimit.table[upperLimit.table.length - 1].limit
    let range = ibc < lastLimit
      ? upperLimit.table.find(item => this.searchUpperLimit(item.limit, ibc, item))
      : { 'limit': ibc, 'pct': 2, 'solidarity': 0.5, 'subsistence': 1.5 }
    console.log('rango', range)
    let calcSolidarity = ibc * (range.solidarity / 100)
    let calcSubsistence = ibc * (range.subsistence / 100)
    let DOMfldSolidarity = document.getElementById('fld-solidarity')
    let DOMfldSubsistence = document.getElementById('fld-subsistence')

    this.discountSolidarity = calcSolidarity
    this.discountSubsistence = calcSubsistence
    this.displayInDOM('value', DOMfldSolidarity, calcSolidarity)
    this.displayInDOM('value', DOMfldSubsistence, calcSubsistence)
  }

  searchUpperLimit ( limit, ibc,  obj) {
    if (ibc <= limit) {
      console.log('ibc method', ibc);
      return obj
    } 
  }

  sumLegalDiscount () {
    let sumDiscount = (this.discountHealth + this.discountPension + this.discountSolidarity + this.discountSubsistence)
    let DOMfld = document.getElementById('fld-legal-discount')
    this.legalDiscounts = sumDiscount
    this.displayInDOM('value', DOMfld, sumDiscount)
  }

  exemptIncome () {
    let maxAmount = nationalValues.maxExemptIncome
    let pctExempt = (this.totalTaxDevengos - this.legalDiscounts - this.totalExemptDeductions) * 0.25
    let DOMfld = document.getElementById('fld-exemt-income')
    if (pctExempt > maxAmount) {
      this.exempt = maxAmount
    } else {
      this.exempt = pctExempt
    }
    this.displayInDOM('value', DOMfld, this.exempt)
  }

  displayInDOM (type, element, amount) {
    if (type == 'value') {
      element.value = coFormatter.format(amount)
    } else if (type == 'content') {
      element.textContent = coFormatter.format(amount)
    }
  }

  log () {
    console.log(this)
  }

}

export { CalcRemu }