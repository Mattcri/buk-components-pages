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

const retentionTable = [
  { 'start': 0, 'end': 95, 'factor': 0, 'basePay': 0 },
  { 'start': 95, 'end': 150, 'factor': 0.19, 'basePay': 0 },
  { 'start': 150, 'end': 360, 'factor': 0.28, 'basePay': 10 },
  { 'start': 360, 'end': 640, 'factor': 0.33, 'basePay': 69 },
  { 'start': 640, 'end': 945, 'factor': 0.35, 'basePay': 162 },
  { 'start': 945, 'end': 2300, 'factor': 0.37, 'basePay': 268 },
  { 'start': 2300, 'end': Infinity, 'factor': 0.39, 'basePay': 770 }
]

export { upperLimitTable, retentionTable }