import {CSSProperties} from "react";
import {hexCSS} from "./hexagonBoardTypes"
import HexMath from './HexMath';

function hexCss (hexColor:string, sidePixels:number, vertical:boolean = true) :hexCSS {
  const transparentColor = 'transparent'
  const halfSide = Math.round((sidePixels/2));
  // The 30:52 ratio in the border widths is approximately 1x:√3x which is ratio required for a hexagon.
  //transformations and calculations
  let apothem = Math.round(HexMath.sideToApothem(sidePixels));
  let shortDiagonal = Math.round(HexMath.sideToShortDiagonal(sidePixels));

  //formatting
  let transparentApothem = `${apothem}px solid ${transparentColor}`;
  let halfSideSolid = `${halfSide}px solid ${hexColor}`;

  if(!vertical){

    let hexOddCss :CSSProperties = {
      float: 'left',
      marginRight: `-${Math.round((apothem/2))}px`,
      marginBottom: `-${(apothem-2)}px`,
    }
    let hexEvenCss = {
      marginTop: `${(apothem+1)}px`,
      ...hexOddCss
    }
    let topOfHexCss = {
      float: 'left',
      width : 0,
      borderRight :  halfSideSolid,
      borderTop : transparentApothem,
      borderBottom: transparentApothem,
    };
    let middleOfHexCss = {
      float: 'left',
      width : `${sidePixels}px`,
      height: `${shortDiagonal}px`,
      backgroundColor: hexColor,
    }
    let bottomOfHexCss = {
      float: 'left',
      width : 0,
      borderLeft: halfSideSolid,
      borderTop: transparentApothem,
      borderBottom: transparentApothem,
    };
    let hexRowOdd = {
      clear: 'left',
    }
    let hexRowEven = {
      clear: 'left',
    }
    return {
      topOfHexCss,
      middleOfHexCss,
      bottomOfHexCss,
      hexRowOdd,
      hexRowEven,
      hexOddCss,
      hexEvenCss
    }
  }

  let hexOddCss :CSSProperties = {
    float:'left',
    marginLeft: `3px`,
    marginBottom: `-${Math.round((apothem/2))}px`,
  }
  let hexEvenCss = hexOddCss
  let topOfHexCss = {
    borderBottom: halfSideSolid,
    borderLeft: transparentApothem,
    borderRight: transparentApothem,
    width : 0,
  };
  let middleOfHexCss = {
    width : `${shortDiagonal}px`,
    height: `${sidePixels}px`,
    backgroundColor: hexColor
  }
  let bottomOfHexCss = {
    borderTop: halfSideSolid,
    borderLeft: transparentApothem,
    borderRight: transparentApothem,
    width : 0,
  };
  let hexRowOdd = {
    clear: 'left',
  }
  let hexRowEven = {
    marginLeft: `${(apothem+1)}px`,
    clear: 'left',
  }
  return {
    hexOddCss,
    hexEvenCss,
    topOfHexCss,
    middleOfHexCss,
    bottomOfHexCss,
    hexRowOdd,
    hexRowEven,
  }
}

export default hexCss;
