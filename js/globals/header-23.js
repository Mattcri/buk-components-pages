const btnCountries = [...document.querySelectorAll('.buk-countries')]


btnCountries.forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.toggle('show')
    // console.log(this)
  })
})

document.addEventListener('click', function(event) {
  if (!event.target.closest('.buk-countries')) {
    btnCountries.forEach(btn => btn.classList.remove('show'))
  }
})

document.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    btnCountries.forEach(btn => btn.classList.remove('show'))
  }
})