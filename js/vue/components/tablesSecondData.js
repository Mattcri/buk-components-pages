export default {
  props: {
    current: Object,
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
    ahorroPrevisionalVoluntario() {
      return this.builderData2Params("ahorro_previsional_voluntario", "tipo_tope", "valor", "limit", "value")
    },
    distri7porciento() {
      return this.builderData2Params("distribucion_7_porciento", "destino", "porcentaje", "destiny", "percent")
    },
    depositoConvenido() {
      return this.builderData2Params("deposito_convenido", "tipo_tope", "valor", "group", "amount")
    },
    trabajosPesados() {
      return this.builderData4Params("cotizacion_trabajos_pesados", "calificación", "puesto_de_trabajo", "financiamiento_empleador", "financiamiento_trabajador", "qualification", "job", "finan_employer", "finan_worker")
    },

  },

  template: /*html*/ `
    <div class="buk-grid buk-mt-2" v-if="!loading">
      <div class="buk-col buk-py-0">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 txt-white">Distribución del 7% de salud</th>
            </tr>
          </thead>
          <tbody class="txt-blue-buk">
            <tr v-for="(item, index) in distri7porciento" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">  {{ item.destiny }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.percent }} </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="buk-mt-2">
          <span class="fw-semi-bold txt-grey" style="font-style: italic; font-size: 14px;">(*) Sólo aplica a empleadores que se encuentran afiliados a una Caja de Compensación, de lo contrario se debe cotizar el 7% a Fonasa.</span>
        </div>
      </div>
      <div class="buk-col buk-py-0">
        <table class="wi-100 border-1-light rounded-8 " style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 txt-white">Topes APV y Depósito convenido </th>
            </tr>
          </thead>
          <tbody class="txt-blue-buk">
            <tr v-for="(item, index) in ahorroPrevisionalVoluntario" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">APV {{ item.limit }}  </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right">  {{ item.value }} </div>
              </td>
            </tr>
            <tr v-for="(item, index) in depositoConvenido" :key="item[index]">
              <td class="buk-grid buk-py-1 buk-px-1 txt-blue-buk" >
                <div class="buk-col-2 buk-col-md-7 buk-col-lg-8">Depósito convenido {{ item.group}} </div>
                <div class="buk-col-2 buk-col-md-5 buk-col-lg-4 txt-right"> {{ item.amount }} </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="buk-col buk-py-0">
        <h3 class="buk-mb-2">Cotización Trabajos Pesados</h3>
        <div class="table-responsive">
          <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
            <thead class="bg-blue-buk wi-100">
              <tr>
                <th class="buk-py-1 buk-pl-1 txt-white border--left-top-radius">Calificación</th>
                <th class="buk-py-1 txt-white border--not-radius">Puesto de trabajo</th>
                <th class="buk-py-1 txt-white border--not-radius">Finan. empleador</th>
                <th class="buk-py-1 buk-pr-1 txt-white border--right-top-radius">Finan. trabajador</th>
              </tr>
            </thead>
            <tbody class="txt-blue-buk">
              <tr v-for="(item, index) in trabajosPesados" :key="item[index]">
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.qualification }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.job }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.finan_employer }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.finan_worker }}
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
