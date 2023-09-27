const lisrDetail = document.getElementById('lisr-detail')

lisrDetail.addEventListener('click', function() {
  let dropdown = document.querySelector('.calc__fields.calc__fields--dropdown')
  this.classList.toggle('active')

  if (this.classList.contains('active')) {
    let height = dropdown.scrollHeight
    dropdown.style.height = `${height}px`
  } else {
    dropdown.style.height = '0px'
  }
})