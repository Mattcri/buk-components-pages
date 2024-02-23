export default {
  data() {
    return { count: 0 }
  },
  template:/*html*/ `
  <div class="txt-center">
    <button @click="count++" class="btn btn--2">Sumar</button>
  </div>
  <div class="buk-mt-3">count is {{ count }}</div>
  `
}