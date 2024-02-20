export default {
  props: {
    current: Object,
    month: ''
    // foo: String
  },
  data() {
    return {
      loading: true,
      // currentData: this.currentPropData || {}
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
  updated() {
    console.log('currentPropData en updated hijo:', this.current)
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
    valorUTM_UTA() {
      const keyNode = this.current["valor_utm_uta"]

      return [
        { currency: 'utm', amount: keyNode['utm'][0] },
        { currency: 'uta', amount: keyNode['uta'][0] }
      ]
    },
    depositoConvenido() {
      const keyNode = this.current["deposito_convenido"]

      return [
        { group: keyNode["tipo_tope"][0], amount: keyNode["valor"][0] }
      ]
    }

  },


  template: /*html*/ `
    <h3 class="h5">Indicadores previsionales periodo {{ month }}</h3>

    <div class="buk-mt-2 buk-col buk-grid buk-py-0" v-if="!loading">
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="wi-100">
            <tr>
              <th class="buk-py-1 txt-white bg-blue-buk">Valor UF</th>
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
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="wi-100">
            <tr>
              <th class="buk-py-1 txt-white bg-blue-buk">Valor {{ month }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in valorUTM_UTA" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-3">  {{ item.currency }}  </div>
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-9 txt-right">  {{ item.amount }} </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="buk-col">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="wi-100">
            <tr>
              <th class="buk-py-1 txt-white bg-blue-buk">Depósito convenido</th>
            </tr>
          </thead>
          <tr v-for="(item, index) in depositoConvenido" :key="item[index]">
            <td class="buk-grid buk-py-1 buk-px-1 " >
              <div class="buk-col-2 buk-col-md-7 buk-col-lg-8"> {{ item.group}} </div>
              <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right"> {{ item.amount }} </div>
            </td>
          </tr>
        </table>
      </div>


    </div>
    <div class="buk-my-6" v-else>
      <p>Cargando datos ... </p>
    </div>
  `
}