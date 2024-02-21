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
    rentasTopeImponible() {
      return this.builderData2Params("rentas_topes_imponibles", "grupo", "valor", "group", "value")
    },
    rentasMinimasImponible() {
      return this.builderData2Params("rentas_minimas_imponibles", "grupo", "valor", "group", "value")
    },
    seguroCesantia() {
      return this.builderData3Params("seguro_de_cesantia", "contrato", "financiamiento_trabajador", "financiemiento_empleador", "contract", "finan_worker", "finan_employer")
    },
    asigFamiliar() {
      return this.builderData3Params("asignacion_familiar", "tramo", "monto", "requisito_de_renta", "tract", "amount", "rent")
    },
    dataAfp() {
      return this.builderData4Params("afp", "afp", "tasa_afp_dependientes", "SIS_dependientes", "tasa_afp_independientes", "afp", "dependents", "sis_dependents", "independents")
    },
    trabajosPesados() {
      return this.builderData4Params("cotizacion_trabajos_pesados", "calificación", "puesto_de_trabajo", "financiamiento_empleador", "financiamiento_trabajador", "qualification", "job", "finan_employer", "finan_worker")
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
      <div class="buk-col buk-col-md-8 buk-col-lg-7">
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 buk-pl-1 txt-white border--left-top-radius">AFP</th>
              <th class="buk-py-1 txt-white border--not-radius">Tasa dependientes</th>
              <th class="buk-py-1 txt-white border--not-radius">SIS dependientes</th>
              <th class="buk-py-1 buk-pr-1 txt-white border--right-top-radius">Tasa independientes</th>
            </tr>
          </thead>
          <tbody>
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
        <h3 class="buk-my-3">Seguro de Cesantía</h3>
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 buk-pl-1 txt-white border--left-top-radius">Contrato</th>
              <th class="buk-py-1 txt-white border--not-radius">Finan. empleador</th>
              <th class="buk-py-1 buk-pr-1 txt-white border--right-top-radius">Finan. trabajador</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in seguroCesantia" :key="item[index]">
              <td class="buk-py-1 buk-px-1" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                {{ item.contract }}
              </td>
              <td class="buk-py-1 buk-px-1 txt-center" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                {{ item.finan_worker }}
              </td>
              <td class="buk-py-1 buk-px-1 txt-center" :class=" index % 2 !== 0 && index !== 0 ? 'bg-light-modules' : '' ">
                {{ item.finan_employer }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buk-col buk-col-md-4 buk-col-lg-5">
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
        <table class="wi-100 border-1-light rounded-8 buk-mt-2" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
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
        <table class="wi-100 border-1-light rounded-8 buk-mt-2" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
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
        <table class="wi-100 border-1-light rounded-8 buk-mt-2" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
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
        <h3 class="buk-mb-2">Asignación Familiar</h3>
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 buk-pl-1 txt-white border--left-top-radius">Tramo</th>
              <th class="buk-py-1 txt-white border--not-radius">Monto</th>
              <th class="buk-py-1 buk-pr-1 txt-white border--right-top-radius">Requísitos de renta</th>
            </tr>
          </thead>
          <tbody>
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
      <div class="buk-col buk-col-md-6 buk-col-lg-6">
        <h3 class="buk-mb-2">Cotización Trabajos Pesados</h3>
        <table class="wi-100 border-1-light rounded-8" style="border-collapse: separate; border-spacing: 0; border: 1px solid var(--color-light-blue);">
          <thead class="bg-blue-buk wi-100">
            <tr>
              <th class="buk-py-1 buk-pl-1 txt-white border--left-top-radius">Calificación</th>
              <th class="buk-py-1 txt-white border--not-radius">Puesto de trabajo</th>
              <th class="buk-py-1 txt-white border--not-radius">Finan. empleador</th>
              <th class="buk-py-1 buk-pr-1 txt-white border--right-top-radius">Finan. trabajador</th>
            </tr>
          </thead>
          <tbody>
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
      <div class="buk-col">
        <h3 class="buk-mb-2">Impuestos de Segunda Categoría</h3>
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
          <tbody>
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
    <div class="buk-my-6" v-else>
      <p>Cargando datos ... </p>
    </div>
  `
}