const btnCollapseMenuMobile = document.getElementById('btn-collapse-mobile')
const btnDropdown = [...document.querySelectorAll('.nav__item button')]
const itemsDropdown = [...document.querySelectorAll('nav .nav__item--dropdown')]
const submenu = [...document.querySelectorAll('nav .nav__submenu')]

const mql = window.matchMedia('(max-width:1020px)')

btnCollapseMenuMobile.addEventListener('click', function () {
  this.classList.toggle('open-collapse')
  if (this.classList.contains('open-collapse')) {
    document.querySelector('body').classList.add('non-scroll')
  } else {
    document.querySelector('body').classList.remove('non-scroll')
  }
})

if (mql.matches) {
  btnDropdown.forEach((button) => {
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
}