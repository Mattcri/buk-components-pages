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

const operateRun = () => {
  const allCheckbox = [...document.querySelectorAll('input[type="checkbox"]')]
  const gympassCore = document.getElementById('bn-3')
  const gympassStarter = document.getElementById('bn-4')
  const inputInsurance = [...document.querySelectorAll('input[data-input-type="insurance"]')]

  const insuranceTrue = inputInsurance.filter(e => e.checked)
  const insuranceFalse = inputInsurance.filter(e => !e.checked)
  console.log('Seguros True: ', insuranceTrue)
  console.log('Seguros False: ', insuranceFalse)

  if (gympassCore.checked && gympassStarter.checked) {
    console.log('ERROR')
    showError()
  } else if (insuranceTrue.length > 1) {
    showInsuranceErr(insuranceTrue, insuranceFalse)
  } else {
    calculateValue(allCheckbox)
    fontWeightSelectInputs(allCheckbox)
    hideError()
    hideInsurandeErr(inputInsurance)
  }

  // console.log(element)
  // element.checked
  //   ? add(init, currentPrice)
  //   ? total = total + currentPrice
  //   : total = total - currentPrice

}

const calculateValue = (checkbox) => {
  const actives = checkbox.filter(c => c.checked)
  const values = actives.map(v => parseFloat(v.value))
  const total = values.reduce((prev, acum) => prev + acum, 0)
  putPricesInDOM(total.toFixed(3))
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

const showError = () => {
  const gympassCore = document.getElementById('bn-3')
  const gympassStarter = document.getElementById('bn-4')
  const DOMuf = document.getElementById('price-uf')
  const DOMclp = document.getElementById('price-clp')
  DOMuf.textContent = 'Selecciona solo una versión de Gympass'
  DOMclp.textContent = 'Aprox $0 CLP'
  DOMuf.classList.add('txt-error')
  gympassCore.parentElement.classList.add('control-error')
  gympassStarter.parentElement.classList.add('control-error')
  
  // switch (gympassCore.checked) {
  //   case true:
  //     gympassCore.parentElement.classList.add('control-error')
  //     break
  //   case false:
  //     gympassCore.parentElement.classList.remove('control-error')
  // }

  // switch (gympassStarter.checked) {
  //   case true:
  //     gympassStarter.parentElement.classList.add('control-error')
  //     break
  //   case false:
  //     gympassStarter.parentElement.classList.remove('control-error')
  // }
}

const showInsuranceErr = (DOMelemTrue, DOMelemFalse) => {
  console.log('ERROR SEGUROS')
  const DOMuf = document.getElementById('price-uf')
  const DOMclp = document.getElementById('price-clp')
  DOMuf.textContent = 'Selecciona solo una versión de Seguros Zurich'
  DOMclp.textContent = 'Aprox $0 CLP'
  DOMuf.classList.add('txt-error')
  DOMelemTrue.forEach(item => item.parentElement.classList.add('control-error'))
  DOMelemFalse.forEach(item => item.parentElement.classList.remove('control-error'))
}

const hideError = () => {
  const gympassCore = document.getElementById('bn-3')
  const gympassStarter = document.getElementById('bn-4')
  const DOMuf = document.getElementById('price-uf')
  DOMuf.classList.remove('txt-error')
  gympassCore.parentElement.classList.remove('control-error')
  gympassStarter.parentElement.classList.remove('control-error')
}

const hideInsurandeErr = (DOMelement) => {
  const DOMuf = document.getElementById('price-uf')
  DOMuf.classList.remove('txt-error')
  DOMelement.forEach(item => item.parentElement.classList.remove('control-error'))
}

const initialClick = async () => {
  document.getElementById('bn-2').click()
}

const fontWeightSelectInputs = (checkbox) => {
  checkbox.forEach(mod => {
    mod.checked ? mod.nextElementSibling.style.fontWeight = "600" : mod.nextElementSibling.style.fontWeight = "400"
  })
  
}

if (typeof window !== "undefined") {
  window.onload = async () => {
    await putUF()
    await initialClick()
  }
}
