import { Director } from "./modules/liquidaciones-co/director.js";

const director = new Director()
const btnCalculate = document.getElementById('btn-calculate')

btnCalculate.addEventListener('click', () => {
  director.calculateLiquidation()
})

console.log('hola mundo');