// let total = 0
moment.locale('es')

const getUF = async () => {
  const today = new Date().toISOString().slice(0, 10)
  const response = await fetch('https://d3nk1otf0qe6jp.cloudfront.net/data.json')
    .then(r => r.json())
    .then(data => data.UF.find(uf => uf.Fecha === today))
    .catch(err => console.error(err))
  console.log(response)
  return response
  
}

const putUF = async () => {
  const call = await getUF()
  const DOMufDate = document.getElementById('date-uf')
  const uf = call.Valor
  const date = call.Fecha
  const dateFormat = moment(date).format('D MMM YYYY')
  const ufvalueClp = uf.slice(0, 6)
  valuesUF.price = uf
  valuesUF.date = date
  DOMufDate.textContent = `$${ufvalueClp} - ${dateFormat}`
}

const valuesUF = {
  'price': '',
  'date': ''
}

const operateRun = (inputClick) => {
  const allCheckbox = [...document.querySelectorAll('input[type="checkbox"]')]
  // const gympassCore = document.getElementById('bn-3')
  // const gympassStarter = document.getElementById('bn-4')
  const inputsInsurance = [...document.querySelectorAll('input[data-input-type="insurance"]')]
  const inputsGympass = [...document.querySelectorAll('input[data-input-type="gympass"]')]

  const gympassTrue = inputsGympass.filter(e => e.checked)
  const gympassFalse = inputsGympass.filter(e => !e.checked)
  const insuranceTrue = inputsInsurance.filter(e => e.checked)
  const insuranceFalse = inputsInsurance.filter(e => !e.checked)

  if (gympassTrue.length > 1 || insuranceTrue.length > 1) {
    showError(gympassTrue, gympassFalse)
    showError(insuranceTrue, insuranceFalse)
    selectedInputs(allCheckbox)
    messageError(inputClick)
  } else {
    calculateValue(allCheckbox)
    selectedInputs(allCheckbox)
    hideError(allCheckbox)
  }

}

const calculateValue = (checkbox) => {
  const actives = checkbox.filter(c => c.checked)
  const values = actives.map(v => parseFloat(v.value))
  const total = values.reduce((prev, acum) => prev + acum, 0)
  putPricesInDOM(total.toFixed(4))
  // console.log(checkbox)
  // console.log(actives)
  console.log('Suma de valores: ', values)
  console.log('Total: ', total)
  console.log('-----------------')
}

const putPricesInDOM = (price) => {
  const {price:ufPrice, date:ufDate} =  valuesUF
  const DOMuf = document.getElementById('price-uf')
  const DOMclp = document.getElementById('price-clp')
  price > 0 ? price : price = '0'
  DOMuf.textContent = `UF ${price}`
  DOMuf.classList.remove('txt-error')

  const ufToClp = (price * parseFloat(ufPrice))
  const clp = ufToClp.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  })
  DOMclp.textContent = Math.floor(ufToClp) == 0 ? `Aprox. $${clp.slice(3)} CLP` : `Aprox. ${clp} CLP`
  console.log('UF day: ', ufPrice)
  console.log('UfPrice: ', parseFloat(ufPrice))
  console.log('toClp', ufToClp)
  console.log('CLP: ',clp)
}

const showError = (DOMelemTrue, DOMelemFalse) => {
  console.log('ERROR')

  if (DOMelemTrue.length > 1) {
    DOMelemTrue.forEach(item => item.parentElement.classList.add('control-error'))
    DOMelemFalse.forEach(item => item.parentElement.classList.remove('control-error'))
  } else if (DOMelemTrue.length == 1) {
    // Si es igual a 1 elemento en True eliminar los errores de todos los inputs type
    DOMelemTrue.forEach(item => item.parentElement.classList.remove('control-error'))
    DOMelemFalse.forEach(item => item.parentElement.classList.remove('control-error'))
  }
}

const hideError = (DOMelem) => {
  DOMelem.forEach(e => e.parentElement.classList.remove('control-error'))
}

const messageError = (inputType) => {
  const inputsInsurance = [...document.querySelectorAll('input[data-input-type="insurance"]')]
  const inputsGympass = [...document.querySelectorAll('input[data-input-type="gympass"]')]

  const msgErrGympass = 'Selecciona solo una versión de Gympass'
  const msgErrInsurance = 'Selecciona solo una versión de Seguros Zurich'

  const gympassWithErr = inputsGympass.filter(e => e.parentElement.classList.contains('control-error'))
  const insuranceWithErr = inputsInsurance.filter(e => e.parentElement.classList.contains('control-error'))
  const inputClicked = inputType.dataset.inputType

  console.log('Input Type: ', inputType.dataset.inputType)

  const putErrMessageInDOM = (msg) => {
    const DOMuf = document.getElementById('price-uf')
    const DOMclp = document.getElementById('price-clp')
    DOMuf.textContent = msg
    DOMuf.classList.add('txt-error')
    DOMclp.textContent = 'Aprox $0 CLP'
  }

  // Cambia el mensaje según el último input al que se le da Click
  if (gympassWithErr.length > 1 && inputClicked == 'gympass') {
    putErrMessageInDOM(msgErrGympass)
  } else if (insuranceWithErr.length > 1 && inputClicked == 'insurance') {
    putErrMessageInDOM(msgErrInsurance)
  }

  // Cambia el mensaje cuando seguros o gympass esta sin errores por el contrario que aún presenta errores
  if (gympassWithErr.length == 0) {
    putErrMessageInDOM(msgErrInsurance)
  } else if (insuranceWithErr.length == 0) {
    putErrMessageInDOM(msgErrGympass)
  }

}

const initialClick = async () => {
  document.getElementById('bn-2').click()
}

const selectedInputs = (checkbox) => {
  checkbox.forEach(mod => {
    mod.checked ? mod.nextElementSibling.firstElementChild.style.fontWeight = "600" : mod.nextElementSibling.firstElementChild.style.fontWeight = "400"
  })
  
}

if (typeof window !== "undefined") {
  window.onload = async () => {
    await putUF()
    await initialClick()
  }
}
