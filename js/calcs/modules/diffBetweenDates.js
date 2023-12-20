
function diffDates (startDate, endDate) {
  let start = moment(startDate)
  let end = moment(endDate)

  let years = end.diff(start, 'years')
  let amountMonths = end.diff(start, 'months')
  start.add(years, 'years')
  let months = end.diff(start, 'months')
  start.add(months, 'months')
  let days = end.diff(start, 'days')

  return {
    years,
    months,
    amountMonths,
    days
  }
}

export { diffDates }