
class TableData {
  constructor(table) {
    this.table = table
  }
}

const data = new TableData([
  { period: 'julio-2023', startDevengue: '2023-01-01', endDevengue: '2023-06-30' },
  { period: 'diciembre-2023', startDevengue: '2023-07-01', endDevengue: '2023-12-31' },
  { period: 'julio-2024', startDevengue: '2024-01-01', endDevengue: '2023-06-30' },
  { period: 'diciembre-2024', startDevengue: '2024-07-01', endDevengue: '2024-12-31' },
  { period: 'julio-2025', startDevengue: '2025-01-01', endDevengue: '2025-06-30' },
  { period: 'diciembre-2025', startDevengue: '2025-07-01', endDevengue: '2025-12-31' },
])

export {data}