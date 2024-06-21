class NationalValuesCO {
  getSMLV() {
    return 1300000
  }

  getSMLVlastYear() {
    return 1160000
  }

  getUVT() {
    return 47065
  }

  getAuxTransportLastYear() {
    return 140606
  }

  maxSocialSecurity() {
    return Number(this.getSMLV() * 25)
  }
}

export { NationalValuesCO }