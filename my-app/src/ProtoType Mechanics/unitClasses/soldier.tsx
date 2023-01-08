import {ironAxe, ironBow, ironLance, Weapon, WeaponType} from "../weapons";


type WeaponRank = {
  [key in WeaponType]?: string;
};
export type BaseUnits = 'Oswin' | 'brigandlvl1' | 'archerlvl1'
interface UnitBaseStats {
  level:number,
  class:string,
  hp:number,
  strength:number,
  magic:number,
  skill:number,
  luck:number,
  defense:number,
  resistance:number,
  speed:number,
  con:number,
  move:number,
  affinity:string,
  name: BaseUnits
  weaponRanks: WeaponRank
  weapon:Weapon
}
interface MissingStats {
  supBonus:number,
  SRankBonus:number,
  tacticianBonus:number,
  terrainBonus:number,
  effectiveCoefficient:number,
  criticalBonus:number,
}
export const addOnMissing:MissingStats = {
  supBonus:0,
  SRankBonus:0,
  tacticianBonus:0,
  terrainBonus:0,
  effectiveCoefficient:0,
  criticalBonus:0,
}
export interface StatsForAttack extends UnitBaseStats {
  supBonus:number,
  SRankBonus:number,
  tacticianBonus:number,
  terrainBonus:number,
  effectiveCoefficient:number,
  criticalBonus:number,
}

export const oswin:StatsForAttack = {
  level: 9,
  name: 'Oswin',
  class:'knight',
  hp: 28,
  strength: 13,
  magic: 13,
  skill: 9,
  speed: 5,
  luck: 3,
  defense: 13,
  resistance: 3 ,
  con:14,
  move:4,
  affinity: 'anima',
  weaponRanks:{
    lance:'b'
  },
  weapon: ironLance,
  ...addOnMissing,
}

const archerlvl1:StatsForAttack = {
  level: 1,
  name: 'archerlvl1',
  class:'archer',
  hp: 18,
  strength: 4,
  magic: 4,
  skill: 3,
  speed: 3,
  luck: 0,
  defense: 3,
  resistance: 0 ,
  con:7,
  move:5,
  affinity: 'anima',
  weaponRanks:{
    bow:'b'
  },
  weapon: ironBow,
  ...addOnMissing,
}

const brigandlvl1:StatsForAttack = {
  level:2,
  name: 'brigandlvl1',
  class:'bandit',
  hp:21,
  strength:6,
  magic:6,
  skill:2,
  speed:6,
  luck:0,
  defense:4,
  resistance:1,
  con:12,
  move:5,
  affinity: '',
  weaponRanks: {
    axe:'b'
  },
  weapon:ironAxe,
  ...addOnMissing
}







type BasesDict = {
  [key in BaseUnits]: StatsForAttack;
};
export const basesDict:BasesDict = {
  Oswin:oswin,
  brigandlvl1,
  archerlvl1,
}


