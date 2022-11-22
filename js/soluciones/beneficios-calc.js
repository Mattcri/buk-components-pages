// let total = 0
const getUF = async () => {
  const response = await fetch('https://d3nk1otf0qe6jp.cloudfront.net/data.json')
    .then(r => r.json())
    .then(data => data.UF)
    .catch(err => console.error(err))
  console.log(response)
  return response
  
}

const putUF = async () => {
  const call = await getUF()
  const uf = call.Valor
  const date = call.Fecha
  valuesUF.price = uf
  valuesUF.date = date
}

const valuesUF = {
  'price': '',
  'date': ''
}

const operateRun = (element) => {
  const allCheckbox = [...document.querySelectorAll('input[type="checkbox"]')]
  const gympassCore = document.getElementById('bn-3')
  const gympassStarter = document.getElementById('bn-4')

  if (gympassCore.checked && gympassStarter.checked) {
    console.log('ERROR')
    showError()
  } else {
    calculateValue(allCheckbox)
    hideError()
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
  putPricesInDOM(total.toFixed(2))
  console.log(checkbox)
  console.log(actives)
  console.log(values)
  console.log(total.toFixed(2))
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
  
  console.log(parseFloat(ufPrice))
  console.log(ufToClp)
  console.log('CLP: ',clp)
}

const showError = () => {
  const gympassCore = document.getElementById('bn-3')
  const gympassStarter = document.getElementById('bn-4')
  const DOMuf = document.getElementById('price-uf')
  const DOMclp = document.getElementById('price-clp')
  DOMuf.textContent = 'Selecciona solo un Gympass'
  DOMclp.textContent = 'Aprox $0 CLP'
  DOMuf.classList.add('txt-error')
  gympassCore.parentElement.classList.add('control-error')
  gympassStarter.parentElement.classList.add('control-error')
}

const hideError = () => {
  const gympassCore = document.getElementById('bn-3')
  const gympassStarter = document.getElementById('bn-4')
  const DOMuf = document.getElementById('price-uf')
  DOMuf.classList.remove('txt-error')
  gympassCore.parentElement.classList.remove('control-error')
  gympassStarter.parentElement.classList.remove('control-error')
}


if (typeof window !== "undefined") {
  window.onload = putUF()
}
