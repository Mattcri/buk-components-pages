const acc = [...document.getElementsByClassName("button-large ")];
acc.forEach(item => {
  item.addEventListener('click', function () {
    let active = document.querySelector(".button-large.active")
    let mql = window.matchMedia('(min-width:1020px)')
    if (active && active != this && mql.matches) {
      active.classList.remove("active");
      active.nextElementSibling.classList.remove("show");
    }
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");
  })
})

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.button-large.button-large__color').click()
})

const btn = document.getElementById('btn-calc-finiquito')

btn.addEventListener('click', () => {
  const d1 = new Date(`${document.getElementById('date-admission').value}T00:00:00`)
  const d2 = new Date(`${document.getElementById('end-contract-date').value}T00:00:00`)
  let dc1 = moment(d1)
  let dc2 = moment(d2)
  let diff = moment.preciseDiff(d1, d2, true)
  console.log('moment dif: ', diff)
  // console.log(d2);
  console.log('-------');
  console.log('years: ', diff.years);
  console.log('months: ', diff.months);
  console.log('-------');

  // let years = d2.diff(dc1, 'years')
  // dc1.add(years, 'years')
  // let months = d2.diff(dc1, 'months')
  // dc1.add(months, 'months')
  // let days = d2.diff(dc1, 'days')

  let objDate = diffDates(d1, d2)
  console.log(objDate)

})

function diffDates(startDate, endDate) {
  let start = moment(startDate)
  let end = moment(endDate)

  let years = end.diff(start, 'years')
  start.add(years, 'years')
  let months = end.diff(start, 'months')
  start.add(months, 'months')
  let days = end.diff(start, 'days')

  return {
    years,
    months,
    days
  }
}

// var m1 = moment('01-02-2010 00:00:00');
// var m2 = moment('30-11-2023 00:00:00');
// var diff = moment.preciseDiff(m1, m2);
// console.log(diff)