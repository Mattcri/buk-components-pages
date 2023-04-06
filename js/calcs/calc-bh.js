
class TableBuilder {
  constructor(table) {
    this.table = table
  }
}

const tableError = new TableBuilder([
  { from: 1, till: 20, error: 0, mt: 0, category: 'Pequeña' },
  { from: 21, till: 100, error: 7, mt: -0.025, category: 'Pequeña' },
  { from: 101, till: 500, error: 5, mt: 0, category: 'Mediana' },
  { from: 501, till: 1000000, error: 5, mt: 0, category: 'Grande' },
])

class calcBuilder {
  constructor({
    tableError,
    Zvalue = 2.706025,
    Pvalue = 0.5,
  }) {
    this.tableError = tableError
    this.Zvalue = Zvalue
    this.Pvalue = Pvalue
  }

  run() {
    const colab = document.getElementById('num-colab').value
    if (colab == 0) {
      alert('Ingresar el número de colaboradores de tu empresa')
    }
    else if (colab > 1000000) {
      alert('El número máximo de colaboradores para el estudio BH debe ser menor o igual a 1000000. Por favor, ingresar un número valido')
    }
    else {
      this.calcSample()
    }
  }

  CalcPQ() {
    return this.Pvalue * (1 - this.Pvalue)
  }

  calcSample() {
    const DOMsample = document.getElementById('min-sample')
    const DOMpercent = document.getElementById('percent-colab')
    const DOMcategory = document.getElementById('cop-category')
    
    const colab = document.getElementById('num-colab').value
    let range = this.tableError.table.find(e => this.searchRangeError(e.from, e.till, colab, e))
    console.log('Rango: ', range)

    let rangeError = (range.error / 100)
    let rangeCategory = range.category
    // console.log('Error: ', rangeError)

    // Intermediate values
    let deltaColabTmin = colab - range.from
    let mt = range.mt / 100
    let errorVariable = Number( (rangeError + mt * deltaColabTmin).toFixed(3) )
    console.log('Error: ', errorVariable)

    let numerator = (colab * this.Zvalue * this.CalcPQ())
    console.log('Numerador: ', numerator)
    let denominator = ( Math.pow(errorVariable, 2) *  (colab - 1) ) + (this.Zvalue * this.CalcPQ())
    console.log('Denominador: ', denominator)
    let result = Math.round(numerator / denominator)
    console.log('Resultado: ', result)
    let percent = Number( ((result / colab) * 100).toFixed(2) )

    this.displayValue(DOMsample, result)
    this.displayValue(DOMpercent, `${percent} %`)
    this.displayValue(DOMcategory, rangeCategory)

  }

  searchRangeError(from, till, employees, obj) {
    if (employees >= from && employees <= till) return obj
  }

  displayValue(domId, value, ) {
    domId.setAttribute('value', value)
  }
}

const sample = new calcBuilder({
  tableError: tableError
})

console.log(tableError)
console.log(sample)