import * as C1 from './assets/CET-C1.json'
import * as C1s from './assets/CET-C1s.json'
import * as C2 from './assets/CET-C2.json'
import * as C2s from './assets/CET-C2s.json'
import * as C3 from './assets/CET-C3.json'
import * as C3s from './assets/CET-C3s.json'
import * as C4 from './assets/CET-C4.json'
import * as C4s from './assets/CET-C4s.json'
import * as C5 from './assets/CET-C5.json'
import * as C5s from './assets/CET-C5s.json'
import * as C6 from './assets/CET-C6.json'
import * as C6s from './assets/CET-C6s.json'
import * as C7 from './assets/CET-C7.json'
import * as C7s from './assets/CET-C7s.json'
import * as CBC1 from './assets/CET-CBC1.json'
import * as CBC2 from './assets/CET-CBC2.json'
import * as CBD1 from './assets/CET-CBD1.json'
import * as CBL1 from './assets/CET-CBL1.json'
import * as CBL2 from './assets/CET-CBL2.json'
import * as D01 from './assets/CET-D01.json'
import * as D01A from './assets/CET-D01A.json'
import * as D02 from './assets/CET-D02.json'
import * as D03 from './assets/CET-D03.json'
import * as D04 from './assets/CET-D04.json'
import * as D06 from './assets/CET-D06.json'
import * as D07 from './assets/CET-D07.json'
import * as D08 from './assets/CET-D08.json'
import * as D09 from './assets/CET-D09.json'
import * as D10 from './assets/CET-D10.json'
import * as D11 from './assets/CET-D11.json'
import * as D12 from './assets/CET-D12.json'
import * as D13 from './assets/CET-D13.json'
import * as I1 from './assets/CET-I1.json'
import * as I2 from './assets/CET-I2.json'
import * as I3 from './assets/CET-I3.json'
import * as L01 from './assets/CET-L01.json'
import * as L02 from './assets/CET-L02.json'
import * as L03 from './assets/CET-L03.json'
import * as L04 from './assets/CET-L04.json'
import * as L05 from './assets/CET-L05.json'
import * as L06 from './assets/CET-L06.json'
import * as L07 from './assets/CET-L07.json'
import * as L08 from './assets/CET-L08.json'
import * as L09 from './assets/CET-L09.json'
import * as L10 from './assets/CET-L10.json'
import * as L11 from './assets/CET-L11.json'
import * as L12 from './assets/CET-L12.json'
import * as L13 from './assets/CET-L13.json'
import * as L14 from './assets/CET-L14.json'
import * as L15 from './assets/CET-L15.json'
import * as L16 from './assets/CET-L16.json'
import * as L17 from './assets/CET-L17.json'
import * as L18 from './assets/CET-L18.json'
import * as L19 from './assets/CET-L19.json'
import * as L20 from './assets/CET-L20.json'
import * as R1 from './assets/CET-R1.json'
import * as R2 from './assets/CET-R2.json'
import * as R3 from './assets/CET-R3.json'
import * as R4 from './assets/CET-R4.json'

export const colorMaps: ReadonlyMap<string, { data: ReadonlyArray<string> }> =
  new Map([
    ['C1', C1],
    ['C1s', C1s],
    ['C2', C2],
    ['C2s', C2s],
    ['C3', C3],
    ['C3s', C3s],
    ['C4', C4],
    ['C4s', C4s],
    ['C5', C5],
    ['C5s', C5s],
    ['C6', C6],
    ['C6s', C6s],
    ['C7', C7],
    ['C7s', C7s],

    ['CBC1', CBC1],
    ['CBC2', CBC2],
    ['CBD1', CBD1],
    ['CBL1', CBL1],
    ['CBL2', CBL2],

    ['D01', D01],
    ['D01A', D01A],
    ['D02', D02],
    ['D03', D03],
    ['D04', D04],
    ['D06', D06],
    ['D07', D07],
    ['D08', D08],
    ['D09', D09],
    ['D10', D10],
    ['D11', D11],
    ['D12', D12],
    ['D13', D13],

    ['I1', I1],
    ['I2', I2],
    ['I3', I3],

    ['L01', L01],
    ['L02', L02],
    ['L03', L03],
    ['L04', L04],
    ['L05', L05],
    ['L06', L06],
    ['L07', L07],
    ['L08', L08],
    ['L09', L09],
    ['L10', L10],
    ['L11', L11],
    ['L12', L12],
    ['L13', L13],
    ['L14', L14],
    ['L15', L15],
    ['L16', L16],
    ['L17', L17],
    ['L18', L18],
    ['L19', L19],
    ['L20', L20],

    ['R1', R1],
    ['R2', R2],
    ['R3', R3],
    ['R4', R4],
  ])

export const colorcetNames = Array.from(colorMaps.keys())
