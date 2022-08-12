const accordionButtons = [...document.querySelectorAll('.accordion .accordion-btn')]
const tabButtons = [...document.querySelectorAll('.tab .tab-btn')]
const pillarContent = [...document.querySelectorAll('[data-pillar-content]')]

console.log(accordionButtons);

// for (let i = 0; i < accordionButtons.length; i++) {
//   accordionButtons[i].addEventListener('click', function () {
//     let current = document.querySelector('.accordion-btn.active')
//     // let boxContent = this.nextElementSibling
//     // let heightContent = boxContent.scrollHeight
//     if (current && current != this) {
//       current.classList.remove('active')
//       current.nextElementSibling.classList.remove('show-content')
//       // current.style.height = "0px"
//     }
//     // else if (!this.classList.contains('active')) {
//     // }
    
//     this.classList.toggle('active')
//     this.nextElementSibling.classList.toggle('show-content')
//     // this.nextElementSibling.style.height = `${heightContent}px`
      


//   })
// }

accordionButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    // accordionButtons.forEach(btn => btn.classList.remove('active'))
    // accordionButtons.forEach(btn => btn.nextElementSibling.classList.remove('show-content'))
    // accordionButtons.forEach(btn => btn.nextElementSibling.style.height = "0px")
    let boxContent = this.nextElementSibling
    let current = document.querySelector('.accordion-btn.active')
    
    // let heightContent = boxContent.scrollHeight
    // let current = document.querySelector('accordion-content.show-content')
    
    if (current && current != this) {
      current.classList.remove('active')
      current.nextElementSibling.classList.remove('show-content')
    }

    button.classList.toggle('active')
    boxContent.classList.toggle('show-content')
    // boxContent.style.height = `${heightContent}px`

  })
})

tabButtons.forEach(tabutton => {
  tabutton.addEventListener('click', function () {
    tabButtons.forEach(btn => btn.classList.remove('pillar-selected'))
    pillarContent.forEach(content => content.classList.remove('target-active'))
    let getDatasetId = this.dataset.pillarTarget.slice(1)
    let currenTarget = document.getElementById(getDatasetId)

    currenTarget.classList.add('target-active')
    this.classList.add('pillar-selected')
  })
})

tabButtons[1].classList.add('pillar-selected')
pillarContent[1].classList.add('target-active')

const capterraCarousel = new Swiper('.capterra-carousel', {
  slidesPerView: 1.2,
  spaceBetween: 16,
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5500,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
  
})