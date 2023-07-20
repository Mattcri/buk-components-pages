class InitialValues {
  constructor ({
    minSalary,
    auxTransport,
    uvt,
    maxSocialSecuriry,
    maxExemptIncome,
    maxLaw1819,
    maxMedicinePac,
    maxDependents,
    maxHousingInterest
  }) {
    this.minSalary = minSalary
    this.auxTransport = auxTransport
    this.uvt = uvt
    this.maxSocialSecuriry = maxSocialSecuriry
    this.maxExemptIncome = maxExemptIncome
    this.maxLaw1819 = maxLaw1819
    this.maxMedicinePac = maxMedicinePac
    this.maxDependents = maxDependents
    this.maxHousingInterest = maxHousingInterest
  }
}

const nationalValues = new InitialValues({
  minSalary: 1160000,
  auxTransport: 140606,
  uvt: 42412,
  maxSocialSecuriry: 29000000,
  maxExemptIncome: 2792123,
  maxLaw1819: 4736007,
  maxMedicinePac: 678592,
  maxDependents: 1357184,
  maxHousingInterest: 4241200,
})

export { nationalValues }