class TableBuilder {
  constructor(table) {
    this.table = table
  }
}

const upperLimit = new TableBuilder([
  { 'limit': 4640000, 'pct': 0, 'solidarity': 0, 'subsistence': 0 },
  { 'limit': 18560000, 'pct': 1, 'solidarity': 0.5, 'subsistence': 0.5 },
  { 'limit': 19720000, 'pct': 1.2, 'solidarity': 0.5, 'subsistence': 0.7 },
  { 'limit': 20880000, 'pct': 1.4, 'solidarity': 0.5, 'subsistence': 0.9 },
  { 'limit': 22040000, 'pct': 1.6, 'solidarity': 0.5, 'subsistence': 1.1 },
  { 'limit': 23200000, 'pct': 1.8, 'solidarity': 0.5, 'subsistence': 1.3 }
  // { 'upperLimit': 23200000, 'pct': 2, 'solidarity': 0.5, 'subsistence': 1.5 },
])

const retentionTable = new TableBuilder([
  { 'rangeSt': 0, 'rangeEd': 95, 'marginalRate': 0, 'basePay': 0 },
  { 'rangeSt': 95, 'rangeEd': 150, 'marginalRate': 19, 'basePay': 0 },
  { 'rangeSt': 150, 'rangeEd': 360, 'marginalRate': 28, 'basePay': 10 },
  { 'rangeSt': 360, 'rangeEd': 640, 'marginalRate': 33, 'basePay': 69 },
  { 'rangeSt': 640, 'rangeEd': 945, 'marginalRate': 35, 'basePay': 162 },
  { 'rangeSt': 945, 'rangeEd': 2300, 'marginalRate': 37, 'basePay': 268 },
  { 'rangeSt': 2300, 'rangeEd': 10000, 'marginalRate': 39, 'basePay': 770 },
])

export { upperLimit, retentionTable }