const pathname = window.location.pathname;
const bukSite = document.getElementById('bukSite');
const appSite = document.getElementById('appSite');
const openCountries = Array.from(document.getElementsByClassName('open-countries'));
const itemCountries = document.getElementById('countries');
const btnCountires = document.getElementById('countries-options')

const locationUrl = (path) => {
  const COMPARE_URL = '/app'

  const changeStatus = (compare) => {
    path.includes(compare)
      ? appSite.classList.add('active')
      : appSite.classList.remove('active')

    path.includes(compare)
      ? bukSite.classList.remove('active')
      : bukSite.classList.add('active')
  }
  return changeStatus(COMPARE_URL)
}

// openCountries.forEach((item) => {
//   item.addEventListener('click', () => {
//     itemCountries.classList.toggle('show-countries')
//   })
// })
btnCountires.addEventListener('click', () => {
  itemCountries.classList.toggle('show-countries')
})

const hideOutsideClickAndScrollDown = () => {
  document.onclick = (e) => {
    try {
      !e.target.className.includes('open-countries')
        ? itemCountries.classList.remove('show-countries')
        : true
    } catch (err) {
      return true
    }

  }

  document.addEventListener('scroll', () => {
    window.scrollY > 15
      ? itemCountries.classList.remove('show-countries')
      : true
  })
}

locationUrl(pathname)
hideOutsideClickAndScrollDown()