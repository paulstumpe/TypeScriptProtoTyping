// ===============================================================================
//     I'll follow a standard format, because it saves some time.
//
// NB All units HP cap is 60. All unpromoted units have a cap in all other stats
// as 20. All units cap LUC at 30.
//
// The game data for stats is severely flawed.
//
// -------------------------------------------------------------------------------
//     a) Unpromoted ---------------------------------------------------------- [1110]
// -------------------------------------------------------------------------------
//     Standard -
// Name: name of class
// Weapon: weapon of usage
// Promotion: promotes into...
// Characters of that class: characters who JOIN as that class
//
// Name: Fighter
// Weapon: axe
// Promotion: Warrior
// Characters of that class: Dorcas, Bartre
//
// Name: Shaman
// Weapon: dark
// Promotion: Druid
// Characters of that class: Canas
//
// Name: Pirate
// Weapon: axe
// Promotion: Berserker
// Characters of that class: Dart
//
// Name: Lord
// Weapon: variable
// Promotion: variable
// Characters of that class: Eliwood, Lyn, Hector
//
// Name: Mage
// Weapon: anima
// Promotion: Sage
// Characters of that class: Erk, Nino
//
// Name: Pegasus Knight
// Weapon: lance
// Promotion: Falcon Knight
// Characters of that class: Fiora, Farina, Florina
//
// Name: Myrmidon
// Weapon: sword
// Promotion: Swordmaster
// Characters of that class: Guy
//
// Name: Mercenary
// Weapon: sword
// Promotion: Hero
// Characters of that class: Raven
//
// Name: Wyvern Rider
// Weapon: lance
// Promotion: Wyvern Lord
// Characters of that class: Heath
//
// Name: Cavalier
// Weapon: sword, lance
// Promotion: Paladin
// Characters of that class: Sain, Kent, Lowen
//
// Name: Thief
// Weapon: sword, lockpick, Member's Card
// Promotion: Assassin
// Characters of that class: Legault, Matthew
//
// Name: Archer
// Weapon: bow
// Promotion: Sniper
// Characters of that class: Wil, Rebecca
//
// Name: Monk
// Weapon: light
// Promotion: Bishop
// Characters of that class: Lucius
//
// Name: Cleric
// Weapon: staff
// Promotion: Bishop
// Characters of that class: Serra
//
// Name: Knight
// Weapon: lance
// Promotion: General
// Characters of that class: Wallace, Oswin
//
// Name: Troubadour
// Weapon: staff
// Promotion: Valkyrie
// Characters of that class: Priscilla
//
// Name: Merchant
// Weapon: --
//     Promotion: Transporter
// Characters of that class: Merlinus
//
// Name: Bard/Dancer
// Weapon: rings
// Promotion: --
//     Characters of that class: Nils, Ninian
//
// Name: Nomad
// Weapon: bow
// Promotion: Nomad Trooper
// Characters of that class: Rath
//
// NB: Enemy-exclusive classes
// Brigands are similar to fighters, but move on mountains
// Corsairs are essentially the same as pirates
//
// -------------------------------------------------------------------------------
//     b) Promoted ------------------------------------------------------------ [1120]
// -------------------------------------------------------------------------------
//     Most classes gain +40 weapon EXP in their main weapon upon promotion. Before
// promotion, no class can exceed 181 weapon EXP in a weapon.
//
//     Standard -
// Name: name of class
// Promotion bonuses: bonuses gained when promoting; any stat NOT noted gives none
// Weapons: weapons of usage
// Caps: class caps
// Characters of that class: characters who JOIN of that class
// Description: personal description of general observations
//
// Name: Archsage
// Promotion bonuses: --
//     Weapons: dark, light, anima, staff
// Caps:
//     HP 60 MAG 30 SKL 30 SPD 25 DEF 30 RES 30
// Characters of that class: Athos
// Description: A strong class with access to all magics, most notably dark. Very
// strong caps and a generally strong character. The only problem is that this
// class is only available in the Final Chapter.
// * Dark Druid has the same caps as the Archsage as well as the same weapons
//
// Name: Warrior
// Promotion bonuses:
//     HP +3 STR +1 SKL +2 DEF +3 RES +3 CON +2 AID +2 MOV +1
// Weapons: axe, bow
// Caps:
//     STR 30 SKL 28 SPD 26 DEF 26 RES 22
// Characters of that class: Geitz
// Description: A solid class with strong offence and defence.
//
//     Name: Druid
// Promotion bonuses:
//     HP +4 SPD +3 DEF +2 RES +2 CON +1 AID +1 MOV +1
// Weapons: dark, staff
// Caps:
//     MAG 29 SKL 26 SPD 26 DEF 21 RES 28
// Characters of that class: --
//     Description: Very powerful magically, boasting great magic caps and usage over
// the best magic in the game.
//
//     Name: Berserker
// Promotion bonuses:
//     HP +4 STR +1 SKL +1 SPD +1 DEF +2 RES +2 CON +3 AID +3 MOV +1
// Weapons: axe
// Caps:
//     STR 30 SKL 29 SPD 28 DEF 23 RES 21
// Characters of that class: Hawkeye
// Description: One of the most powerful classes in the game, with some of the
// best offensive caps possible. Defences are slightly weak, but with 15%
// critical who needs defence?
//
//     Name: Sage
// Promotion bonuses:
//     Male -
//     HP +4 MAG +1 DEF +3 RES +3 CON +1 AID +1 MOV +1
// Female -
// HP +3 MAG +1 SKL +1 DEF +3 RES +3 CON +1 AID +1 MOV +1
// Weapons: anima, staff
// Caps:
//     Male -
//     MAG 28 SKL 30 SPD 26 DEF 21 RES 25
// Female -
// MAG 30 SKL 28 SPD 26 DEF 21 RES 25
// Characters of that class: Pent
// Description: A balanced offensive magic class. I think the female version is
// slightly better, but generally they are reasonably matched.
//
//     Name: Falcon Knight
// Promotion bonuses:
//     HP +5 STR +2 DEF +2 RES +2 CON +1 AID -1 MOV +1
// Weapons: lance, sword
// Caps:
//     STR 23 SKL 25 SPD 28 DEF 23 RES 26
// Characters of that class: --
//     Description: A balanced physical class designed to take on mages with ease.
//
//     Name: Swordmaster
// Promotion bonuses:
//     HP +5 STR +2 DEF +2 RES +1 CON +1 AID +1 MOV +1
// Weapons: sword
// Caps:
//     Male -
//     STR 24 SKL 29 SPD 30 DEF 22 RES 23
// Female -
// STR 22 SKL 29 SPD 30 DEF 22 RES 25
// Characters of that class: Karel, Karla
// Description: A unit that excels at accuracy and criticals moreso than raw
// damage. Swordmasters are swift at dodging, but lack physical defence.
//
//     Name: Hero
// Promotion bonuses:
//     HP +4 SKL +2 SPD +2 DEF +2 CON +1 AID +1 MOV +1
// Weapons: sword, axe
// Caps:
//     STR 25 SKL 30 SPD 26 DEF 25 RES 22
// Characters of that class: Harken
// Description: Probably the most balanced unmounted unit available with excellent
//     versatility. Both offences and defences are highly balanced.
//
//     Name: Wyvern Lord
// Promotion bonuses:
//     HP +4 SKL +2 SPD +2 DEF +2 CON +1 AID -1 MOV +1
// Weapons: lance, sword
// Caps:
//     Male -
//     STR 27 SKL 25 SPD 23 DEF 28 RES 22
// Female -
// STR 25 SKL 26 SPD 24 DEF 27 RES 23
// Characters of that class: Vaida
// Description: Physical powerhouses of flying. Unlike the swift and frail
// pegasus knights, wyverns are more brutal, powerful, harder to damage but far
// slower.
//
//     Name: Paladin
// Promotion bonuses:
//     HP +2 STR +1 SKL +1 SPD +1 DEF +2 RES +1 CON +2 AID -2 MOV +1
// Weapons: sword, lance, axe
// Caps:
//     Male -
//     STR 25 SKL 26 SPD 24 DEF 25 RES 25
// Female -
// STR 23 SKL 27 SPD 25 DEF 24 RES 26
// Characters of that class: Isadora, Marcu
// Description: A highly versatile class boasting high movement and very solid
// stats, as well as command over the weapon triangle.
//
//     Name: Assassin
// Promotion bonuses:
//     HP +3 STR +1 DEF +2 RES +2
// Weapons: sword
// Caps:
//     STR 20 SKL 30 SPD 30 DEF 20 RES 20
// Characters of that class: Jaffar
// Description: A very weak class on first glance, but masters of swift attacks
// and killing strokes. The redeeming factor is the notorious OHKO, which is
// exclusive to assassins.
//
//     Name: Sniper
// Promotion bonuses:
//     Male -
//     HP +3 STR +1 SKL +2 SPD +2 DEF +2 RES +3 CON +1 MOV +1 AID +1
// Female -
// STR 24 SKL 30 SPD 29 DEF 24 RES 24
// Weapons: bow
// Caps:
//     Male -
//     STR 25 SKL 30 SPD 28 DEF 25 RES 23
// Female -
// STR 24 SKL 30 SPD 29 DEF 24 RES 24
// Characters of that class: Louise
// Description: Masters of the bow, but somewhat outclassed by the Nomads. Their
// only advantage seems to be the use of ballistas, but even that is minor.
//
//     Name: Bishop
// Promotion bonuses:
//     Male -
//     HP +3 MAG +2 SKL +1 DEF +3 RES +2 CON +1 AID +1 MOV +1
// Female -
// HP +3 MAG +1 SKL +2 SPD +1 DEF +2 RES +2 CON +1 AID +1 MOV +1
// Weapons: light, staff
// Caps:
//     Male -
//     MAG 25 SKL 26 SPD 24 DEF 22 RES 30
// Female -
// MAG 25 SKL 25 SPD 26 DEF 21 RES 30
// Characters of that class: Renault
// Description: An excellent supporting magic class. Bishops boast the strongest
// magic defence and an affinity towards staves. I tend to think the female
// bishop is slightly better than the male bishop (once again...).
//
// Name: Transporter
// Promotion bonuses:
//     MOV +5 AID -24
// Weapons: storage
// Caps:
//     STR 20 SKL 20 SPD 20 DEF 20 RES 20
// Characters of that class: Merlinus
// Description: Merlinus with wheels, so slightly better. Nothing really good
// about promoting Merlinus at all really.
//
//     Name: General
// Promotion bonuses:
//     HP +4 STR +2 SKL +2 SPD +3 DEF +2 RES +3 CON +2 AID +2 MOV +1
// Weapons: lance, axe
// Caps:
//     STR 29 SKL 27 SPD 24 DEF 30 RES 25
// Characters of that class: Wallace (Lyn Normal)
// Description: One of the most powerful classes in the game, with exceptional
//     offence and defence. Generals are the tanks of the game.
//
//     Name: Valkyrie
// Promotion bonuses:
//     HP +3 MAG +2 SKL +1 DEF +2 RES +3 CON +1 AID +1 MOV +1
// Weapons: anima, staff
// Caps:
//     MAG 25 SKL 24 SPD 25 DEF 24 RES 28
// Characters of that class: --
//     Description: A reasonably balanced unit that focuses on support magic.
//
//     Name: Nomad Trooper
// Promotion bonuses:
//     HP +3 STR +2 SKL +1 SPD +1 DEF +3 RES +3 CON +1 AID -1 MOV +1
// Weapons: bow, sword
// Caps:
//     STR 25 SKL 28 SPD 30 DEF 24 RES 23
// Characters of that class: --
//     Description: The nomad trooper is everything that a player could desire in
// a bowmen. Exceptional range, speed, movement, melee and ranged attacks and
// solid all-round stats.
//
//     Name: Blade Lord
// Promotion bonuses:
//     HP +3 STR +2 SKL +2 DEF +3 RES +5 CON +1 AID +1 MOV +1
// Weapons: sword, bow
// Caps:
//     STR 24 SKL 29 SPD 30 DEF 22 RES 22
// Characters of that class: Lyn
// Description: Think swordmaster with a bow. Lyn isn't exceptional for her class,
// but for her own merits.
//
//     Name: Great Lord
// Promotion bonuses:
//     HP +3 SKL +2 SPD +3 DEF +1 RES +5 CON +2 AID +2
// Weapons: axe, sword
// Caps:
//     STR 30 SKL 24 SPD 24 DEF 29 RES 20
// Characters of that class: Hector
// Description: Amazing offence and defence but somewhat weak elsewhere. Still,
//     Hector has got the stats where it counts.
//
//     Name: Knight Lord
// Promotion bonuses:
//     HP +4 STR +2 SPD +1 DEF +1 RES +3 CON +2 AID +2 MOV +4
// Weapons: sword, lance
// Caps:
//     STR 27 SKL 26 SPD 24 DEF 23 RES 25
// Characters of that class: Eliwood
// Description: Eliwood happens to be characteristically very balanced. This
// makes him somewhat weak but he is redeemed by Durandal and his status as a
// Lord.
