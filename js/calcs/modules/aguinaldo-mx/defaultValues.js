class DefaultValues {
  firstDayYear () {
    let currentDate = new Date()
    return new Date(currentDate.getFullYear(), 0, 1)
  }

  lastDayYear () {
    let currentDate = new Date()
    return new Date(currentDate.getFullYear(), 11, 31)
  }

  daysPerYear () {
    return 365
  }

  UMA () {
    return 103.74
  }
}


export { DefaultValues }