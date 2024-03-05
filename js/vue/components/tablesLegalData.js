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
      console.log('payload: ', payload)
      if (payload) {
        this.loading = false
      }
    }
  },
  methods: {
    builderData3Params(keyParent, keyChild1, keyChild2, keyChild3, nameItem1, nameItem2, nameItem3) {
      const keyNode = this.current[keyParent]

      const rslt = keyNode[keyChild1].map((item, index) => {
        return {
          [nameItem1]: item,
          [nameItem2]: keyNode[keyChild2][index],
          [nameItem3]: keyNode[keyChild3][index]
        }
      })

      return rslt
    },
  },
  computed: {
    seguroCesantia() {
      return this.builderData3Params("seguro_de_cesantia", "contrato", "financiamiento_trabajador", "financiemiento_empleador", "contract", "finan_worker", "finan_employer")
    },
    asigFamiliar() {
      return this.builderData3Params("asignacion_familiar", "tramo", "monto", "requisito_de_renta", "tract", "amount", "rent")
    },
    impuestos2daCategoria() {
      const keyNode = this.current["impuestosegundacatsii"]

      return keyNode["desde"].map((item, index) => {
        return {
          "start": item,
          "end": keyNode["hasta"][index],
          "factor": keyNode["factor"][index],
          "reduce": keyNode["cantidad_a_rebajar"][index],
          "max_efective_tax": keyNode["tasa_de_impuesto_efectiva_maxima"][index]
        }
      })
    }

  },

  template: /*html*/ `
    <div class="buk-mb-2 buk-col buk-grid buk-py-0" v-if="!loading">
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <h3 class="buk-mb-3">Asignación Familiar</h3>
        <div class="table-responsive responsive--md">
          <table class="wi-100 border-1-light rounded-8 table-responsive" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
            <thead class="bg-blue-buk wi-100">
              <tr>
                <th class="buk-py-1 buk-pl-1 txt-white border--left-top-radius">Tramo</th>
                <th class="buk-py-1 txt-white border--not-radius">Monto</th>
                <th class="buk-py-1 buk-pr-1 txt-white  border--right-top-radius">Requísitos de renta</th>
              </tr>
            </thead>
            <tbody class="txt-blue-buk">
              <tr v-for="(item, index) in asigFamiliar" :key="item[index]">
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ index + 1}} <strong>({{ item.tract }})</strong>
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.amount }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.rent }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <h3 class="buk-mb-3">Seguro de Cesantía</h3>
        <div class="table-responsive">
          <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
            <thead class="bg-blue-buk wi-100">
              <tr>
                <th class="buk-py-1 buk-pl-1 txt-white border--left-top-radius">Contrato</th>
                <th class="buk-py-1 txt-white border--not-radius">Finan. empleador</th>
                <th class="buk-py-1 buk-pr-1 txt-white border--right-top-radius">Finan. trabajador</th>
              </tr>
            </thead>
            <tbody class="txt-blue-buk">
              <tr v-for="(item, index) in seguroCesantia" :key="item[index]">
                <td class="buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.contract }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.finan_employer }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.finan_worker }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="buk-col">
        <h3 class="buk-mb-3">Impuestos de Segunda Categoría</h3>
        <div class="table-responsive responsive--xl">
          <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
            <thead class="bg-blue-buk wi-100">
              <tr>
                <th class="buk-py-1 buk-pl-1 txt-white border--left-top-radius">Desde</th>
                <th class="buk-py-1 txt-white border--not-radius">Hasta</th>
                <th class="buk-py-1 txt-white border--not-radius">Factor</th>
                <th class="buk-py-1 txt-white border--not-radius">Cantidad a rebajar</th>
                <th class="buk-py-1 buk-pr-1 txt-white border--right-top-radius">Tasa de impuesto efectiva max.</th>
              </tr>
            </thead>
            <tbody class="txt-blue-buk">
              <tr v-for="(item, index) in impuestos2daCategoria" :key="item[index]">
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.start }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.end }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.factor }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.reduce }}
                </td>
                <td class="buk-py-1 buk-px-1 txt-center"  :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                  {{ item.max_efective_tax }}
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