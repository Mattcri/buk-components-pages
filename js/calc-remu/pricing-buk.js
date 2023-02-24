

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
    await pricing.addModule(this.module)
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
  factor: 1,
  name: 'm-remu',
  price: 1.9,
  module: 1
})


class PricingBuilder {
  constructor({
    tableBase,
    tableAditional,
    baseValues,
    amountValues = [],
  }) {
    this.tableBase = tableBase
    this.tableAditional = tableAditional
    this.baseValues = baseValues
    this.amountValues = amountValues
    this.init()
  }

  async init() {
    await this.checkPlan
    document.getElementById('esential').click()
  }

  checkPlan() {
    const DOMbukPlans = [...document.getElementsByName('buk-plan')]
    const resetPlanSelected = [...document.querySelectorAll('.plan-type__detail')]
    const plan = DOMbukPlans.find(item => item.checked == true)
    resetPlanSelected.forEach(i => i.classList.remove('SELECTED'))
    plan.previousElementSibling.classList.toggle('SELECTED')
    const values = {
      'factor': plan.dataset.factor,
      'module': plan.dataset.module
    }
    this.baseValues = values
    console.log('update: ', this.baseValues)
    return values
    
  }

  addModule(module) {
    this.amountValues.push(module)
    console.log('Suma: ', this.amountValues);
  }



}

const pricing = new PricingBuilder({
  tableBase: tableBase,
  tableAditional: tableAditional,
})

console.log(pricing)
// document.getElementById('esential').click()
console.log(remu)
