// import { data } from './dataTable.js'

class Validator {

  isInRangeDate(date, startDate, endDate) {
    return new Promise((resolve, reject) => {
      let txt = 'La fecha ingresada es superior al periodo de gratificación que estás consultando, por favor digita una fecha valida';
      if (date >= startDate && date <= endDate || date < startDate) {
        resolve();
      } else {
        this.raiseUpModal(txt);
        reject(new Error('Fecha no se encuentra en el rango'));
      }
    });
  }

  dateInputIsEmpty(date) {
    return new Promise((resolve, reject) => {
      let txt = 'Por favor digita una fecha de ingreso para que podamos calcular tu gratificación';
      if (date === '') {
        this.raiseUpModal(txt);
        reject(new Error('No se ingresó una fecha'));
      } else {
        resolve();
      }
    });
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