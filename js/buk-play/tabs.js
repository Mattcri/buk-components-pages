const btnCollapse = document.getElementById('btn-collapse')
const menuOptions = document.getElementById('menu-options')

btnCollapse.addEventListener('click', () => {
  menuOptions.classList.toggle('show')
})