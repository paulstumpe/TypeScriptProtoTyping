import {CSSProperties} from "react";


export const terrains = [
  'grass',
  'rock',
  'plains',
  'woods',
  'sand',
  'high mountains',
  'pillar',
  'throne',
  'castle gate',
  'sea',
  'river',
  'mountains',
  'village',
  'cliff',
  'fence',
  'snag',
  'wall',
  'door',
  'wall (weak)',
  'road',
  'floor',
  'stairs',
  'deck',
  'bridge',
  'ruins (village)',
  'house',
  'shop',
  'arena',
  'ruins',
  'lake',
  'peak',
  'fort',
  'gate',
  'throne',
  'no name',
  'desert'
  ] as const;
export type Terrains = typeof terrains[number];

const movementCategories = [
  'foot',
  'armours',
  'knights 1',
  'knights 2',
  'nomads',
  'nomad troopers',
  'fighters',
  'mages',
  'fliers',
  'bandits',
  'pirates',
  'default'
] as const ;
type MovementCategory = typeof movementCategories[number];


//look up index signature
type MovementTableWithoutDefault = {
  [key in MovementCategory]?: number;
}
interface MovementTable extends MovementTableWithoutDefault {
  defaultMoveCost: number
}

const defaultMovementTableImpassable = {
  defaultMoveCost:0,
}
const defaultMovementTableWith1 = {
  defaultMoveCost:1,
}


export interface Terrain {
  evasion:number,
  name:Terrains,
  defense:number,
  color?:CSSProperties['color'],
  movement:MovementTable
}
export type TerrainsDict = {
  [key in Terrains]: Terrain
}

const defaultUnimplementedTerrainStats = {
  evasion: 0,
  defense:0,
  color:'#80F0A0',
  movement:{
    defaultMoveCost:0,
  }
}



export const terrainsDict:TerrainsDict = {
  'grass': {
    name:'grass',
    evasion: 0,
    defense:0,
    color:'#80F0A0',
    movement:defaultMovementTableWith1,
  },
  'rock': {
    name:'rock',
    evasion: 0,
    defense:0,
    color: 'grey',
    movement:defaultMovementTableWith1,
  },
  'plains': {
    name:'plains',
    color: '#F8F8A8',
    evasion: 0,
    defense:0,
    movement:defaultMovementTableWith1,
  },
  'woods': {
    color:'#A0A058',
    name:'woods',
    evasion: 20,
    defense:1,
    movement:{
      ...defaultMovementTableWith1,
      foot:2,
      armours:2,
      "knights 1":3,
      "knights 2":3,
      nomads:2,
      "nomad troopers":2,
      fighters:2,
      mages:2,
      fliers:1,
      bandits:2,
      pirates:2,
    }
  },
  'sand': {
    name:'sand',
    color:'#E8D888',
    evasion: 5,
    defense:0,
    movement:{
      defaultMoveCost:1,
    }
  },
  'high mountains': {
    name:'high mountains',
    color:'#B8A080',
    evasion: 40,
    defense:0,
    movement:{
      ...defaultMovementTableImpassable,
      fliers:1,
      bandits:4,
    }
  },
  'pillar': {
    name:'pillar',
    color:'#90A098',
    evasion: 20,
    defense:1,
    movement:{
      ...defaultMovementTableWith1,
      foot:2,
      armours:2,
      "knights 1":3,
      "knights 2":3,
      nomads:3,
      "nomad troopers":3,
      fighters:2,
      mages:2,
      fliers:1,
      bandits:2,
      pirates:2,
    }
  },
  'throne': {
    name:'throne',
    color:'#D82830',
    evasion: 30,
    defense:3,
    movement:{
      defaultMoveCost:1,
    }
  },
  'castle gate': {
    name:'castle gate',
    color:'#D0D0D0',
    evasion: 30,
    defense:3,
    movement:{
      defaultMoveCost:1,
    }
  },
  'sea': {
    name:'sea',
    color:'#00B2F8',
    evasion: 10,
    defense:0,
    movement:{
      ...defaultMovementTableImpassable,
      fliers:1,
      pirates:2,
    }
  },
  'river': {
    name:'river',
    color: '#4098C8',
    evasion: 0,
    defense:0,
    movement:{
      ...defaultMovementTableImpassable,
      foot:5,
      nomads:5,
      fliers:1,
      bandits:5,
      pirates:2,
    }
  },
  'mountains': {
    name:'mountains',
    color:'#90B0C8',
    evasion: 30,
    defense:1,
    movement:{
      ...defaultMovementTableImpassable,
      foot:4,
      "knights 2":6,
      "nomad troopers":5,
      fighters:3,
      mages:4,
      fliers:1,
      bandits:3,
      pirates:3,
    }
  },
  'village':{
    name:'village',
    color:'#E07848',
    evasion: 10,
    defense:0,
    movement:{
      defaultMoveCost:1,
    }
  },
  'cliff' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      ...defaultMovementTableImpassable,
      fliers:1,
    },
    name:'cliff',
  },
  'fence' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      ...defaultMovementTableImpassable,
      fliers:1,
    },
    name:'fence',
  },
  'snag' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      ...defaultMovementTableImpassable,
      fliers:1,
    },
    name:'snag',
  },
  'wall' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      ...defaultMovementTableImpassable,
    },
    name:'wall',
  },
  'door' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      ...defaultMovementTableImpassable,
    },
    name:'door',
  },
  'wall (weak)' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      ...defaultMovementTableImpassable,
    },
    name:'wall (weak)',
  },
  'road' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1,
    },
    name:'road',
  },
  'floor' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1,
    },
    name:'floor',
  },
  'stairs' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1,
    },
    name:'stairs',
  },
  'deck' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1,
    },
    name:'deck',
  },
  'bridge' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1,
    },
    name:'bridge',
  },
  'ruins (village)' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:2,
      fliers:1,
    },
    name:'ruins (village)',
  },
  'house' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1,
    },
    name:'house',
  },
  'shop' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1,
    },
    name:'shop',
  },
  'arena' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1,
    },
    name:'arena',
  },
  'ruins' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1,
    },
    name:'ruins',
  },
  'lake' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      ...defaultMovementTableImpassable,
      fliers:1,
      pirates:3,
    },
    name:'lake',
  },
  'peak' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      ...defaultMovementTableImpassable,
      fliers:1,
      bandits:4,
    },
    name:'peak',
  },
  'fort' : {
    ...defaultUnimplementedTerrainStats,
    name:'fort',
    movement:{
      defaultMoveCost:2,
      fliers:1,
    }
  },
  'gate' : {
    ...defaultUnimplementedTerrainStats,
    movement:{
      defaultMoveCost:1
    },
    name:'gate',
  },
  desert: {
    evasion: 5,
    name: 'desert',
    defense: 0,
    movement: {
      defaultMoveCost:2,
      armours:3,
      nomads:3,
      "nomad troopers":3,
      fighters:3,
      mages:1,
      fliers:1,
    },
  },
  'no name': {
    ...defaultUnimplementedTerrainStats,
    name: 'no name',
  }
}




