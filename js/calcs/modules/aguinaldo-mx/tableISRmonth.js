class TableBuilder {
  constructor(table) {
    this.table = table
  }
}

const ISRdataMonth = new TableBuilder([
  { lowerLimit: 0.01, upperLimit: 644.58, fixedFee: 0, overExc: 1.92},
  { lowerLimit: 644.59, upperLimit: 5470.92, fixedFee: 12.38, overExc: 6.40},
  { lowerLimit: 5470.93, upperLimit: 9614.66, fixedFee: 321.26, overExc: 10.88},
  { lowerLimit: 9614.67, upperLimit: 11176.62, fixedFee: 772.1, overExc: 16},
  { lowerLimit: 11176.63, upperLimit: 13381.47, fixedFee: 1022.01, overExc: 17.92},
  { lowerLimit: 13381.48, upperLimit: 26988.50, fixedFee: 1417.12, overExc: 21.36},
  { lowerLimit: 26988.51, upperLimit: 42537.58, fixedFee: 4323.58, overExc: 23.52},
  { lowerLimit: 42537.59, upperLimit: 81211.25, fixedFee: 7980.73, overExc: 30},
  { lowerLimit: 81211.26, upperLimit: 108281.67, fixedFee: 19582.83, overExc: 32},
  { lowerLimit: 108281.68, upperLimit: 324845.01, fixedFee: 28245.36, overExc: 34}
])

export { ISRdataMonth }