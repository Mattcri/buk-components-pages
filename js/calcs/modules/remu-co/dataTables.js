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

export { upperLimit }