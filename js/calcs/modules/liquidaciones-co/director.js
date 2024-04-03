import { CalcLiquidaciones } from "./calc.js"

const calc = new CalcLiquidaciones({})

class Director {

  calculateLiquidation () {
    let startContractDate = new Date(`${document.getElementById('start-contract-date').value}T00:00:00`)
    let layoffDate = new Date(`${document.getElementById('layoff-date').value}T00:00:00`)

    let daysNotWorked = Number(document.getElementById('days-not-worked').value)

    calc.rsltLiquidationDays(startContractDate, layoffDate, daysNotWorked)
    calc.rsltInitPrima(layoffDate)
    calc.rsltInitLayoff(layoffDate, daysNotWorked)
    calc.logRslt()


  }

}

export { Director }