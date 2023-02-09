const btnOptions = [...document.querySelectorAll("button[data-target-solution]")]
const solutionContent =[...document.querySelectorAll('[data-solution]')]
const solutions = document.getElementById('solutions-content')

const observerOpt = {
  rootMargin: '0px 0px 0px 0px',
  threshold: .18
}

const observerVoid = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const choose = document.querySelector('.choose-solution')
    entry.isIntersecting
      ? choose.classList.add('intersecting')
      : choose.classList.remove('intersecting')
  })
}, observerOpt)

observerVoid.observe(solutions)

function showContent (btn) {
  const dataBtn = btn.dataset.targetSolution // atrae
  const dataSection = document.querySelectorAll(`[data-solution=${dataBtn}]`)

  const urlParam = new URLSearchParams(window.location.search)
  let findParemeter = ''
  for (const value of urlParam.values()) {
    findParemeter = value
  }
  console.log('param: ', findParemeter)

  dataBtn == findParemeter
    ? dataSection.forEach(e => e.classList.add('solution-show'))
    : true
}

function btnClickActions (button) {
  btnOptions.forEach(e => e.classList.remove('selected'))
  button.classList.add('selected')
  solutionContent.forEach(e => e.classList.remove('solution-show'))
  // solutionText.forEach(e => e.classList.add('ds-none'))

  // let dataBtn = button.dataset.targetSolution
  urlParemeter(button)
  showContent(button)
}

function urlParemeter(btn) {
  // construye el parametro de la url según el bóton seleccionado
  const paremeterSection = btn.dataset.targetSolution
  const url = new URL(window.location)
  url.searchParams.set('section', paremeterSection);
  window.history.pushState({}, '', url);
  
  console.log(paremeterSection)
  console.log('---paremeter---')
}

btnOptions.forEach((btn) => {
  btn.addEventListener('click', function () {
    btnClickActions(btn)
  })
})

switch (window.location.search) {
  case '?section=atrae':
    btnOptions[0].click()
    break
  case '?section=gestiona':
    btnOptions[1].click()
    break
  case '?section=potencia':
    btnOptions[2].click()
    break
  case '?section=compromete':
    btnOptions[3].click()
    break
  default:
    btnOptions[0].click()
}
