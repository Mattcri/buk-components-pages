const btnOptionsSolutions = [...document.querySelectorAll("[data-target-solution].target-solution")]
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
    // console.log('param exc: ', value);
    findParemeter = value
  }
  console.log('param: ', findParemeter)
  

  dataBtn == findParemeter
    ? dataSection.forEach(e => e.classList.add('solution-show'))
    : true
}

function btnClickActions (button) {
  btnOptionsSolutions.forEach(e => e.classList.remove('selected'))
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

btnOptionsSolutions.forEach((btn) => {
  btn.addEventListener('click', function () {
    btnClickActions(btn)
  })
})

switch (window.location.search) {
  case '?section=atrae':
    btnOptionsSolutions[0].click()
    break
  case '?section=gestiona':
    btnOptionsSolutions[1].click()
    break
  case '?section=potencia':
    btnOptionsSolutions[2].click()
    break
  case '?section=compromete':
    btnOptionsSolutions[3].click()
    break
  default:
    btnOptionsSolutions[0].click()
}

const btnTypeSolutions = [...document.querySelectorAll("button[data-target-type]")]
const solutionTypeContent = [...document.querySelectorAll('[data-type]')]

btnTypeSolutions.forEach(button => {
  button.addEventListener('click', function() {
    btnTypeSolutions.forEach(btn => btn.classList.remove('active'))
    button.classList.add('active')

    let dataTargetType = this.dataset.targetType
    let dataType = document.querySelector(`[data-type=${dataTargetType}]`)
    // console.log(dataType)
    solutionTypeContent.forEach(e => e.classList.add('ds-none'))
    dataType.classList.remove('ds-none')

  })
})

btnTypeSolutions[0].click()