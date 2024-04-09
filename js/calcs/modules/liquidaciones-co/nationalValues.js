class NationalValuesCO {
  getSMLV() {
    return 1300000
  }

  getUVT() {
    return 47065
  }

  maxSocialSecurity() {
    return Number(this.getSMLV() * 25)
  }
}

export { NationalValuesCO }