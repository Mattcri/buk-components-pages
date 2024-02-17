export default {
  props: {
    current: Object,
    month: ''
  },
  data() {
    return {
      loading: true,
    }
  },
  watch: {
    current(payload) {
      console.log('payload: ', payload)
      if (payload) {
        this.loading = false
      }
    }
  },
  
  computed: {
    valorUF() {
      const keyNode = this.current["valor_uf"]
      const rslt = keyNode["Fecha"].map((date, index) => {
        return {
          date,
          uf: keyNode["UF"][index]
        }
      })

      return rslt
    },
    

  },


  template: /*html*/ `
    <div class="buk-my-2 buk-col buk-grid" v-if="!loading">
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 txt-white">Valor UF</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in valorUF" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">  {{ item.date }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.uf }} </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="buk-my-6" v-else>
      <p>Cargando datos ... </p>
    </div>
  `
}