import { CalcLiquidaciones } from "./calc.js"

const calc = new CalcLiquidaciones({})

class Director {

  calculateLiquidation () {
    let salary = Number(document.getElementById('salary').value)
    let contractType = document.getElementById('contract-type').value
    let withdrawalReason = document.getElementById('withdrawal-reason').value
    let daysNotWorked = Number(document.getElementById('days-not-worked').value)

    let startContractDate = new Date(`${document.getElementById('start-contract-date').value}T00:00:00`)
    let layoffDate = new Date(`${document.getElementById('layoff-date').value}T00:00:00`)
    let endFixedDate = new Date(`${document.getElementById('end-contract-fixed-date').value}T00:00:00`)

    calc.rsltLiquidationDays(startContractDate, layoffDate, daysNotWorked)
    calc.rsltInitPrima(layoffDate)
    calc.rsltInitLayoff(layoffDate, daysNotWorked)
    calc.rsltCompensationDays(salary, withdrawalReason, contractType, startContractDate, layoffDate, endFixedDate, daysNotWorked)
    calc.logRslt()


  }

}

export { Director }