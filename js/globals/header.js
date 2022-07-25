window.onload = () => {
  // Mobile menu functions
  const btnMobile = document.getElementById('btn-mobile')
  const header = document.querySelector('header')
  const mainContent = document.querySelector('main')
  const mobileCtaFirst = document.querySelector('.buk-cta__button--btn1')
  const linkDropdown = Array.from(document.getElementsByClassName('buk-menu__link--dropdown'))
  const mql = window.matchMedia('(max-width:1020px)')

  btnMobile.addEventListener('click', () => {
    btnMobile.classList.toggle('show-menu')
    btnMobile.classList.contains('show-menu')
      ? mainContent.classList.add('bg-shadow')
      : mainContent.classList.remove('bg-shadow')
  })

  // Open sub-menu
  if (mql.matches) {
    linkDropdown.forEach((item) => {
      item.addEventListener('click', function () {
        this.firstElementChild.classList.toggle('open')
        this.parentElement.classList.toggle('show-submenu')
      })
    })

    mobileCtaFirst.addEventListener('click', () => {
      btnMobile.classList.remove('show-menu')
    })
  }

  // Convert header to sticky
  window.addEventListener('scroll', () => {
    window.scrollY > 25
      ? header.classList.add('sticky')
      : header.classList.remove('sticky')
  })


}