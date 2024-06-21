import { coFormatter } from "../currencyCO.js"
import { nvtCO } from "./calc.js"
// import { calc } from "./director.js"

class Validator {
  constructor(errorsList=[]) {
    this.errorsList = errorsList
  }

  salaryNotEmpty (salary) {
    let DOMinput = document.getElementById('salary')
    let txt = 'Debes ingresar un monto en tu salario básico'
    return new Promise((resolve, reject) => {
      if (salary !== 0) {
        resolve()
      } else {
        this.errorsList.push(txt)
        this.activeBorderError(DOMinput)
        reject(new Error('No se ingreso un monto en salario básico'))
      }
    })
  }

  salaryIsValid (salary) {
    let DOMinput = document.getElementById('salary')
    let txt = 'El salario básico no puede ser menor a $1.300.000'
    return new Promise((resolve, reject) => {
      if (salary !== 0) {
        if (salary > nvtCO.getSMLV()) {
          resolve()
        } else {
          this.errorsList.push(txt)
          this.activeBorderError(DOMinput)
          reject(new Error('Salario básico es menor al mínimo legal'))
        }
      }
    })
  }

  daysWorkedInMonth (daysWorked) {
    let DOMinput = document.getElementById('days-worked')
    let txt = 'Debes ingresar la cantidad de días trabajados al mes'
    return new Promise((resolve, reject) => {
      if (daysWorked !== 0) {
        resolve()
      } else {
        this.errorsList.push(txt)
        this.activeBorderError(DOMinput)
        reject(new Error('No se ingresaron días trabajados al mes'))
      }
    })
  }

  datesIsNotEmpty(dateAdmission, endContractDate) {
    let inputAdmission = document.getElementById('start-contract-date')
    let inputEndContract = document.getElementById('layoff-date')
    let txt = 'Para poder calcular tu liquidación es necesario que registres una fecha de ingreso y una fecha de retiro'
    return new Promise((resolve, reject) => {
      if (moment(dateAdmission).isValid() !== false && moment(endContractDate).isValid() !== false) {
        resolve()
      } else {
        moment(dateAdmission).isValid() === false
          ? this.activeBorderError(inputAdmission)
          : false
        moment(endContractDate).isValid() === false
          ? this.activeBorderError(inputEndContract)
          : false
        this.errorsList.push(txt)
        reject(new Error('Alguna de las fechas se encuentra vacía'));
      }
    })
  }

  dateAdmissionIsBefore(dateAdmission, endContractDate) {
    let inputAdmission = document.getElementById('start-contract-date')
    let txt = 'La fecha de ingreso debe ser anterior a la fecha de retiro'
    return new Promise((resolve, reject) => {
      if (moment(dateAdmission).isValid() !== false) {
        if (moment(dateAdmission).isBefore(endContractDate)) {
          resolve()
        } else {
          this.activeBorderError(inputAdmission)
          this.errorsList.push(txt)
          reject(new Error('La fecha de ingreso debe ser anterior a la fecha de retiro'))
        }
      }
    })
  }

  dateEndContractIsAfter(dateAdmission, endContractDate) {
    let inputEndContract = document.getElementById('layoff-date')
    let txt = 'La fecha de retiro debe ser posterior a la fecha de ingreso'
    return new Promise((resolve, reject) => {
      if (moment(endContractDate).isValid() !== false) {
        if (moment(endContractDate).isAfter(dateAdmission)) {
          resolve()
        } else {
          this.activeBorderError(inputEndContract)
          this.errorsList.push(txt)
          reject(new Error('La fecha de retiro debe ser posterior a la fecha de ingreso'))
        }
      }
    })
  }

  dateEndContractFixTermNotEmpty(fixTermDate, withdrawalReason, contractType) {
    let inputFixTerm = document.getElementById('end-contract-fixed-date')
    let txt = 'La fecha fin de contrato fijo debe ser valida'
    return new Promise((resolve, reject) => {
      if (withdrawalReason === "option-3" && contractType === "fixed-term") {
        if (moment(fixTermDate).isValid() !== false) {
          resolve()
        } else {
          this.activeBorderError(inputFixTerm)
          this.errorsList.push(txt)
          reject(new Error('La fecha de retiro debe ser posterior a la fecha de ingreso'))
        }
      }
      resolve()
    })
  }

