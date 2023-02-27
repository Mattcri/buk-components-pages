

// const checkPlan = () => {
//   const DOMbukPlans = [...document.getElementsByName('buk-plan')]
//   const resetPlanSelected = [...document.querySelectorAll('.plan-type__detail')]
//   // const DOMesentialPlan = document.getElementById('esential')
//   // const DOMproPlan = document.getElementById('pro')
//   const plan = DOMbukPlans.find(item => item.checked == true)
//   resetPlanSelected.forEach(i => i.classList.remove('SELECTED'))
//   plan.previousElementSibling.classList.toggle('SELECTED')
//   return {
//     'factor': plan.dataset.factor,
//     'module': plan.dataset.module
//   }
//   // console.log(plan.dataset.factor)
// }

// const priceDirector = async () => {
//   const baseValues = await checkPlan()
//   // await checkPlan()
//   console.log(baseValues)
// }
function CalculateFactorAdelantos() {
  const numberCollaborators = document.getElementById('n-colab').value
  const RANGES = [
    { 'start': 1, 'end': 100, 'factor': 1.3 },
    { 'start': 101, 'end': 500, 'factor': 1.3 },
    { 'start': 501, 'end': 1000, 'factor': 1.5 },
    { 'start': 1001, 'end': 2500, 'factor': 1.5 },
    { 'start': 2501, 'end': 5000, 'factor': 1.6 },
    { 'start': 5001, 'end': 7500, 'factor': 1.7 },
    { 'start': 7501, 'end': 10000, 'factor': 1.7 },
    { 'start': 10001, 'end': 15000, 'factor': 1.7 },
    { 'start': 15001, 'end': 20000, 'factor': 1.72 },
  ]

  const lastRange = RANGES[RANGES.length - 1]
  const factorOverRanges = lastRange.factor

  if (numberCollaborators <= lastRange.end) {
    for (let i = 0; i < RANGES.length; i++) {
      let range = RANGES[i]
      // console.log(range)
      if (range.start <= numberCollaborators && range.end >= numberCollaborators) {
        let findFactor = range.factor
        // console.log('Factor Encontrado: ', findFactor)
        return findFactor
      }

    }
  } else {
    return factorOverRanges
  }

}

class TableBuilder {
  constructor( table ) {
    this.table = table
  }
}

const tableBase = new TableBuilder([
  { 'start': 1, 'end': 100, 'base': 0 },
  { 'start': 101, 'end': 500, 'base': 3.9104 },
  { 'start': 501, 'end': 1000, 'base': 13.2288 },
  { 'start': 1001, 'end': 2500, 'base': 23.1008 },
  { 'start': 2501, 'end': 5000, 'base': 52.3328 },
  { 'start': 5001, 'end': 7500, 'base': 88.0128 },
  { 'start': 7501, 'end': 10000, 'base': 121.4528 },
  { 'start': 10001, 'end': 15000, 'base': 154.8928 },
  { 'start': 15001, 'end': 20000, 'base': 221.7728 }
])

const tableAditional = new TableBuilder([
  { 'start': 1, 'end': 100, 'aditional': 0.039104 },
  { 'start': 101, 'end': 500, 'aditional': 0.023296 },
  { 'start': 501, 'end': 1000, 'aditional': 0.019744 },
  { 'start': 1001, 'end': 2500, 'aditional': 0.019488 },
  { 'start': 2501, 'end': 5000, 'aditional': 0.014272 },
  { 'start': 5001, 'end': 7500, 'aditional': 0.013376 },
  { 'start': 7501, 'end': 10000, 'aditional': 0.013376 },
  { 'start': 10001, 'end': 15000, 'aditional': 0.013376 },
  { 'start': 15001, 'end': 20000, 'aditional': 0.01309 }
])

class ModuleFeature {
  constructor({
    factor,
    name,
    price,
    module
  }) {
    this.factor = factor
    this.name = name
    this.price = price
    this.module = module
  }

  async action () {
    await pricing
    await pricing.addModule(this.factor)
    // console.log('nombre: ', this.name)
    // console.log('factor: ', this.factor)
  }

}

const remu = new ModuleFeature({
  factor: 1,
  name: 'm-remu',
  price: 1.9,
  module: 1
})
const asist = new ModuleFeature({
  factor: 1.38,
  name: 'm-asist',
  price: 1.9,
  module: 1
})


class PricingBuilder {
  constructor({
    tableBase,
    tableAditional,
    baseValues = {},
    amountModules = 0,
    amountFactors = 0,
    factorsSelected = 0
  }) {
    this.tableBase = tableBase
    this.tableAditional = tableAditional
    this.baseValues = baseValues
    this.amountModules = amountModules
    this.amountFactors = amountFactors
    this.factorsSelected = factorsSelected
    this.init()
  }

  async init() {
    await this.checkPlan
    document.getElementById('esential').click()
  }

  director() {
    this.checkPlan()
    this.addFactor()
    this.addModule()
    this.minPrice()
    this.additionalAmount()
    this.basisCostRange()
    this.additionalCostRange()
    this.calcPrice()
  }

  checkPlan() {
    let DOMbukPlans = [...document.getElementsByName('buk-plan')]
    let resetPlanSelected = [...document.querySelectorAll('.plan-type__detail')]
    let plan = DOMbukPlans.find(item => item.checked == true)
    resetPlanSelected.forEach(i => i.classList.remove('SELECTED'))
    plan.previousElementSibling.classList.toggle('SELECTED')
    let values = {
      'factor': parseFloat(plan.dataset.factor),
      'module': parseFloat(plan.dataset.module)
    }
    this.baseValues = values
    console.log('update: ', this.baseValues)
    return values
    
  }

