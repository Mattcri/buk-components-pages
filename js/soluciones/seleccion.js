const e2e_carousel = new Swiper(".e2e-carousel", {
  slidesPerView: 1.5,
  spaceBetween: 16,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2.5,
    },
    767: {
      slidesPerView: 3.5,
      spaceBetween: 24,
    },
    1020: {
      slidesPerView: 5,
      spaceBetween: 24,
    }
  }
})

const functionalities_carousel = new Swiper(".functionalities-carousel", {
  slidesPerView: 1,
  // slidesPerColumn: 3,
  grid: {
    rows: 3,
    fill: 'rows',
  },
  spaceBetween: 16,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      grid: {
        rows: 3,
        fill: 'rows',
      }
    },
  }
})