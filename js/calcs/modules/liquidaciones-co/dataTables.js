import { NationalValuesCO } from "./nationalValues.js"

const limCO = new NationalValuesCO

const upperLimitTable = [
  { 'limit': Number(limCO.getSMLV() * 4) , 'solidarity': 0, 'subsistence': 0 },
  { 'limit': Number(limCO.getSMLV() * 16) , 'solidarity': 0.5, 'subsistence': 0.5 },
  { 'limit': Number(limCO.getSMLV() * 17) , 'solidarity': 0.5, 'subsistence': 0.7 },
  { 'limit': Number(limCO.getSMLV() * 18) , 'solidarity': 0.5, 'subsistence': 0.9 },
  { 'limit': Number(limCO.getSMLV() * 19) , 'solidarity': 0.5, 'subsistence': 1.1 },
  { 'limit': Number(limCO.getSMLV() * 20) , 'solidarity': 0.5, 'subsistence': 1.3 },
]

export { upperLimitTable }