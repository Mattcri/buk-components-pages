function additionalAdelantosCO() {
  const numEmployees = document.getElementById('n-colab').value
  return 8500 * numEmployees
}

const coFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

class TableBuilder {
  constructor(table) {
    this.table = table
  }
}

const tableBase = new TableBuilder([
  { 'start': 1, 'end': 100, 'base': 0 },
  { 'start': 101, 'end': 500, 'base': 509040 },
  { 'start': 501, 'end': 1000, 'base': 1708112 },
  { 'start': 1001, 'end': 2500, 'base': 2977884 },
  { 'start': 2501, 'end': 5000, 'base': 6736296 },
  { 'start': 5001, 'end': 7500, 'base': 11317656 },
  { 'start': 7501, 'end': 10000, 'base': 15602076 },
  { 'start': 10001, 'end': 15000, 'base': 19886496 },
  { 'start': 15001, 'end': 20000, 'base': 28455336 }
])

const tableAdditional = new TableBuilder([
  { 'start': 1, 'end': 100, 'additional': 5090 },
  { 'start': 101, 'end': 500, 'additional': 2998 },
  { 'start': 501, 'end': 1000, 'additional': 2540 },
  { 'start': 1001, 'end': 2500, 'additional': 2506 },
  { 'start': 2501, 'end': 5000, 'additional': 1833 },
  { 'start': 5001, 'end': 7500, 'additional': 1714 },
  { 'start': 7501, 'end': 10000, 'additional': 1714 },
  { 'start': 10001, 'end': 15000, 'additional': 1714 },
  { 'start': 15001, 'end': 20000, 'additional': 1538 }
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

class PricingBuilder {
  constructor({
    tableBase,
    tableAdditional,
    tableDiscounts,
    baseValues = {},
    amountAddons = 0,
    amountModules = 0,
    amountFactors = 0,
    factorsModulesSelected = 0,
    factorsAddonsSelected = 0
  }) {
    this.tableBase = tableBase
    this.tableAdditional = tableAdditional
    this.tableDiscounts = tableDiscounts
    this.baseValues = baseValues
    this.amountAddons = amountAddons
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
    this.addAddon()


    let minPrice = this.minPrice()
    let calcPrice = this.calcPrice()

    if (minPrice > calcPrice) {
      this.hideDOMblocks()
      this.displayPrice(minPrice)
    } else {
      this.handlerDOMactions()
      this.displayPrice(calcPrice)
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
    modulesCheckbox.forEach(m => m.checked ? m.previousElementSibling.style.fontWeight = "600" : m.previousElementSibling.style.fontWeight = "400")
    modulesCheckbox.forEach(m => m.checked ? m.classList.add('selected') : m.classList.remove('selected'))
  }

  addAddon() {
    let addonsCheckbox = [...document.querySelectorAll('.addons input[type="checkbox"')]
    let addons = addonsCheckbox.filter(a => a.checked)
    this.amountAddons = addons.length
    addonsCheckbox.forEach(a => a.checked ? a.previousElementSibling.style.fontWeight = "600" : a.previousElementSibling.style.fontWeight = "400")
    addonsCheckbox.forEach(a => a.checked ? a.classList.add('selected') : a.classList.remove('selected'))
  }

  searchModules(input) {
    const VALUEMODULES = [
      { name: 'm-remu', factor: 1 },
      // { name: 'm-asist', factor: 0.8 },
      { name: 'm-firma', factor: 0.26 },
      { name: 'm-adela', factor: 1 },
      { name: 'm-desep', factor: 0.6 },
      { name: 'm-capac', factor: 0.62 },
      { name: 'm-comun', factor: 0.28 },
      { name: 'm-benef', factor: 0.3 },
      { name: 'm-encue', factor: 0.2 },
      { name: 'm-selec', factor: 0.6 },
      { name: 'm-onboa', factor: 0.22 }
    ]
    let matches = VALUEMODULES.filter(module => input.includes(module.name))
    // return input.indexOf(module.name) !== -1
    let factorValues = matches.map(e => e.factor)
    return factorValues
  }

  searchAddons(input) {
    const VALUEADDONS = [
      { name: 'a-work', factor: 0.1 },
      // { name: 'a-trat', factor: 0.1 },
      // { name: 'a-hono', factor: 0.1 },
      // { name: 'a-ilme', factor: calcFactorLME() },
      { name: 'a-sso', factor: 0.1 },
      { name: 'a-api', factor: 0.1 },
      { name: 'a-play', factor: 0.8 },
      { name: 'a-svcola', factor: 0.3 }
    ]
    let matches = VALUEADDONS.filter(addon => input.includes(addon.name))
    let factorsValues = matches.map(e => e.factor)
    return factorsValues
  }

  minPrice() {
    const basePeopleManagment = 361984
    const priceForModule = 22624
    // Se aplica - 1 pq dentro del valor basePeopleManagment va el valor basico, sobrando un módulo si se toma en cuenta el valor this.amountModules
    let calcMinPrice = Number(( basePeopleManagment + (priceForModule * (this.amountModules - 1 + this.amountAddons)) ))
    console.log('Min Price: ', calcMinPrice)
    if (document.getElementById('module-4').checked == true) {
      return calcMinPrice + additionalAdelantosCO()
    } else {
      return calcMinPrice
    }
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
    return priceWithDiscount
  }

  calcPrice() {
    let basisCost = this.basisCostRange()
    let additionalCost = this.additionalCostRange()
    let additionalAmount = this.additionalAmount()
    let price = (additionalCost * additionalAmount + basisCost) * this.amountFactors
    console.log('Price Total: ', price)
    console.log('CANTIDAD ADICIONAL: ', additionalAmount)
    console.log(document.getElementsByName('m-adela'))
    if (document.getElementById('module-4').checked == true) {
      return price + additionalAdelantosCO()
    } else {
      return price
    }
  }

  displayPrice(amount) {
    let DOMprice = document.getElementById('price')
    let DOMpriceMobile = document.getElementById('price-mobile')
    DOMprice.textContent = coFormatter.format(amount)
    DOMpriceMobile.textContent = coFormatter.format(amount)
  }

  displayPreviousPrice(amount, discount) {
    let DOMpreviousPrice = document.getElementById('previous-price')
    let DOMpreviousPriceMobile = document.getElementById('previous-price-mobile')
    let DOMbadgePrice = [...document.querySelectorAll('.discount-percent')]
    DOMpreviousPrice.textContent = coFormatter.format(amount)
    DOMpreviousPriceMobile.textContent = coFormatter.format(amount)
    DOMbadgePrice.forEach(item => item.textContent = `${discount}%`)
  }

  handlerDOMactions() {
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

  hideDOMblocks() {
    let DOMpreviousPriceBlock = [...document.querySelectorAll('.price__without-discount')]
    let DOMdiscountBadge = [...document.querySelectorAll('.price__badge')]
    let DOMdiscountAlertBlock = document.getElementById('discount-alert')
    let DOMdiscounMessageBlock = document.getElementById('discount-message')
    let DOMtrainingsModule = document.getElementById('module-6')
    let DOMbukPlayAddon = document.getElementById('addon-7')

    DOMdiscountBadge.forEach(item => item.classList.add('ds-none'))
    DOMpreviousPriceBlock.forEach(item => item.classList.add('ds-none'))
    DOMdiscountAlertBlock.classList.add('ds-none')
    DOMdiscounMessageBlock.classList.add('ds-none')

    if (DOMtrainingsModule.checked) {
      DOMbukPlayAddon.parentElement.parentElement.classList.remove('ds-none')
    } else {
      DOMbukPlayAddon.parentElement.parentElement.classList.add('ds-none')
    }
  }

  betweenRange(start, end, employees, obj) {
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
