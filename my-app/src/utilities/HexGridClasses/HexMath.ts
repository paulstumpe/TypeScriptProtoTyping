export default class HexMath {

  static sideToApothem (side:number):number{
    // https://www.wikihow.com/Calculate-the-Apothem-of-a-Hexagon
    return  (side * (Math.sqrt(3)/2))
  }
  static sideToShortDiagonal(side:number):number{
    return (side * Math.sqrt(3));
  }
  static sideToLongDiagonal(side:number):number{
    return (side * 2);
  }

}
