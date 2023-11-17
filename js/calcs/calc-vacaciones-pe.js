import { Director } from "./modules/vacaciones-pe/director.js"

const director = new Director()
const btnCalculate = document.getElementById('btn-calc-holidays')

btnCalculate.addEventListener('click', function() {
  director.calculate()
})