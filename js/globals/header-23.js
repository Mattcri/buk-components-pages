const btnCountries = [...document.querySelectorAll('.buk-countries')]
const btnCollapse = document.getElementById('btn-collapse')
const btnDropdown = [...document.querySelectorAll('.nav__item button')]

const mql = window.matchMedia('(max-width:1020px)')

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

btnCollapse.addEventListener('click', function () {
  this.classList.toggle('open-collapse')
  if (this.classList.contains('open-collapse')) {
    document.querySelector('body').classList.add('non-scroll')
  } else {
    document.querySelector('body').classList.remove('non-scroll')
  }
})

btnDropdown.forEach((button, index) => {
  // console.log(index, item)
  button.addEventListener('click', function () {
    let activeButton = document.querySelector('.nav__item button.active')
    let heightSubmenu = button.nextElementSibling.scrollHeight

    btnDropdown.forEach(btn => btn.nextElementSibling.style.height = '0px')
    
    if (activeButton && activeButton !== button) {
      activeButton.classList.remove('active')
      activeButton.nextElementSibling.classList.remove('open')
      // activeButton.nextElementSibling.style.height = '0px'
      activeButton.parentElement.classList.remove('item-selected')
    }

    this.classList.toggle('active')
    this.nextElementSibling.classList.toggle('open')
    this.parentElement.classList.toggle('item-selected')
    
    if (button.classList.contains('active')) {
      this.nextElementSibling.style.height = `${heightSubmenu}px`
    }


  })
})