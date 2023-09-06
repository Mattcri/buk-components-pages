import { nationalValues } from "./modules/remu-co/initialValues.js"
import { coFormatter } from "./modules/currencyCO.js"
import { Director } from "./modules/remu-co/director.js"

document.getElementById('nv-min-salary').value = coFormatter.format(nationalValues.minSalary)
document.getElementById('nv-aux-transport').value = coFormatter.format(nationalValues.auxTransport)
document.getElementById('nv-uvt').value = coFormatter.format(nationalValues.uvt)

const calculate = new Director()

const btnCalculate = document.getElementById('btn-calculate')
const FLDauxTransport = document.getElementById('fld-aux-transport')

btnCalculate.addEventListener('click', function() {
  calculate.remuneration()
})

FLDauxTransport.addEventListener('change', function() {
  if (FLDauxTransport.value > nationalValues.auxTransport) {
    FLDauxTransport.value = nationalValues.auxTransport
  }
})