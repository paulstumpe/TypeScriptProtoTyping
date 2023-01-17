// typepredicatefunction

// function isPerson(value: Person | PersonJson): value is Person {
//   return value.birthday instanceof Date;
// }





// assertion function

//  function assertNonNullable<T>(value: T): asserts value is NonNullable<T> {
//   if (value === undefined || value === null) {
//     throw new Error("undefined or null are not allowed");
//   }
// }
//
// function calcAge(
//   input: Date | null | undefined | string | Person | PersonJson
// ): number {
//   assertNonNullable(input);
//
//   if (typeof input === "string") {
//     return diffInYears(parse(input));
//   } else if (input instanceof Date) {
//     return diffInYears(input);
//   } else if (isPerson(input)) {
//     return diffInYears(input.birthday);
//   } else {
//     return diffInYears(parse(input.birthday));
//   }
// }
//
// import {selectHexWithUnit} from "../store/slices/hexSlice";
// import {HexStruct} from "../utilities/HexGridClasses/Structs/Hex";
//
// let targetHexes = targets.map(target=>selectHexWithUnit(state,target.id)).filter((targetHex):targetHex is HexStruct=>targetHex!==undefined);
//




export default {

}
