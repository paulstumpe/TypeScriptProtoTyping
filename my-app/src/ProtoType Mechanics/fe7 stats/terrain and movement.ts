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