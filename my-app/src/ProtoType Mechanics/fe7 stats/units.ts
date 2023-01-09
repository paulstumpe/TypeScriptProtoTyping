// A database of every character in their game and main details.
//
//     Opinions are not provided, in fear that they will influence the player's
// choices.
//
//     The numbers after the names of the supports indicate turns for the support
// levels: C, B and A respectively (as a ########## total).
//
// Standard -
// Name: name of character
// Description: game's description of character
// Class: class of character
// Recruitment details: recruitment information
// Starting stats: stats when first recruited
// Growth rates: (%) growth in each stat
// Affinity: affinity
// Supports: support options
//
// Lyn (Lady Lyndis)
// A young girl from the Lorca tribe. Stouthearted and kind.
//     Class: Lord -> Blade Lord
// Recruitment details: Prologue (Lyn Mode), rejoins Chapter 15E/16H
// automatically
// Starting stats: Lord L1 Vulnerary 3/3 Iron Sword 46/46
// HP 16 STR 4 SKL 7 SPD 9 DEF 2 RES 0 LUC 5 CON 5 MOV 5 AID 4 D sword
// Growth rates: (%)
// HP 70 STR 40 SKL 60 SPD 60 DEF 20 RES 30 LUC 55
// Affinity: wind
// Supports: Florina 2/22/42, Rath 17/37/57, Kent 21/48/75, Wil 22/49/76, Hector
// 27/54/81, Wallace 33/73/113, Eliwood 36/76/116
//
// Sain
// A knight in service to House Caelin. A bit of a scoundrel.
//     Class: Cavalier
// Recruitment details: Chapter 1, rejoins Chapter 15E/16H automatically
// Starting stats: Cavalier L1 Iron Lance 45/45
// HP 18 STR 8 SKL 4 SPD 6 DEF 6 RES 0 LUC 4 CON 9 MOV 7 AID 16 E lance D sword
// Growth rates: (%)
// HP 80 STR 60 SKL 35 SPD 40 DEF 20 RES 20 LUC 35
// Affinity: wind
// Supports: Kent 17/44/71, Fiora 21/81/121, Rebecca 41/81/121, Serra 41/81/121,
//     Priscilla 41/81/121, Isadora 81/161/241, Louise 81/161
//
// Kent
// A knight in service to House Caelin. Virtuous to a fault.
//     Class: Cavalier
// Recruitment details: Chapter 1, rejoins Chapter 15E/16H automatically
// Starting stats: Cavalier L1 Iron Sword 46/46 Iron Lance 45/45 Vulnerary 3/3
// HP 20 STR 6 SKL 6 SPD 7 DEF 5 RES 1 LUC 2 CON 9 MOV 7 AID 16 D sword E lance
// Growth rates: (%)
// HP 85 STR 40 SKL 50 SPD 45 DEF 25 RES 25 LUC 20
// Affinity: anima
// Supports: Sain 17/44/71, Lyn 21/48/75, Fiora 27/54/81, Wallace 33/73/113, Heath
// 41/81/121, Farina 81/161/241
//
// Florina
// A pegasus knight earning her title. A friend of Lyn's.
// Class: Pegasus Knight
// Recruitment details: Chapter 3 automatically, returns Chapter 15E/16H
// automatically
// Starting stats: Pegasus Knight L1 Slim Lance 30/30 Vulnerary 3/3
// HP 17 STR 5 SKL 7 SPD 9 DEF 4 RES 4 LUC 7 CON 4 MOV 7 AID 16 D lance
// Growth rates: (%)
// HP 60 STR 40 SKL 50 SPD 55 DEF 15 RES 35 LUC 50
// Affinity: light
// Supports: Lyn 2/22/42, Fiora 12/32/52, Farina 16/43/70, Ninian 21/41/61, Hector
// 38/78/118, Nino 41/81/121, Serra 81/161/241
//
// Wil
// A youth from Pherae, in the Lycian League. Very social.
//     Class: Archer
// Recruitment details: Chapter 3 visit the village, rejoins Chapter 15E/16H
// automatically
// Starting stats: Archer L2 Iron Bow 45/45
// HP 20 STR 6 SKL 5 SPD 5 DEF 5 RES 0 LUC 6 CON 6 MOV 5 AID 5 D bow
// Growth rates: (%)
// HP 75 STR 50 SKL 50 SPD 40 DEF 20 RES 25 LUC 40
// Affinity: wind
// Supports: Rebecca 17/44/71, Dart 21/48/75, Lyn 22/49/76, Rath 41/81/121,
//     Wallace 41/81/121, Raven 81/161/241
//
// Dorcas
// A man from a small village in Bern. Fights for his wife.
//     Class: Fighter
// Recruitment details: Chapter 4 talk to him with Lyn as he approaches (enemy)
// Starting stats: Fighter L3 Hand Axe 20/20
// HP 30 STR 7 SKL 7 SPD 6 DEF 3 RES 0 LUC 3 CON 14 MOV 5 AID 13 C axe
// Growth rates: (%)
// HP 80 STR 60 SPD 40 SPD 20 DEF 25 RES 15 LUC 45
// Affinity: fire
// Supports: Bartre 22/49/76, Geitz 27/54/81, Oswin 41/81/121, Vaida 41/81/121,
//     Farina 81/161/241
//
// Serra
// A cleric in service to House Ostia. Headstrong and bold.
//     Class: Cleric
// Recruitment details: Chapter 5 talk with Lyn, rejoins in Chapter 13E/12H
// Starting stats: Cleric L1 Heal 30/30 Vulnerary 3/3
// HP 17 MAG 2 SKL 5 SPD 8 DEF 2 RES 5 LUC 6 CON 4 MOV 5 AID 3 D staff
// Growth rates: (%)
// HP 50 MAG 50 SKL 30 SPD 40 DEF 15 RES 55 LUC 60
// Affinity: thunder
// Supports: Sain 41/81/121, Lucius 41/81/121, Hector 66/146/226,
//     Oswin 71/151/231, Matthew 76/156/236, Erk 79/159/239, Florina 81/161/241
//
// Erk
// A young mage from Etruria. Charming, but uptight.
//     Class: Mage
// Recruitment details: Chapter 5 joins with Serra, talk with Serra or Priscilla
// to him in Chapter 14E/14H
// Weapons: anima, staff
// Starting stats: Mage L1 Fire 40/40
// HP 17 MAG 5 SKL 6 SPD 7 DEF 2 RES 4 LUC 3 CON 5 MOV 5 AID 4 D anima
// Growth rates: (%)
// HP 65 MAG 40 SKL 40 SPD 50 DEF 20 RES 40 LUC 30
// Affinity: thunder
// Supports:
//     Pent 19/46, Priscilla 22/49/76, Nino 27/54/81, Louise 31/71, Serra 79/159/239
//
// Rath
// A young hired sword from the Kutolah tribe.
//     Class: Nomad
// Recruitment details: Chapter 6 automatically, Chapter 21E/22H talk with Lyn
//     Starting stats: Nomad L7 Short Bow 22/22 Vulnerary 3/3
// HP 25 STR 8 SKL 9 SPD 10 DEF 7 RES 5 CON 7 MOV 7 AID 18 C bow
// Growth rates: (%)
// HP 80 STR 50 SKL 40 SPD 50 DEF 10 RES 25 LUC 30
// Affinity: darkness
// Supports: Lyn 17/37/57, Guy 21/41/61, Wil 41/81/121
//
// Matthew
// A cheery thief. His casual demeanor belies his skill.
//     Class: Thief
// Recruitment details: Chapter 6 visit the north village, Chapter 13E/11H
// automatically
// Starting stats: Thief L2 Iron Sword 46/46 Lockpick 15/15
// HP 18 STR 4 SKL 4 SPD 11 DEF 3 RES 0 LUC 2 CON 7 MOV 6 AID 6 D sword
// Growth rates: (%)
// HP 75 STR 30 SKL 40 SPD 70 DEF 25 RES 20 LUC 50
// Affinity: wind
// Supports: Hector 21/48/75, Guy 24/51/78, Oswin 38/78/118, Legault 41/81/121,
//     Serra 76/156/236, Jaffar 81/161/241
//
// Lucius
// A travelling acolyte. Gentle and serene.
//     Class: Monk
// Recruitment details: joins in Chapter 7, rejoins in Chapter 16E/17H
// Starting stat####### L3 Lightning Vulnerary
// HP 18 MAG 7 SKL 6 SPD 10 DEF 1 RES 6 LUC 2 CON 6 MOV 5 AID 5 D light
// Growth rates: (%)
// HP 55 MAG 60 SKL 50 SPD 40 DEF 10 RES 60 LUC 20
// Affinity: light
// Supports: Raven 17/44/71, Priscilla 38/78/118, Serra 41/81/121, Renault
// 41/81/121, Karel 81/161/241
//
// Nils
// A bard possessing arcane powers. Brother of Ninian.
//     Ninian
// A sombre girl. Quiet, but filled with a solemn energy.
//     Class: Bard, Dancer
// Recruitment details: Joins in Chapter 7, Ninian joins in Chapter 20 Eliwood/
// Chapter 21 Hector. After Ninian dies, Nils rejoins in Chapter 30 Eliwood/ 32
// Hector.
//     Starting stats: Bard L1 Vulnerary
// HP 14 STR 0 SKL 0 SPD 12 DEF 5 RES 4 LUC 10 CON 3 MOV 5 AID 2
// Ninian joins with the same stats as Nils had but 1 more CON and with Nini's
// Grace. Nils rejoins with the same stats and items as Ninian had.
//     Growth rates: (%)
// HP 85 STR 5 SKL 5 SPD 70 DEF 30 RES 70 LUC 80
// Affinity: ice
// Supports: Only Ninian can support.
//     Eliwood 17/33/49, Florina 21/41/61, Hawkeye 27/54/81
//
// Wallace
// A retired knight of Caelin. Constantly testing himself.
//     Class: Knight
// Recruitment details: joins in Chapter 9 automatically, rejoins in Chapter 23
// Eliwood Lloyd route/ Chapter 24 Hector Lloyd route
// Starting stats: Knight L12 Iron Lance Iron Axe Knight Crest
// HP 30 STR 13 SKL 7 SPD 5 DEF 15 RES 2 LUC 10 CON 13 MOV 4 AID 12 A lance
// Growth rates: (%)
// HP 70 STR 45 SKL 40 SPD 20 DEF 35 RES 35 LUC 30
// Affinity: thunder
// Supports: Lyn 33/73/113, Kent 33/73/113, Wil 41/81/121, Vaida 41/81/121,
//     Renault 41/81/121
//
// Eliwood
// Marquess Pherae's young son. Just and honorable.
// Class: Lord
// Recruitment details: automatically in Chapter 11 Eliwood/Chapter 12 Hector
// Starting stats: Lord L1 Rapier Vulnerary
// HP 18 STR 5 SKL 5 SPD 7 DEF 5 RES 0 LUC 7 CON 7 MOV 5 AID 6 C sword
// Growth rates: (%)
// HP 80 STR 45 SKL 50 SPD 40 DEF 30 RES 35 LUC 45
// Affinity: anima
// Supports: Hector 3/30/57, Ninian 17/33/49, Harken 19/46/73, Marcus 28/68/108,
//     Lowen 31/71/111, Lyn 36/76/116, Fiora 41/81/121
//
// Marcus
// A paladin serving House Pherae. A skilled veteran.
//     Class: Paladin
// Recruitment details: Joins Chapter 11 Eliwood/12 Hector automatically
// Starting stats: Paladin L1 Steel Sword Steel Lance (Silver Lance in Hard Mode)
// HP 31 STR 15 SKL 15 SPD 11 DEF 10 RES 8 LUC 8 CON 11 MOV 8 AID 14 A lance
// A sword B axe
// Growth rates: (%)
// HP 65 STR 30 SKL 50 SPD 25 DEF 15 RES 35 LUC 30
// Affinity: ice
// Supports: Lowen 21/48/75, Isadora 22/49/76, Eliwood 28/68/108,
//     Harken 31/71/111, Merlinus 41/81/121
//
// Lowen
// A knight in service to House Pherae. A fresh recruit.
//     Class: Cavalier
// Recruitment details: automatically in Chapter 11 Eliwood/Chapter 12 Hector
// Starting stats: Cavalier L2 Iron Lance Iron Sword
// HP 23 STR 7 SKL 5 SPD 7 DEF 7 RES 0 LUC 3 CON 10 MOV 7 AID 15 D lance D sword
// Growth rates: (%)
// HP 90 STR 30 SKL 30 SPD 30 DEF 40 RES 30 LUC 50
// Affinity: fire
// Supports: Marcus 21/48/75, Harken 22/49/76, Isadora 24/51/78,
//     Eliwood 31/71/111, Rebecca 38/78/118
//
// Rebecca
// A youth from Pherae. Very helpful and bright.
//     Class: Archer
// Recruitment details: Joins Chapter 11 Eliwood/Chapter 12 Hector automatically
// Starting stats: Archer L1 Iron Bow Vulnerary
// HP 17 STR 4 SKL 5 SPD 6 DEF 3 RES 1 LUC 4 CON 5 MOV 5 AID 4 D bow
// Growth rates: (%)
// HP 60 STR 40 SKL 50 SPD 60 DEF 15 RES 30 LUC 50
// Affinity: fire
// Supports: Dart 16/43/70, Wil 17/44/71, Louise 27/54, Nino 27/54/81, Lowen
// 38/78/118, Sain 41/81/121, Raven 41/81/121
//
// Bartre
// One of Eliwood's guardmen. Duty is everything to him.
// Class: Fighter
// Recruitment details: Joins on Turn 2 in Chapter 11 Eliwood, automatically in
// Chapter 12 Hector
// Starting stats: Fighter L2 Iron Axe Hand Axe
// HP 29 STR 9 SKL 5 SPD 3 DEF 4 RES 0 LUC 4 CON 13 MOV 5 AID 12 D axe
// Growth rates: (%)
// HP 85 STR 50 SKL 35 SPD 40 DEF 30 RES 25 LUC 30
// Affinity: thunder
// Supports: Karla 19/39/59, Dorcas 22/49/76, Canas 41/81/121, Raven 81/161/241,
//     Renault 81/161/241
//
// Hector
// Marquess Ostia's younger brother. Reckless, but loyal.
// Class: Lord -> Great Lord
// Recruitment details: Joins on Turn 3 Chapter 12 Eliwood, automatically
// Chapter 11 Hector
// Starting stats: Lord L1 Wolf Beil Vulnerary
// HP 19 STR 7 SKL 4 SPD 5 DEF 8 RES 0 LUC 3 CON 13 MOV 5 AID 12 D axe
// Growth rates: (%)
// HP 90 STR 60 SJK 45 SPD 35 DEF 50 RES 25 LUC 30
// Affinity: thunder
// Supports: Eliwood 3/30/57, Matthew 21/48/75, Lyn 27/54/81, Oswin 31/71/111,
//     Florina 38/78/118, Serra 66/146/226, Farina 81/161/241
//
// Oswin
// A knight in service to House Ostia. Hector's sworn man.
// Class: Knight
// Recruitment details: Joins automatically Turn 3 Chapter 12 Eliwood, joins
// automatically Chapter 12 Hector
// Starting stats: Knight L9 Iron Lance Javelin
// HP 28 STR 13 SKL 9 SPD 5 DEF 13 RES 3 LUC 3 CON 14 MOV 4 AID 13 B lance
// Growth rates: (%)
// HP 90 STR 40 SKL 30 SPD 30 DEF 55 RES 30 LUC 35
// Affinity: anima
// Supports: Hector 31/71/111, Matthew 38/78/118, Priscilla 41/81/121, Dorcas
// 41/81/121, Serra 71/151/231
//
// Guy
// A youth from Sacae. Yearns to be a swordmaster.
//     Class: Myrmidon
// Recruitment details: Chapter 13 Eliwood/Chapter 13 Hector as an enemy, recruit
// with Matthew
//     Starting stats: Myrmidon L3 Killing Edge Vulnerary
// HP 21 STR 6 SKL 11 SPD 11 DEF 5 RES 0 LUC 5 CON 5 MOV 5 AID 4 C sword
// Growth rates: (%)
// HP 75 STR 30 SKL 50 SPD 70 DEF 15 RES 25 LUC 45
// Affinity: fire
// Supports: Rath 21/41/61, Matthew 24/51/78, Karel 26/53/80, Priscilla 41/81/121,
//     Louise 81/161
//
// Merlinus
// A travelling merchant. Timid and easily frightened.
//     Class: Merchant
// Recruitment details: Joins in Chapter 14 Eliwood/Chapter 14 Hector
// automatically if you completed Chapter 13x
// Starting stats: Merchant L5
// HP 18 STR 0 SKL 4 SPD 5 DEF 5 RES 2 LUC 12 CON 25 MOV 0 AID 24
// Growth rates: (%)
// HP 120 STR 0 SKL 90 SPD 90 DEF 30 RES 15 LUC 100
// Affinity: darkness
// Supports: Marcus 41/81/121, Nino 41/81/121, Vaida 81/161/241
//
// Priscilla
// A vassal in service to Count Caerleon of Etruria.
//     Class: Troubadour
// Recruitment details: Chapter 14 Eliwood/Chapter 14 Hector in the southern
// village, visit with anyone
//     Starting stats: Troubadour L3 Mend Vulnerary
// HP 16 MAG 6 SKL 6 SPD 8 DEF 3 RES 6 LUC 7 CON 4 MOV 7 AID 16 C staff
// Growth rates: (%)
// HP 45 MAG 40 SKL 50 SPD 40 DEF 15 RES 50 LUC 65
// Affinity: wind
// Supports: Raven 21/48/75, Erk 22/49/76, Lucius 38/78/118, Guy 41/81/121,
//     Heath 41/81/121, Oswin 41/81/121, Sain 41/81/121
//
// Raven
// A troubled mercenary with a grudge against House Ostia.
//     Class: Mercenary
// Recruitment details: Chapter 16 Eliwood/Chapter 17 Hector as an enemy, recruit
// with Priscilla quickly before he butchers/gets killed by the soldiers.
//     Starting stats: Mercenary L5 Steel Sword
// HP 25 STR 8 SKL 11 SPD 13 DEF 5 RES 1 LUC 2 CON 8 MOV 5 AID 7 C sword
// Growth rates: (%)
// HP 85 STR 55 SKL 40 SPD 45 DEF 25 RES 15 LUC 35
// Affinity: ice
// Supports: Lucius 17/44/71, Priscilla 21/48/75, Rebecca 41/81/121, Wil
// 81/161/241, Bartre 81/161/241
//
// Canas
// A scholar, and a novice student to ancient magics.
//     Class: Shaman
// Recruitment details: Chapter 16x Eliwood/Chapter 17x Hector, visit the village
// right next to the Inn
// Starting stats: Shaman L8 Flux Secret Book Vulnerary
// HP 21 MAG 10 SKL 9 SPD 8 DEF 5 RES 8 LUC 7 CON 7 MOV 5 AID 6 B dark
// Growth rates: (%)
// HP 70 MAG 45 SKL 40 SPD 35 DE F25 RES 45 LUC 25
// Affinity: anima
// Supports: Pent 27/54, Nino 27/54/81, Renault 41/81/121, Bartre 41/81/121,
//     Vaida 41/81/121
//
// Dart
// One of Fargus's corsairs. Foulmouthed, but kind.
// Class: Pirate
// Recruitment details: Chapter 18 Eliwood/Chapter 19 Hector automatically if
//     he was kept alive in Chapter 16x Eliwood/Chapter 17x Hector
// Starting stats: Pirate L8 Steel Axe Hand Axe Torch
// HP 34 STR 12 SKL 8 SPD 8 DEF 6 RES 1 LUC 3 CON 10 MOV 5 AID 9 B axe
// Growth rates: (%)
// HP 70 STR 65 SKL 20 SPD 60 DEF 20 RES 15 LUC 35
// Affinity: fire
// Supports: Rebecca 16/43/70, Wil 21/48/75, Geitz 41/81/121, Karel 41/81/121,
//     Farina 41/81/121
//
// Fiora
// Commander of the 5th wing of Ilia's pegasus knights.
// Class: Pegasus Knight
// Recruitment details: Chapter 18 Eliwood/Chapter 19 Hector as an ally on turn
// 2, recruit with Florina
//     Starting stats: Pegasus Knight L7 Steel Lance Javelin Vulnerary
// HP 21 STR 8 SKL 11 SPD 13 DEF 6 RES 7 LUC 6 CON 5 MOV 7 AID 15 C lance
// Growth rates: (%)
// HP 70 STR 35 SKL 60 SPD 50 DEF 20 RES 50 LUC 30
// Affinity: wind
// Supports: Florina 12/32/52, Farina 17/44/71, Kent 27/54/81, Pent 36/76,
//     Sain 41/81/121, Eliwood 41/81/121, Geitz 81/161/241
//
// Legault
// A former Black Fang once known as the Hurricane.
//     Class: Thief
// Recruitment details: Appears as an enemy in Chapter 19 Eliwood/Chapter 20
// Hector. Recruit with the main lord or Lyn.
//     Starting stats: Thief L12 Steel Sword Lockpick (NM) Chest Key (HM) Door Key
// (HM) C sword
// HP 26 STR 8 SKL 11 SPD 15 DEF 8 RES 3 LUC 10 CON 9 MOV 6 AID 8
// Growth rates: (%)
// HP 60 STR 25 SKL 45 SPD 60 DEF 25 RES 25 LUC 60
// Affinity: ice
// Supports: Matthew 41/81/121, Heath 41/81/121, Nino 41/81/121, Jaffar
// 76/156/236, Isadora 81/161/241
//
// Isadora
// A paladin in service to House Pherae. Modest and polite.
//     Class: Paladin
// Recruitment details: Joins automatically in Chapter 21 Eliwood/Chapter 22
// Hector
// Starting stats: Paladin L1 Silver Sword Short Spear Angelic Robe
// HP 28 STR 13 SKL 12 SPD 16 DEF 8 RES 6 LUC 10 CON 6 MOV 8 AID 14 A sword B
// lance D axe
// Growth rates: (%)
// HP 75 STR 30 SKL 35 SPD 50 DEF 20 RES 25 LUC 45
// Affinity: darkness
// Supports: Harken 11/31/51, Marcus 22/49/76, Lowen 24/51/78, Geitz 41/81/121,
//     Sain 81/161/241, Legault 81/161/241, Renault 81/161/241
//
// Heath
// A deserter from Bern's wyvern riders. Prideful.
// Class: Wyvern Rider
// Recruitment details: Appears as an enemy in Chapter 21 Eliwood/Chapter 22
// Hector, recruit with any lord
// Starting stats: Wyvern Rider L7 Axereaver Javelin
// HP 28 STR 11 SKL 8 SPD 7 DEF 10 RES 1 LUC 7 CON 9 MOV 7 AID 16 B lance
// Growth rates: (%)
// HP 80 STR 50 SKL 50 SPD 45 DEF 30 RES 20 LUC 20
// Affinity: thunder
// Supports: Vaida 41/81/121, Priscilla 41/81/121, Legault 41/81/121, Kent
// 41/81/121, Louise 81/161
//
// Hawkeye
// The protector of Nabata. A mysterious air surrounds him.
//     Class: Berserker
// Recruitment details: Appears on Turn 3 in Chapter 22 Eliwood/Chapter 23 Hector
// as an ally, recruit with main lord
// Starting stats: Berserker L4 Killer Axe
// HP 50 STR 18 SKL 14 SPD 11 DEF 14 RES 10 LUC 13 CON 16 MOV 6 AID 15 A axe
// Growth rates: (%)
// HP 50 STR 40 SKL 30 SPD 45 DEF 30 RES 20 LUC 20
// Affinity: wind
// Supports: Pent 21/48, Louise 21/48, Ninian 27/54/81
//
// Geitz
// The eldest son of a wealthy merchant. Finding himself.
//     Class: Warrior
// Recruitment details: Starts as an enemy in Chapter 23 Eliwood Linus/Chapter 24
// Hector Linus, recruit with Dart
//     Starting stats: Warrior L3 Steel Bow Killer Axe
// HP 40 STR 17 SKL 12 SPD 13 DEF 11 RES 3 LUC 10 CON 13 MOV 6 AID 12 B axe B bow
// Growth rates: (%)
// HP 85 STR 50 SKL 30 SPD 40 DEF 20 RES 20 LUC 40
// Affinity: thunder
// Supports: Dorcas 27/54/81, Dart 41/81/121, Isadora 41/81/121, Karel 41/81/121,
//     Fiora 81/161/241
//
// Pent
// Marquess of Reglay. Sole student of Archsage Athos.
//     Class: Sage
// Recruitment details: Joins automatically Chapter 24 Eliwood/Chapter 26 Hector
// Starting stats: Sage L6 Elfire Physic
// HP 33 MAG 18 SKL 21 SPD 17 DEF 11 RES 16 LUC 14 CON 8 MOV 6 AID 7 A staff A
// anima
// Growth rates: (%)
// HP 50 MAG 30 SKL 20 SPD 40 DEF 30 RES 35 LUC 40
// Affinity: ice
// Supports: Louise (auto), Erk 19/46, Hawkeye 21/48, Canas 27/54, Fiora 36/76
//
// Louise
// The wife of Marquess Reglay. A lethal beauty.
//     Class: Sniper
// Recruitment details: Joins automatically Chapter 24 Eliwood/Chapter 26 Hector
// Starting stats: Sniper L4 Silver Bow White Gem Elixir
// HP 28 STR 12 SKL 14 SPD 17 DEF 9 RES 12 LUC 16 CON 6 MOV 6 AID 5 A bow
// Growth rates: (%)
// HP 60 STR 40 SKL 40 SPD 40 DEF 20 RES 30 LUC 30
// Affinity: light
// Supports: Pent (auto), Hawkeye 21/48, Rebecca 27/54, Erk 31/71, Guy 81/161,
//     Heath 81/161, Sain 81/161
//
// Karel
// An eastern swordmaster. Seeking worthy opponents.
//     Class: Swordmaster
// Recruitment details: Appears as an ally in Chapter 25 Eliwood/Chapter 27 Hector
// Jerme if 4 or more doors have been opened, Kenneth if 3 or more promoted units
// have been killed on the 9th turn, talk with Lyn
//     Starting stats: Swordmaster L8 Wo Dao
// HP 31 STR 16 SKL 23 SPD 20 DEF 13 RES 12 LUC 15 CON 9 MOV 6 AID 8 A sword
// Growth rates: (%)
// HP 70 STR 30 SKL 50 SPD 50 DEF 10 RES 15 LUC 30
// Affinity: light
// Supports: Karla 28/68/108, Guy 26/53/80, Dart 41/81/121, Geitz 41/81/121,
//     Lucius 81/161/241
//
// Harken
// The sole survivor of the Knights of Pherae.
//     Class: Hero
// Recruitment details: Appears as an enemy in Chapter 25 Eliwood/Chapter 27
// Hector Jerme if less than 4 doors have been opened, Kenneth if 3 or less
// promoted units have been killed on the 9th turn, talk with anyone from Pherae
// or Ostia
// Starting stats: Hero L8 Brave Sword
// HP 38 STR 21 SKL 20 SPD 17 DEF 15 RES 10 LUC 12 CON 11 MOV 6 AID 10 B sword
// B axe
// Growth rates: (%)
// HP 80 STR 35 SKL 30 SPD 40 DEF 30 RES 25 LUC 20
// Affinity: fire
// Supports: Isadora 11/31/51, Eliwood 19/46/73, Lowen 22/49/76, Marcus 31/71/111,
//     Vaida 81/161/241
//
// Nino
// One of the Black Fang. True and innocent.
//     Class: Mage
// Recruitment details: In Chapter 26 Eliwood/Chapter 28 Hector, talk with Lyn or
// the main lord; she appears as an ally
// Starting stats: Mage L5 Elfire Elixir
// HP 19 MAG 7 SKL 8 SPD 11 DEF 4 RES 7 LUC 10 CON 3 MOV 5 AID 2 C anima
// Growth rates: (%)
// HP 55 MAG 50 SKL 55 SPD 60 DEF 15 RES 50 LUC 45
// Affinity: fire
// Supports: Jaffar 19/46/73, Erk 27/54/81, Canas 27/54/81, Rebecca 27/54/81,
//     Legault 41/81/121, Florina 41/81/121, 41/81/121
//
// Jaffar
// The Black Fang's Angel of Death. Once served Nergal.
// Class: Assassin
// Recruitment details: He is an ally in Chapter 26 Eliwood/Chapter 28 Hector.
//     Talk with Nino, but he will not be recruited. He will automatically join in
// Chapter 26x Eliwood/Chapter 28x Hector
// Starting stats: Assassin L13 Killing Edge Elixir
// HP 34 STR 19 SKL 25 SPD 24 DEF 15 RES 11 LUC 10 CON 8 MOV 6 AID 7 A sword
// Growth rates: (%)
// HP 65 STR 15 SKL 40 SPD 35 DEF 30 RES 30 LUC 20
// Affinity: ice
// Supports: Nino 19/46/73, Legault 76/156/236, Matthew 81/161/241
//
// Vaida
// A deserter from Bern's wyvern riders. Brutal.
// Class: Wyvern Lord
// Recruitment details: In Chapter 27 Eliwood/Chapter 29 Hector, she will appear
// when your party has reached the fortresses in the middle, below the throne
// where the boss sits. She will be an enemy, recruit her with the main lord.
//     Starting stats: Wyvern Lord L9 Spear
// HP 43 STR 20 SKL 19 SPD 13 DEF 21 RES 6 LUC 11 CON 12 MOV 8 AID 8 A lance
// A sword
// Growth rates: (%)
// HP 60 STR 45 SKL 25 SPD 40 DEF 25 RES 15 LUC 30
// Affinity: fire
// Supports: Heath 41/81/121, Canas 41/81/121, Wallace 41/81/121, Karla
// 41/81/121, Dorcas 41/81/121, Harken 81/161/241, Merlinus 81/161/241
//
// Renault
// A cleric wandering Valor. Shrouded in mystery.
//     Class: Bishop
// Recruitment details: Chapter 30 Eliwood/Chapter 32 Hector, visit the village
// in the far north west before the enemy reinforcements first start coming
// Starting stats: Bishop L16 Divine Fortify
// HP 43 MAG 12 SKL 22 SPD 20 DEF 15 RES 18 LUC 10 CON 9 MOV 6 AID 8 A staff
// A light
// Growth rates: (%)
// HP 60 MAG 40 SKL 30 SPD 35 DEF 20 RES 40 LUC 15
// Affinity: anima
// Supports: Lucius 41/81/121, Canas 41/81/121, Wallace 41/81/121, Isadora
// 81/161/241, Bartre 81/161/241
//
// Farina
// Commander of the 13th Wing of Ilia's pegasus knights.
// Class: Pegasus Knight
// Recruitment details: Farina appears as an ally in Chapter 25 Hector only.
//     When she flies and talks to Hector, pay her 20000G and she will join you.
//     Starting stats: Pegasus Knight L12 Javelin Iron Lance Vulnerary
// HP 24 STR 10 SKL 13 SPD 14 DEF 10 RES 12 LUC 10 CON 5 MOV 7 AID 15 A lance
// Growth rates: (%)
// HP 75 STR 50 SKL 40 SPD 45 DEF 25 RES 30 LUC 45
// Affinity: anima
// Supports: Florina 16/43/70, Fiora 17/44/71, Dart 41/81/121, Karla 41/81/121,
//     Dorcas 81/161/241, Hector 81/161/241, Kent 81/161/241
//
// Karla
// A dedicated swordfighter. Cool and detached.
//     Class: Swordmaster
// Recruitment details: In Chapter 31x Hector only. If Bartre is a level 5 Warrior
// or higher, she will appear as an ally near the arena. Talk with Bartre. She
//     will fight Bartre. BOTH MUST SURVIVE (I highly recommend an Iron Rune on
// Bartre, as well as using a bow so he can't hit her). She will join you.
// Starting stats: Swordmaster L5 Wo Dao
// HP 29 STR 14 SKL 21 SPD 18 DEF 11 RES 12 LUC 16 CON 7 MOV 6 AID 6 A sword
// Growth rates: (%)
// HP 60 STR 25 SKL 45 SPD 55 DEF 10 RES 20 LUC 40
// Affinity: darkness
// Supports: Bartre 19/39/59, Karel 28/68/108, Farina 41/81/121, Vaida 41/81/121
//
// Athos
// An archsage. One of the eight legendary heroes.
//     Class: Archsage
// Recruitment details: Joins automatically in the Final Chapter: Light
// Starting stats: Archsage L20 Forblaze Aureola Durandal Armads Sol Katti
// HP 40 MAG 30 SKL 24 SPD 20 DEF 20 RES 28 LUC 25 CON 9 MOV 6 AID 8 S all magics
// Growth rates: (%) None, already fully levelled
// Affinity: anima
// Supports: Cannot support