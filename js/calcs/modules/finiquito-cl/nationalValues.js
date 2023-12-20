class NationalValues {
  constructor(UFvalue) {
    this.UFvalue = UFvalue
  } 

  async getUF() {
    try {
      const URLdata = 'https://d3nk1otf0qe6jp.cloudfront.net/data.json'
      const data = await fetch(URLdata)
                          .then(response => {
                            if(response.status === 200) {
                              return response.json()
                            }
                          })
                          .catch((error) => console.error(error))

      // En caso de fallar la petición fetch, traer un valor de UF predeterminado
      if(data) {
        let today = new Date().toISOString().slice(0, 10)
        let UFtoday = data.UF.find(uf => uf.Fecha === today)
        let cleanUFvalueToConvertOnInteger = UFtoday.Valor.replace(/\./g, "").replace(",", ".")
        // console.log('clean UF: ', cleanUFvalueToConvertOnInteger)
        let UFstringToNumber = Math.floor(cleanUFvalueToConvertOnInteger)

        this.UFvalue = { 
          Valor: UFstringToNumber,
          Fecha: UFtoday.Fecha
        }
      } else {
        this.UFvalue = { 
          Valor: 36563,
          Fecha: '2023-11-30'
        }
      }

    } catch (error) {
      console.error(error)
    }
  }

  getHolidaysDates() {
    return [
      '2023-12-08',
      '2023-12-25',
      '2024-01-01',
      '2024-03-29',
      '2024-05-01',
      '2024-05-21',
      '2024-06-20',
      '2024-07-16',
      '2024-08-15',
      '2024-09-18',
      '2024-09-19',
      '2024-09-20',
      '2024-10-31',
      '2024-11-01',
      '2024-12-08',
      '2024-12-25'
    ]
  }

  getIMM() {
    return 460000
  }

}

export { NationalValues }