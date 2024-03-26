function days360(startDate, endDate, method) {
  let startDay = startDate.getDate();
  let startMonth = startDate.getMonth() + 1;
  let startYear = startDate.getFullYear();
  let endDay = endDate.getDate();
  let endMonth = endDate.getMonth() + 1;
  let endYear = endDate.getFullYear();
  let methodType;

  if (method === undefined) {
    methodType = 0;
  } else {
    methodType = method;
  }

  if (methodType === 0) {
    if (startDay === 31 || (endDay === 31 && startDay >= 30)) {
      startDay = 30;
      endDay = 30;
    } else if (startDay === 30 && endDay === 31) {
      endDay = 30;
    }
  } else if (methodType === 1) {
    if (startDay === 31) {
      startDay = 30;
    }
    if (endDay === 31) {
      endDay = 30;
    }
  }

  let years = endYear - startYear;
  let months = endMonth - startMonth;
  let days = endDay - startDay;

  if (days < 0) {
    months--;
    if (methodType === 0) {
      if (startDay === 30 || startDay === 31) {
        days += 30;
      } else {
        days += 31;
      }
    } else {
      days += 30;
    }
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return (years * 360) + (months * 30) + days;
}

function days360v2(startDate, endDate) {
  let start = moment(startDate)
  let end = moment(endDate)

  let amountMonths = end.diff(start, 'months')
  // let amountMonthsSub1 = prevMonth.diff(start, 'months')
  console.log('cantidad de meses: ', amountMonths)
  let subtractMonth = amountMonths > 0 ? amountMonths-- : amountMonths
  console.log('cantidad de meses - 1: ',  amountMonths)
  
  start.add(subtractMonth, 'months')
  let calcPreviousDays = subtractMonth * 30
  let days = end.diff(start, 'days')

  return days + calcPreviousDays

}

export { days360, days360v2 }