class Validator {

  isAnyDateIsEmpty(date1, date2) {
    let txt = 'Para poder calcular el monto a pagar en tus vacaciones ingresa ambas fechas solicitadas.';

    return new Promise((resolve, reject) => {
      if (moment(date1).isValid() !== false && moment(date2).isValid() !== false) {
        resolve();
      } else {
        this.raiseUpModal(txt);
        reject(new Error('Alguna de las fechas se encuentra vacia'));
      }
    });
  }

  dateAdmIsLowerToDateReq(date1, date2) {
    let txt = 'La fecha en que ingresaste a la empresa, es superior a la fecha de solicitud de vacaciones. Por favor, registra una fecha valida.'

    return new Promise((resolve, reject) => {
      if (moment(date1).isBefore(date2)) {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('La fecha de ingreso a la empresa es superior a la fecha de solicitud de vacaciones'))
      }
    })
  }

  daysToTakeIsNotEmpty(daysToTake) {
    let txt = 'Por favor ingresa el número de días de vacaciones a tomar.'

    return new Promise((resolve, reject) => {
      if (daysToTake !== 0) {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('No se ingreso los días de vacaciones a tomar'))
      }
    })
  }

  salaryIsNotEmpty(salary) {
    let txt = 'Por favor ingresa el monto de tu salario mensual.'

    return new Promise((resolve, reject) => {
      if (salary !== 0) {
        resolve()
      } else {
        this.raiseUpModal(txt)
        reject(new Error('No se ingreso un salario mensual'))
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