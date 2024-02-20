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
  methods: {
    processBuilderData2Params(keyParent, keyChild1, keyChild2, nameItem1, nameItem2) {
      const keyNode = this.current[keyParent]

      const rslt = keyNode[keyChild1].map((item, index) => {
        return {
          [nameItem1]: item,
          [nameItem2]: keyNode[keyChild2][index]
        }
      })

      return rslt
    }
  },
  
  computed: {
    ahorroPrevisionalVoluntario() {
      return this.processBuilderData2Params("ahorro_previsional_voluntario", "tipo_tope", "valor", "limit", "value")
    },
    distri7porciento() {
      return this.processBuilderData2Params("distribucion_7_porciento", "destino", "porcentaje", "destiny", "percent")
    },
    rentasTopeImponible() {
      return this.processBuilderData2Params("rentas_topes_imponibles", "grupo", "valor", "group", "value")
    },
    rentasMinimasImponible() {
      return this.processBuilderData2Params("rentas_minimas_imponibles", "grupo", "valor", "group", "value")
    }
    

  },


  template: /*html*/ `
    <div class="buk-mb-2 buk-col buk-grid buk-py-0" v-if="!loading">
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 txt-white">Ahorro previsional voluntario</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in ahorroPrevisionalVoluntario" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">  {{ item.limit }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.value }} </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 txt-white">Distribución 7%</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in distri7porciento" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">  {{ item.destiny }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.percent }} </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 txt-white">Rentas topes imponibles</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rentasTopeImponible" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">  {{ item.group }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.value }} </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 txt-white">Rentas mínimas imponibles</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rentasMinimasImponible" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">  {{ item.group }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.value }} </div>
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