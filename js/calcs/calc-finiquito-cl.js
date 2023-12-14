import { Director } from "./modules/finiquito-cl/director.js"
import { NationalValues } from "./modules/finiquito-cl/nationalValues.js"

const director = new Director()
const ntv = new NationalValues()
const btn = document.getElementById('btn-calc-finiquito')

btn.addEventListener('click', () => {
  director.calculateFiniquito()
  console.log('UF: ', ntv.UFvalue.Valor)

})

const acc = [...document.getElementsByClassName("button-large ")];

acc.forEach(item => {
  item.addEventListener('click', function () {
    let active = document.querySelector(".button-large.active")
    let mql = window.matchMedia('(min-width:1020px)')
    if (active && active != this && mql.matches) {
      active.classList.remove("active");
      active.nextElementSibling.classList.remove("show");
    }
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");
  })
})

const variableSalaryRadio = [...document.getElementsByName('remu-variable')]

variableSalaryRadio.forEach(radio => {
  radio.addEventListener('change', function() {
    let varaibleSection = document.getElementById('apply-variable-salary')
    let variableInputs = [...document.querySelectorAll('[data-variable-salary="true"]')]

    if (document.getElementById('true-remuneracion').checked !== true) {
      varaibleSection.classList.add('ds-none')
      variableInputs.forEach(input => input.value = 0)
    } else {
      varaibleSection.classList.remove('ds-none')
    }
  })
})

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.button-large.button-large__color').click()
  ntv.getUF()
  
})

