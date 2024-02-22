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
      if (payload) {
        this.loading = false
      }
    }
  },
  updated() {
    console.log('currentPropData en updated hijo:', this.current)
  },
  methods: {
    builderData2Params(keyParent, keyChild1, keyChild2, nameItem1, nameItem2) {
      const keyNode = this.current[keyParent]

      const rslt = keyNode[keyChild1].map((item, index) => {
        return {
          [nameItem1]: item,
          [nameItem2]: keyNode[keyChild2][index]
        }
      })

      return rslt
    },
    builderData4Params(keyParent, keyChild1, keyChild2, keyChild3, keyChild4, nameItem1, nameItem2, nameItem3, nameItem4) {
      const keyNode = this.current[keyParent]

      const rslt = keyNode[keyChild1].map((item, index) => {
        return {
          [nameItem1]: item,
          [nameItem2]: keyNode[keyChild2][index],
          [nameItem3]: keyNode[keyChild3][index],
          [nameItem4]: keyNode[keyChild4][index]
        }
      })

      return rslt
    }
  },
  computed: {
    valorUF() {
      return this.builderData2Params("valor_uf", "Fecha", "UF", "date", "uf")
    },
    valorUTM_UTA() {
      const keyNode = this.current["valor_utm_uta"]

      return [
        { currency: 'utm', amount: keyNode['utm'][0] },
        { currency: 'uta', amount: keyNode['uta'][0] }
      ]
    },
    rentasTopeImponible() {
      return this.builderData2Params("rentas_topes_imponibles", "grupo", "valor", "group", "value")
    },
    rentasMinimasImponible() {
      return this.builderData2Params("rentas_minimas_imponibles", "grupo", "valor", "group", "value")
    },
    dataAfp() {
      return this.builderData4Params("afp", "afp", "tasa_afp_dependientes", "SIS_dependientes", "tasa_afp_independientes", "afp", "dependents", "sis_dependents", "independents")
    }

  },

  template: /*html*/ `
    <div class="buk-grid buk-py-0" v-if="!loading">
      <div class="buk-col buk-col-md-6 buk-col-lg-7 buk-py-0">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="wi-100">
            <tr>
              <th class="buk-py-1 txt-white bg-blue-buk">Valor UF</th>
            </tr>
          </thead>
          <tbody class="txt-blue-buk">
            <tr v-for="(item, index) in valorUF" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">  {{ item.date }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.uf }} </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buk-col buk-col-md-6 buk-col-lg-5 buk-py-0">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="wi-100">
            <tr>
              <th class="buk-py-1 txt-white bg-blue-buk">Valor {{ month }}</th>
            </tr>
          </thead>
          <tbody class="txt-blue-buk">
            <tr v-for="(item, index) in valorUTM_UTA" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-3">  {{ item.currency }}  </div>
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-9 txt-right">  {{ item.amount }} </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buk-col buk-py-0">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 txt-white">Rentas mínimas imponibles</th>
            </tr>
          </thead>
          <tbody class="txt-blue-buk">
            <tr v-for="(item, index) in rentasMinimasImponible" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">  {{ item.group }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.value }} </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buk-col buk-py-0">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 txt-white">Rentas topes imponibles</th>
            </tr>
          </thead>
          <tbody class="txt-blue-buk">
            <tr v-for="(item, index) in rentasTopeImponible" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">  {{ item.group }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.value }} </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buk-col buk-py-0">
        <div class="table-responsive">
          <table class="wi-100 border-1-light rounded-8 table-responsive" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
            <thead class="bg-blue-buk wi-100">
              <tr>
                <th class="buk-py-1 buk-pl-1 txt-white border--left-top-radius">AFP</th>
                <th class="buk-py-1 txt-white border--not-radius">Tasa dependientes</th>
                <th class="buk-py-1 txt-white border--not-radius">SIS dependientes</th>
                <th class="buk-py-1 buk-pr-1 txt-white border--right-top-radius">Tasa independientes</th>
              </tr>
            </thead>
            <tbody class="txt-blue-buk">
              <tr v-for="(item, index) in dataAfp" :key="item[index]">
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.afp }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.dependents }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.sis_dependents }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.independents }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="buk-my-6" v-else>
      <p>Cargando datos ... </p>
    </div>
  `
}
