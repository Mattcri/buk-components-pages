const btnCountries = [...document.querySelectorAll('.buk-countries')]
const btnCollapseMenuMobile = document.getElementById('btn-collapse')
const btnDropdown = [...document.querySelectorAll('.nav__item button')]
const itemsDropdown = [...document.querySelectorAll('nav .nav__item--dropdown')]
const submenu = [...document.querySelectorAll('nav .nav__submenu')]

const mql = window.matchMedia('(min-width:1115px)')

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

btnCollapseMenuMobile.addEventListener('click', function () {
  this.classList.toggle('open-collapse')
  if (this.classList.contains('open-collapse')) {
    document.querySelector('body').classList.add('non-scroll')
  } else {
    document.querySelector('body').classList.remove('non-scroll')
  }
})

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

    // setTimeout(() => {
      
    // }, 400)

    this.classList.toggle('active')
    this.nextElementSibling.classList.toggle('open')
    this.parentElement.classList.toggle('item-selected')

    if (button.classList.contains('active')) {
      this.nextElementSibling.style.height = `${heightSubmenu}px`
    }

  })
})

if(mql.matches) {
  // itemsDropdown.forEach((item) => {
  //   item.addEventListener('mouseenter', function () {
  //     let activeItem = document.querySelector('.nav__item.item-selected')
  //     let heightSubmenu = item.firstElementChild.nextElementSibling.scrollHeight
  
  //     btnDropdown.forEach(btn => btn.nextElementSibling.style.height = '0px')
  
  //     if (activeItem && activeItem !== item) {
  //       activeItem.classList.remove('item-selected')
  //       activeItem.firstElementChild.classList.remove('active')
  //       activeItem.firstElementChild.nextElementSibling.classList.remove('open')
  //     }
  
  //     setTimeout(() => {
  //       this.classList.add('item-selected')
  //       this.firstElementChild.classList.add('active')
  //       this.firstElementChild.nextElementSibling.classList.add('open')

  //       if (item.firstElementChild.classList.contains('active')) {
  //         this.firstElementChild.nextElementSibling.style.height = `${heightSubmenu}px`
  //       }
  //     }, 300)
  
      
  //   })
  // })

  btnDropdown.forEach((button) => {
    button.addEventListener('mouseenter', function () {
      let activeButton = document.querySelector('.nav__item button.active')
      let heightSubmenu = button.nextElementSibling.scrollHeight

      btnDropdown.forEach(btn => btn.nextElementSibling.style.height = '0px')

      if (activeButton && activeButton !== button) {
        activeButton.classList.remove('active')
        activeButton.nextElementSibling.classList.remove('open')
        activeButton.parentElement.classList.remove('item-selected')
      }

      setTimeout(() => {
        this.classList.toggle('active')
        this.nextElementSibling.classList.toggle('open')
        this.parentElement.classList.toggle('item-selected')

        if (button.classList.contains('active')) {
          this.nextElementSibling.style.height = `${heightSubmenu}px`
        }
      }, 300)

    })
  })

  submenu.forEach((menu) => {
    menu.addEventListener('mouseleave', function() {
      console.log('out');
      menu.style.height = '0px'
      menu.classList.remove('open')
      menu.parentElement.classList.remove('item-selected')
      menu.previousElementSibling.classList.remove('active')
    })
  })

}

