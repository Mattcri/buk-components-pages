const btnCollapse = document.getElementById('btn-collapse')
const menuOptions = document.getElementById('menu-options')
const arrowCategories = document.querySelector('#btn-collapse .categories-button__arrow')
const getButtonsNodeList = document.querySelectorAll('#menu-options li button')
const dataCategoriesTargetNodeList = document.querySelectorAll('[data-categories-target]')
const dataCategoriesContentNodeList = document.querySelectorAll('[data-categories-content]')


const buttonsToArray = [...getButtonsNodeList]
const dataTargets = [...dataCategoriesTargetNodeList]
const dataContent = [...dataCategoriesContentNodeList]
const categoriesItems = Array.from(document.getElementsByClassName('categories-menu__item'))
const heightMenuOptions = menuOptions.scrollHeight



btnCollapse.addEventListener('click', () => {
  menuOptions.classList.toggle('show')
  menuOptions.classList.contains('show')
    ? actionsWithShowMenu()
    : actionsHiddenMenu()
})

const actionsWithShowMenu = () => {
  arrowCategories.classList.add('rotate')
  menuOptions.style.height = `${heightMenuOptions}px`
}

const actionsHiddenMenu = () => {
  arrowCategories.classList.remove('rotate')
  menuOptions.style.height = "0px"
}

buttonsToArray.forEach(button => {
  button.addEventListener('click', function () {
    menuOptions.classList.remove('show')
    menuOptions.style.height = "0px"
    arrowCategories.classList.remove('rotate')

    let getTargetId = this.dataset.categoriesTarget.slice(1)
    let target = document.getElementById(getTargetId)
    let getButtonText = this.children[1].textContent
    
    dataContent.forEach(content => content.classList.remove('target-active'))

    buttonsToArray.forEach(item => item.parentElement.classList.remove('target-selected'))

    target.classList.add('target-active')
    button.parentElement.classList.add('target-selected')
    btnCollapse.children[1].textContent = getButtonText
    console.log(getTargetId);
    console.log(target);
    console.log(getButtonText);
  })
})

// Show the first content
dataContent[0].classList.add('target-active')
categoriesItems[0].classList.add('target-selected')



console.log(getButtonsNodeList);