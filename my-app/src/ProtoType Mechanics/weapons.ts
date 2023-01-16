const weaponTypes = [
  'sword',
  'lance',
  'axe',
  'bow',
  'stave',
  'animaTome',
  'darkTome',
  'lightTome'
] as const;

export type WeaponType = typeof weaponTypes[number];

export interface Weapon {
  name: string
  weight: number
  hit: number
  might:number
  critical:number
  type: WeaponType
  rank: string
  rng: number
  uses: number
  worth: number
  weaponExp:number
}

export const ironLance:Weapon = {
  name: 'Iron Lance',
  weight: 8,
  hit: 80,
  might:7,
  critical:0,
  type: 'lance',
  rank: 'E',
  rng: 1,
  uses:45,
  worth: 350,
  weaponExp:1
}

export const ironBow:Weapon = {
  name: 'Iron Bow',
  weight: 5,
  hit: 85,
  might:6,
  critical:0,
  type: 'bow',
  rank: 'E',
  rng: 2,
  uses:45,
  worth: 350,
  weaponExp:1
}
export const ironAxe:Weapon = {
  name: 'Iron Axe',
  weight: 10,
  hit: 75,
  might:8,
  critical:0,
  type: 'axe',
  rank: 'E',
  rng: 1,
  uses:45,
  worth: 350,
  weaponExp:1
}
