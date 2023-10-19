import { DefaultValues } from "./defaultValues.js"


class Validator {
  dateIsEmpty(date) {
    let txt = 'No registraste una fecha de ingreso'
    return new Promise((resolve, reject) => {
      if (date !== '') {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('No se selecciono fecha de ingreso'))
      }
    })
  }

  dateIsInRange(date) {
    let dfv = new DefaultValues()
    let txt = 'La fecha ingresada es superior al último día de pago de aguinaldo del actual periodo'
    let dateAdmission = moment(date)
    let lastDayOfYear = moment(dfv.lastDayYear())

    return new Promise((resolve, reject) => {
      if (dateAdmission <= lastDayOfYear) {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('La fecha ingresada es incorrecta'))
      }
    })
  }

  dayIsEmpty(day) {
    let txt = 'Ingresa un día de aguinaldo'

    return new Promise((resolve, reject) => {
      if (day !== 0) {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('No se ingreso un día de aguinaldo'))
      }
    })
  }

  salaryIsEmpty(salary) {
    let txt = 'Ingresa un salario'

    return new Promise((resolve, reject) => {
      if (salary !== 0) {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('No se ingreso un salario'))
      }
    })
  }

  raiseUpModal(textErr) {
    const dialogErrors = document.querySelector('.buk-modal.buk-modal--control-errs')
    const errorDescription = document.getElementById('error-description')

    document.querySelector('body').classList.add('non-scroll')
    dialogErrors.classList.add('buk-modal--show')
    errorDescription.textContent = textErr
  }

}

export { Validator }