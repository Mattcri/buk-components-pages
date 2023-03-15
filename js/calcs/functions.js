const acc = [...document.getElementsByClassName("button-large ")];

acc.forEach(item => {
  item.addEventListener('click', function() {
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

// const targetsFields = [...document.querySelectorAll]

// acc.forEach(item => {
//   item.addEventListener('click', function() {
//     console.log(this.dataset.targetField);
//     let id = this.dataset.targetField
//     let target = document.getElementById(id)

//     // window.location.href = target

//   })
// })

const t = document.getElementById('test')
t.addEventListener('click', () => {
  document.getElementById('test-section').scrollIntoView({behavior: 'smooth'})
})