export default {};

// g) Terrain & Movement -------------------------------------------------- [1070]
// -------------------------------------------------------------------------------
//     Different terrain gives different bonuses, for example forests.
//
//     Throne panels affect only physical defence.
//
//     NB: Fliers receive no terrain bonus
//
// Woods: evasion +20% def +1
// sand: evasion +5%
// high mountains: evasion +40%
// pillar: evasion +20% def +1
// throne: evasion +30% def +3
// castle gate: evasion +30% def +3
// sea: evasion +10%
// mountains: evasion +30% def +1
// village: evasion +10%
//
// Any not mentioned do not give a bonus.
//
//     Movement is dependent on the unit and changes depending on the weather and
// conditions.
//
//     NB: Fliers are not affected by terrain.
//
//     The general movement pattern is 5 for unpromoted, 7 for mounted units, 4
// for knights. Every class gains 1 movement when they promote with the exception
// of the General, which gains 2 movement.
//     Mounted units lose AID when they gain CON, others gain CON & AID.
//
//     Terrain makes a difference to movement:
//     Forests: 3 for mounted units except nomads, 2 for anyone else
// Rivers: 2 for pirates & berserkers, 5 for lords, thieves, assassins,
//                                               swordmasters, heroes, snipers and nomads. No one else allowed.
//     Sea: 2 for pirates & berserkers
//     Mountains: 6 for promoted mounted units except nomads, 5 for nomads, 3 for
//     primary axemen, 4 for all other non-mounted units except knights & generals
// High Mountain: 4 for bandits & berserkers
//     Deserts:
//         Non-mounted magic units are unaffected
// All unpromoted mounted units have a movement of 1
// Fighters & Knights have a movement of 1
// All promoted mounted units, generals & warriors have a movement of 2
// Thieves have a movement of 3
// All other unpromoted units have a movement of 2
// All other promoted units have a movement of 3
