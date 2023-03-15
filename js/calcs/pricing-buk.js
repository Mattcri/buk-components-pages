function CalculateFactorAdelantos() {
  const numberCollaborators = document.getElementById('n-colab').value
  const RANGES = [
    { 'start': 1, 'end': 100, 'factor': 0.5 },
    { 'start': 101, 'end': 500, 'factor': 0.65 },
    { 'start': 501, 'end': 1000, 'factor': 0.7 },
    { 'start': 1001, 'end': 2500, 'factor': 0.7 },
    { 'start': 2501, 'end': 5000, 'factor': 0.75 },
    { 'start': 5001, 'end': 7500, 'factor': 0.8 },
    { 'start': 7501, 'end': 10000, 'factor': 0.8 },
    { 'start': 10001, 'end': 15000, 'factor': 0.8 },
    { 'start': 15001, 'end': 20000, 'factor': 0.8 },
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

function calcFactorLME () {
  const employees = document.getElementById('n-colab').value
  const RANGES = [
    { 'start': 1, 'end': 100, 'factor': 0.59 },
    { 'start': 101, 'end': 500, 'factor': 0.5 },
    { 'start': 501, 'end': 1000, 'factor': 0.2 },
    { 'start': 1001, 'end': 2500, 'factor': 0.2 },
    { 'start': 2501, 'end': 5000, 'factor': 0.15 },
    { 'start': 5001, 'end': 7500, 'factor': 0.14 },
    { 'start': 7501, 'end': 10000, 'factor': 0.14 },
    { 'start': 10001, 'end': 15000, 'factor': 0.13 },
    { 'start': 15001, 'end': 20000, 'factor': 0.13 },
  ]

  let lastRange = RANGES[RANGES.length - 1]
  let factorOverRanges = lastRange.factor
  let findFactor = RANGES.find(search => {
    if (employees >= search.start && employees <= search.end) return search
  })

  // employees <= lastRange.end ? findFactor : factorOverRanges
  if (employees <= lastRange.end) {
    return findFactor.factor
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

const tableAdditional = new TableBuilder([
  { 'start': 1, 'end': 100, 'additional': 0.039104 },
  { 'start': 101, 'end': 500, 'additional': 0.023296 },
  { 'start': 501, 'end': 1000, 'additional': 0.019744 },
  { 'start': 1001, 'end': 2500, 'additional': 0.019488 },
  { 'start': 2501, 'end': 5000, 'additional': 0.014272 },
  { 'start': 5001, 'end': 7500, 'additional': 0.013376 },
  { 'start': 7501, 'end': 10000, 'additional': 0.013376 },
  { 'start': 10001, 'end': 15000, 'additional': 0.013376 },
  { 'start': 15001, 'end': 20000, 'additional': 0.01309 }
])

const tableDiscounts = new TableBuilder([
  { 'totalModules': 4, 'percent': 5 },
  { 'totalModules': 5, 'percent': 7 },
  { 'totalModules': 6, 'percent': 8 },
  { 'totalModules': 7, 'percent': 9 },
  { 'totalModules': 8, 'percent': 9.5 },
  { 'totalModules': 9, 'percent': 10 },
  { 'totalModules': 10, 'percent': 10 },
  { 'totalModules': 11, 'percent': 10 },
  { 'totalModules': 12, 'percent': 11 },
  { 'totalModules': 13, 'percent': 12 },
  { 'totalModules': 14, 'percent': 13 },
  { 'totalModules': 15, 'percent': 14 },
  { 'totalModules': 16, 'percent': 15 },
])

// class ModuleFeature {
//   constructor({
//     factor,
//     name,
//     price,
//     module
//   }) {
//     this.factor = factor
//     this.name = name
//     this.price = price
//     this.module = module
//   }

// }

// const remu = new ModuleFeature({
//   factor: 1,
//   name: 'm-remu',
//   price: 1.9,
//   module: 1
// })

class PricingBuilder {
  constructor({
    tableBase,
    tableAdditional,
    tableDiscounts,
    baseValues = {},
    amountModules = 0,
    amountFactors = 0,
    factorsModulesSelected = 0,
    factorsAddonsSelected = 0
  }) {
    this.tableBase = tableBase
    this.tableAdditional = tableAdditional
    this.tableDiscounts = tableDiscounts
    this.baseValues = baseValues
    this.amountModules = amountModules
    this.amountFactors = amountFactors
    this.factorsModulesSelected = factorsModulesSelected
    this.factorsAddonsSelected = factorsAddonsSelected
    this.init()
  }

  async init() {
    await this.checkPlan
    document.getElementById('esential').click()
  }

  run() {
    this.checkPlan()
    this.addFactor()
    this.addModule()
    if (this.minPrice() > this.calcPrice()) {
      this.hideDOMblocks()
      this.displayPrice(this.minPrice())
    } else {
      this.handlerDOMactions()
      this.amountModules >= 4 ? this.displayPrice(this.discount()) : this.displayPrice(this.calcPrice())
    }
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
    let modules = this.addFactorModule()
    let addons = this.addFactorAddon()
    console.log('Factor addons', addons)
    let basis = this.baseValues.factor
    this.amountFactors = (basis + modules + addons)
  }

  addFactorModule() {
    let modulesCheckbox = [...document.querySelectorAll('.modules input[type="checkbox"')]
    let modules = modulesCheckbox.filter(m => m.checked)
    let names = modules.map(e => e.name)
    let searcher = this.searchModules(names)
    let sumFactors = Number(searcher.reduce((prev, acum) => prev + acum, 0).toFixed(2))
    this.factorsModulesSelected = searcher
    // this.amountFactors = sumFactors
    console.log(this.factorsModulesSelected)
    console.log('pricing: ', this)
    return sumFactors
  }

  addFactorAddon() {
    let addonsCheckbox = [...document.querySelectorAll('.addons input[type="checkbox"')]
    let DOMtrainingsModule = document.getElementById('module-6')
    let DOMbukPlayAddon = document.getElementById('addon-7')
    let addons = addonsCheckbox.filter(a => a.checked)
    let names = addons.map(e => e.name)
    let searcher = this.searchAddons(names)
    let sumFactors = Number(searcher.reduce((prev, acum) => prev + acum, 0).toFixed(2))
    this.factorsAddonsSelected = searcher
    // En caso de que Capacitaciones no este true pero BukPlay si este true restar el factor de Bukplay
    if (!DOMtrainingsModule.checked && DOMbukPlayAddon.checked) {
      return sumFactors - 0.8
    } else {
      return sumFactors
    }

  }

  addModule() {
    let modulesCheckbox = [...document.querySelectorAll('.modules input[type="checkbox"')]
    let modules = modulesCheckbox.filter(m => m.checked)
    this.amountModules = modules.length + this.baseValues.module
    // console.log(this.amountModules)
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
    // return input.indexOf(module.name) !== -1
    let factorValues = matches.map(e => e.factor)
    return factorValues
  }

  searchAddons(input) {
    const VALUEADDONS = [
      { name: 'a-work', factor: 0.1 },
      { name: 'a-trat', factor: 0.1 },
      { name: 'a-hono', factor: 0.1 },
      { name: 'a-ilme', factor: calcFactorLME() },
      { name: 'a-sso', factor: 0.1 },
      { name: 'a-api', factor: 0.1 },
      { name: 'a-play', factor: 0.8 },
    ]
    let matches = VALUEADDONS.filter(addon => input.includes(addon.name))
    let factorsValues = matches.map(e => e.factor)
    return factorsValues
  }

  minPrice() {
    const basePeopleManagment = 2.3
    const priceForModule = 0.1
    // Se aplica - 1 pq dentro del valor basePeopleManagment va el valor basica, sobrando un módulo si se toma en cuenta el valor this.amountModules
    let calcMinPrice = Number((basePeopleManagment + (priceForModule * (this.amountModules - 1))).toFixed(2))
    console.log('Min Price: ', calcMinPrice)
    return calcMinPrice
  }

  additionalAmount() {
    try {
      let numEmployees = document.getElementById('n-colab').value
      let initSearchAdditional = 100
      let overLastRange = 20001
      if (numEmployees <= initSearchAdditional) {
        // console.log('colab: ', parseInt(numEmployees))
        return parseInt(numEmployees)
      }
      else if (numEmployees > initSearchAdditional && numEmployees < overLastRange) {
        // retorna la cantidad adicional, que es la diferencia entre el rango anterior y el rango ingresado en el input numero de colaboradores
        let range = this.tableAdditional.table.findIndex(r => this.betweenRange(r.start, r.end, numEmployees, r))
        let previusRange = range - 1
        let additionalEndValue = this.tableAdditional.table[previusRange].end
        let additionalAmount = numEmployees - additionalEndValue
        // console.log('rango: ', range)
        // console.log('rango anterior: ', additionalEndValue)
        return additionalAmount
      } else {
        // retorna el valor de la cantidad adicional del último rango
        // console.log('last: ', this.tableAdditional.table[this.tableAdditional.table.length - 1].end)
        return this.tableAdditional.table[this.tableAdditional.table.length - 1].end
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
        // console.log('Rango base: ', range)
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
      let lastRange = this.tableAdditional.table[this.tableAdditional.table.length - 1]
      if (numEmployees <= lastRange.end) {
        let range = this.tableAdditional.table.find(r => this.betweenRange(r.start, r.end, numEmployees, r))
        // console.log('Rango Adiccional: ', range)
        return range.additional
      } else {
        return lastRange.additional
      }
    } catch (err) {
      console.error(err)
    }
  }

  discount() {
    let findDiscount = this.tableDiscounts.table.find(m => m.totalModules == this.amountModules)
    console.log('Descuento:', findDiscount)
    let price = this.calcPrice()
    let percent = findDiscount.percent
    let getPercent = percent / 100
    let priceWithDiscount = price - (price * getPercent)
    // let factorWithDiscount = this.amountFactors - (this.amountFactors * getPercent)
    // this.amountFactors = factorWithDiscount
    this.displayPreviousPrice(price, percent)
    return priceWithDiscount
  }

  calcPrice() {
    let basisCost = this.basisCostRange()
    let additionalCost = this.additionalCostRange()
    let additionalAmount = this.additionalAmount()
    let price = (additionalCost * additionalAmount + basisCost) * this.amountFactors
    console.log('Price Total: ', price)
    console.log('CANTIDAD ADICIONAL: ', additionalAmount)
    return price
  }

  displayPrice (amount) {
    let DOMprice = document.getElementById('price')
    let DOMpriceMobile = document.getElementById('price-mobile')
    DOMprice.textContent = amount.toFixed(2)
    DOMpriceMobile.textContent = amount.toFixed(2)
  }

  displayPreviousPrice (amount, discount) {
    let DOMpreviousPrice = document.getElementById('previous-price')
    let DOMpreviousPriceMobile = document.getElementById('previous-price-mobile')
    let DOMbadgePrice = [...document.querySelectorAll('.discount-percent')]
    DOMpreviousPrice.textContent = amount.toFixed(2)
    DOMpreviousPriceMobile.textContent = amount.toFixed(2)
    DOMbadgePrice.forEach(item => item.textContent = `${discount}%`)
  }

  handlerDOMactions () {
    let DOMpreviousPriceBlock = [...document.querySelectorAll('.price__without-discount')]
    let DOMattainModules = document.getElementById('modules-attain')
    let DOMdiscountAlertBlock = document.getElementById('discount-alert')
    let DOMdiscounMessageBlock = document.getElementById('discount-message')
    let DOMbadgeBlock = [...document.querySelectorAll('.price__badge')]
    let DOMmodulePlurOrSing = document.getElementById('plur-or-sing')
    let DOMtrainingsModule = document.getElementById('module-6')
    let DOMbukPlayAddon = document.getElementById('addon-7')
    
    let startDiscount = this.tableDiscounts.table[0].totalModules
    let modulesToGetDiscount = (startDiscount - this.amountModules)
    
    if (this.amountModules >= startDiscount) {
      DOMpreviousPriceBlock.forEach(item => item.classList.remove('ds-none'))
      DOMdiscounMessageBlock.classList.remove('ds-none')
      DOMbadgeBlock.forEach(item => item.classList.remove('ds-none'))
      DOMdiscountAlertBlock.classList.add('ds-none')
    } else {
      DOMpreviousPriceBlock.forEach(item => item.classList.add('ds-none'))
      DOMattainModules.textContent = modulesToGetDiscount
      modulesToGetDiscount != 1 ? DOMmodulePlurOrSing.textContent = 'Módulos' : DOMmodulePlurOrSing.textContent = 'Módulo'
      DOMdiscounMessageBlock.classList.add('ds-none')
      DOMbadgeBlock.forEach(item => item.classList.add('ds-none'))
      DOMdiscountAlertBlock.classList.remove('ds-none')
    }

    if (DOMtrainingsModule.checked) {
      DOMbukPlayAddon.parentElement.parentElement.classList.remove('ds-none')
    } else {
      DOMbukPlayAddon.parentElement.parentElement.classList.add('ds-none')
    }

  }

  hideDOMblocks () {
    let DOMpreviousPriceBlock = document.getElementById('whithout-discount')
    let DOMdiscountAlertBlock = document.getElementById('discount-alert')
    let DOMdiscounMessageBlock = document.getElementById('discount-message')
    let DOMtrainingsModule = document.getElementById('module-6')
    let DOMbukPlayAddon = document.getElementById('addon-7')
    
    DOMpreviousPriceBlock.classList.add('ds-none')
    DOMdiscountAlertBlock.classList.add('ds-none')
    DOMdiscounMessageBlock.classList.add('ds-none')

    if (DOMtrainingsModule.checked) {
      DOMbukPlayAddon.parentElement.parentElement.classList.remove('ds-none')
    } else {
      DOMbukPlayAddon.parentElement.parentElement.classList.add('ds-none')
    }
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
  tableAdditional: tableAdditional,
  tableDiscounts: tableDiscounts
})

// Posible solución para agregar los factores dinamicamente:
// crear un Array con objetos llave valor del name del módulo y el valor del factor
// Luego hacer match con los módulos y addons seleccionados
// guardando en un Array los valores que estén checked y hacer
// la comparación, si los elementos seleccionados están en el Array
// maestro de comparación, que tiene los objetos llave valor de los
// names y de los factores
// Posteriormente rescatamos el valor de cada factor que contengan los
// elementos que hagan match y los sumamos