  dateEndContractFixTermIsAfterAdmission(dateAdmission, fixTermDate, withdrawalReason, contractType) {
    let inputEndContractFixTerm = document.getElementById('end-contract-fixed-date')
    let txt = 'La fecha fin de contrato fijo debe ser posterior a la fecha de ingreso'
    return new Promise((resolve, reject) => {
      if (withdrawalReason === "option-3" && contractType === "fixed-term") {
        if (moment(fixTermDate).isAfter(dateAdmission)) {
          resolve()
        } else {
          this.activeBorderError(inputEndContractFixTerm)
          this.errorsList.push(txt)
          reject(new Error('La fecha fin de contrato fijo debe ser posterior a la fecha de ingreso'))
        }
      }
      resolve()
    })
  }

  endContractIsInCurrentYear(endContractDate) {
    let inputEndContract = document.getElementById('layoff-date')
    let currentYear = new Date().getFullYear().toString()
    let initCurrentYear = moment(`01/01/${currentYear}T00:00:00`, "DD/MM/YYYY")
    let txt = 'La fecha de retiro debe corresponder a una liquidación del año en curso, no puede ser de años anteriores'
    return new Promise((resolve, reject) => {
      if (moment(endContractDate).isValid() !== false) {
        if (moment(endContractDate).isAfter(initCurrentYear)) {
          resolve()
        } else {
          this.activeBorderError(inputEndContract)
          this.errorsList.push(txt)
          reject(new Error('La fecha de retiro no corresponde a una fecha del año en curso'))
        }
      }
      reject(new Error('No se ingreso una fecha de retiro'))
    })
  }

  salaryLastYearIsNotEmpty (salaryLastYear, applyPreviousYear) {
    let DOMinput = document.getElementById('salary-last-year')
    let txt = 'El salario del año anterior no puede ser menor a $1.160.000'
    return new Promise((resolve, reject) => {
      if (applyPreviousYear === true) {
        if (salaryLastYear !== 0 && salaryLastYear >= nvtCO.getSMLVlastYear()) {
          resolve()
        } else {
          this.errorsList.push(txt)
          this.activeBorderError(DOMinput)
          reject(new Error('El salario básico del año anterior es menor al mínimo legal'))
        }
      }
      resolve()
    })
  }

  resetValuesIfFindErrors () {
    const txtValues = [
      document.getElementById('lbl-init-prima'),
      document.getElementById('lbl-init-unemployment'),
      document.getElementById('lbl-days-liquidation'),
      document.getElementById('lbl-days-compensation'),
      document.getElementById('lbl-days-liquidation-last-year')
    ]
    const currencyValues = [
      document.getElementById('lbl-total-devengos'),
      document.getElementById('lbl-total-discounts'),
      document.getElementById('lbl-total-pay'),
      document.getElementById('lbl-salary'),
      document.getElementById('lbl-prima'),
      document.getElementById('lbl-unemployment'),
      document.getElementById('lbl-unemployment-interest'),
      document.getElementById('lbl-vacations'),
      document.getElementById('lbl-compensation'),
      document.getElementById('lbl-health'),
      document.getElementById('lbl-pension'),
      document.getElementById('lbl-solidarity'),
      document.getElementById('lbl-subsitence'),
      document.getElementById('lbl-other-discounts'),
      document.getElementById('lbl-source'),
      document.getElementById('lbl-holding-compensation'),
      document.getElementById('lbl-unemployment-last-year'),
      document.getElementById('lbl-unemployment-interest-last-year')
    ]

    if (this.errorsList.length > 0) {
      txtValues.forEach(item => item.textContent = 0)
      currencyValues.forEach(item => item.textContent = coFormatter.format(0))
    }

  }

  raiseUpModal () {
    if (this.errorsList.length === 0) {
      return
    }
    let dialogErrs = document.querySelector('.buk-modal.buk-modal--control-errs')
    let ulErrorsList = document.getElementById('errors-list')

    document.querySelector('body').classList.add('non-scroll')
    dialogErrs.classList.add('buk-modal--show')

    this.errorsList.forEach(item => {
      let li = document.createElement('li')
      li.textContent = item
      ulErrorsList.append(li)
    })
  }

  activeBorderError(input) {
    input.classList.add('border-error')
  }

}

export { Validator }