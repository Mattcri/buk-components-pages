const category_carousel = new Swiper(".category-carousel", {
  slidesPerView: 1.2,
  // centeredSlides: true,
  spaceBetween: 16,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2.2,
    },
    1020: {
      slidesPerView: 3.2,
      spaceBetween: 24,
    }
  }
})