  addFactor() {
    let modulesCheckbox = [...document.querySelectorAll('.modules input[type="checkbox"')]
    let modules = modulesCheckbox.filter(m => m.checked)
    let values = modules.map(v => v.name)
    let searcher = this.searchModules(values)
    let sumFactors = Number(searcher.reduce((prev, acum) => prev + acum, 0).toFixed(2))
    this.factorsSelected = searcher
    this.amountFactors = sumFactors + this.baseValues.factor
    console.log(this.factorsSelected)
    console.log('pricing: ', this)
    // this.addModule()
  }

  addModule() {
    let modulesCheckbox = [...document.querySelectorAll('.modules input[type="checkbox"')]
    let modules = modulesCheckbox.filter(m => m.checked)
    this.amountModules = modules.length + this.baseValues.module
    console.log(this.amountModules)
  }

  searchModules(input) {
    const VALUEMODULES = [
      { name: 'm-remu', factor: 1 },
      { name: 'm-asist', factor: 0.8 },
      { name: 'm-firma', factor: 0.26 },
      { name: 'm-adela', factor: CalculateFactorAdelantos() },
      { name: 'm-desep', factor: 0.6 },
      { name: 'm-capac', factor: 0.62 },
      { name: 'm-comun', factor: 0.28 },
      { name: 'm-benef', factor: 0.3 },
      { name: 'm-encue', factor: 0.2 },
      { name: 'm-selec', factor: 0.6 },
      { name: 'm-onboa', factor: 0.18 }
    ]
    let matches = VALUEMODULES.filter(module => input.includes(module.name))
    // let find = VALUEMODULES.filter((module, index) => {
    //   console.log('input: ', input)
    //   console.log('modules: ', module.name)
    //   // return input.indexOf(module.name) !== -1
    //   return input.includes(module.name)
    // })
    
    // console.log('searchModules - input : ', input)
    // console.log('searchModules - find : ', find)
    let factorValues = matches.map(item => item.factor)
    return factorValues
  }

  minPrice() {
    const basePeopleManagment = 2.3
    const priceForModule = 0.1
    let calcMinPrice = Number((basePeopleManagment + (priceForModule * this.amountModules)).toFixed(2))
    console.log('Min Price: ', calcMinPrice)
    return calcMinPrice
  }

  additionalAmount() {
    try {
      let numEmployees = document.getElementById('n-colab').value
      let initSearchAdditional = 100
      let overLastRange = 20001
      if (numEmployees <= initSearchAdditional) {
        console.log('colab: ', parseInt(numEmployees))
        return parseInt(numEmployees)
      }
      else if (numEmployees > initSearchAdditional && numEmployees < overLastRange) {
        // retorna la cantidad adicional, que es la diferencia entre el rango anterior y el rango ingresado en el input numero de colaboradores
        let range = this.tableAditional.table.findIndex(r => this.betweenRange(r.start, r.end, numEmployees, r))
        let previusRange = range - 1
        let additionalEndValue = this.tableAditional.table[previusRange].end
        console.log('rango: ', range)
        console.log('rango anterior: ', additionalEndValue)
        return additionalEndValue
      } else {
        // retorna el valor de la cantidad adicional del último rango
        console.log('last: ', this.tableAditional.table[this.tableAditional.table.length - 1].end)
        return this.tableAditional.table[this.tableAditional.table.length - 1].end
      }
    } catch (err) {
      console.error(err)
    }
  }

  basisCostRange() {
    try {
      let numEmployees = document.getElementById('n-colab').value
      let lastRange = this.tableBase.table[this.tableBase.table.length - 1]
      // Si es menor o igual al último rango, buscar el rango correspondiente según el input del número de colaboradores
      if (numEmployees <= lastRange.end) {
        let range = this.tableBase.table.find(r => this.betweenRange(r.start, r.end, numEmployees, r))
        console.log('Rango base: ', range)
        return range.base
      } else {
        return lastRange.base
      }
    } catch (err) {
      console.error(err)
    }
  }

  additionalCostRange() {
    try {
      let numEmployees = document.getElementById('n-colab').value
      let lastRange = this.tableAditional.table[this.tableAditional.table.length - 1]
      if (numEmployees <= lastRange.end) {
        let range = this.tableAditional.table.find(r => this.betweenRange(r.start, r.end, numEmployees, r))
        console.log('Rango Adicional: ', range.aditional)
        return range.aditional
      } else {
        return lastRange.aditional
      }
    } catch (err) {
      console.error(err)
    }
  }

  calcPrice() {
    let basisCost = this.basisCostRange()
    let additionalCost = this.additionalCostRange()
    let additionalAmount = this.additionalAmount()
    let price = (additionalCost * additionalAmount + basisCost) * this.amountFactors
    console.log('Price Total: ', price)
  }

  betweenRange (start, end, employees, obj) {
    try {
      if (employees >= start && employees <= end) return obj
    } catch (err) {
      console.error(err)
    }
  }

}

const pricing = new PricingBuilder({
  tableBase: tableBase,
  tableAditional: tableAditional,
})

// console.log(pricing)
// document.getElementById('esential').click()
// console.log(remu)
// console.log(document.getElementById('n-colab').value)
// console.log('Adelantos: ', CalculateFactorAdelantos())

// Posible solución para agregar los factores:
// crear un array con los valores de los factores y una llave valor con
// el nombre del módulo y hacer el match con el atributo "name" del 
// input html, de esa manera rescatamos el valor que contenga el factor 
// dentro del objeto encontrado en el array.