class Validator {
  datesIsNotEmpty(dateAdmission, endContractDate) {
    let txt = 'Para poder calcular tu finiquito es necesario que registres una fecha de ingreso y una fecha de fin de contrato'
    return new Promise((resolve, reject) => {
      if (moment(dateAdmission).isValid() !== false && moment(endContractDate).isValid() !== false) {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('Alguna de las fechas se encuentra vacía'));
      }
    })
  }

  dateAdmissionIsBefore(dateAdmission, endContractDate) {
    let txt = 'La fecha de ingreso no puede ser superior a la fecha de fin del contrato'
    return new Promise((resolve, reject) => {
      if (moment(dateAdmission).isBefore(endContractDate)) {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('La fecha de ingreso debe ser anterior a la fecha de fin del contrato'))
      }
    })
  }

  dateNoticationIsNotEmpty(causal, notificationDate) {
    let txt = 'Para la causal actual, debes ingresar una fecha de aviso en la cual se le comunique al colaborador el termino de sus funciones'
    return new Promise((resolve, reject) => {
      if (causal === '3' || causal === '4') {
        if (moment(notificationDate).isValid() !== false) {
          resolve()
        } else {
          this.raiseUpModal(txt)
          reject(new Error('Ingresar una fecha de aviso'))
        }
      }
      resolve()
    })
  }

  dateNotificationIsSameOrBeforeEndContract(causal, notificationDate, endContractDate) {
    let txt = 'La fecha de aviso no puede ser posterior a la fecha del fin de contrato'
    return new Promise((resolve, reject) => {
      if (causal === '3' || causal === '4') {
        if (moment(notificationDate).isSameOrBefore(endContractDate)) {
          resolve()
        } else {
          this.raiseUpModal(txt)
          reject(new Error('La fecha de aviso tiene errores'))
        }
      }
      resolve()
    })
  }

  dateNotificationIsAfterAdmission(causal, notification, admission) {
    let txt = 'La fecha de aviso debe ser posterior a la fecha de ingreso a la empresa'
    return new Promise((resolve, reject) => {
      if (causal === '3' || causal === '4') {
        if (moment(notification).isAfter(admission)) {
          resolve()
        } else {
          this.raiseUpModal(txt)
          reject(new Error('La fecha de aviso tiene errores'))
        }
      }
      resolve()
    })
  }

  baseSalaryNotEmpty(baseSalary) {
    let txt = 'Debes ingresar un monto en tu sueldo base'
    return new Promise((resolve, reject) => {
      if (baseSalary !== 0) {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('No se ingreso un monto en el sueldo base'))
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