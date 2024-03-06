class TableBuilder {
  constructor(table) {
    this.table = table
  }
}

const ISRdataMonth = new TableBuilder([
  { lowerLimit: 0.01, upperLimit: 746.04, fixedFee: 0, overExc: 1.92 },
  { lowerLimit: 746.05, upperLimit: 6332.05, fixedFee: 14.32, overExc: 6.40 },
  { lowerLimit: 6332.06, upperLimit: 11128.01, fixedFee: 371.83, overExc: 10.88 },
  { lowerLimit: 11128.02, upperLimit: 12935.82, fixedFee: 893.63, overExc: 16 },
  { lowerLimit: 12935.83, upperLimit: 15487.71, fixedFee: 1182.88, overExc: 17.92 },
  { lowerLimit: 15487.72, upperLimit: 31236.49, fixedFee: 1640.18, overExc: 21.36 },
  { lowerLimit: 31236.50, upperLimit: 49233.00, fixedFee: 5004.12, overExc: 23.52 },
  { lowerLimit: 49233.01, upperLimit: 93993.90, fixedFee: 9236.89, overExc: 30 },
  { lowerLimit: 93993.91, upperLimit: 125325.20, fixedFee: 22665.17, overExc: 32 },
  { lowerLimit: 125325.21, upperLimit: 375975.61, fixedFee: 32691.18, overExc: 34 }
])

export { ISRdataMonth }