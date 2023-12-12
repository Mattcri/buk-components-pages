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