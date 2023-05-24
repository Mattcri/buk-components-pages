// import { data } from './dataTable.js'

class Validator {
  constructor() {}

  isInRangeDate(date, startDate, endDate) {
    return date >= startDate && date <= endDate
  }


}

export { Validator }