import {CSSProperties, useState} from "react";
let hexpic2 ={
    width:600,
    height:600,
    leftAdjustor: 180,
    halfHeight: 300
}
let ratio: 20
let asPercents = {
    width:1.00,
    height:1.00,
    leftAdjustor: .27,
    halfHeight: .48,
    otherHeights : .08
}
let chosenSize = 30

type hex={
    data:string
}


type props = {

}

let hex = {
    data:'data'
}
let hexColor = `#6C6`
let pxUnit = 60;
const vertical = false
;


class HexMath {

    static sideToApothem (side:number):number{
        // (side/2) squared + (a) squared = side squared;
        // apothem = square root(side squared + (side/2)squared)
        // apothem = side / (2 * tan(180/6)
        // apothem = side / (2 * tan(30))

        // √3/2 * side
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


function HexagonBoard({}:props) {

    return (
        <div>
            <Rows />
        </div>

    );
}

function rowGenerator (rowCount:number, columnCount:number):hex[][]{
    let toReturn = []
    for(let i = 0; i<rowCount; i++){
        let row= [];
        for(let j = 0; j<columnCount; j++){
            let hex = {
                data:'data'
            }
            row.push(hex);
        }
        toReturn.push(row);
    }
    return toReturn;

}

function Rows (){

    let rows = rowGenerator(4,4);
    return (
        <>
            {rows.map((column, row)=>(
                <Row column={column} row={row}/>
                ))}
        </>

    );
}

type columnsProps ={
    column: hex[],
    row: number
}
function Row ({column, row}:columnsProps){
    let hexStyles = hexCss(hexColor, pxUnit, vertical)
    return (

        <div className={'row'} style={oddOrEven(row)? hexStyles.hexRowEven: hexStyles.hexRowOdd}>
        {column.map((hex,column)=>(
                <Hex hex={hex} column={column} row={row} />
            )
            )}
        </div>
    )
}
function oddOrEven(number:number):boolean{
    return !!(number % 2)
}

type hexProps ={
    hex:hex,
    column:number,
    row: number,
}

function Hex ({hex, column, row}:hexProps){
    // let evenColumn = !!oddOrEven(column)
    // let third =  !! (row % 3)
    // let left = (column* (chosenSize*asPercents.leftAdjustor))
    // let top = (row*(chosenSize*asPercents.height));
    // if(evenColumn){
    //     top += chosenSize*asPercents.halfHeight
    // }
    // top-= (row * chosenSize * .04)
    //
    //
    let hexStyles = hexCss(hexColor, pxUnit, vertical)

    const [clicked, setClicked] = useState(false);
    if (clicked){
        hexStyles = hexCss('blue', pxUnit, vertical)
    }
    const onClick = ()=>{
        console.log('clicked')
        setClicked(!clicked)
    }
    return (
      <div className={'hex'} style={oddOrEven(column)? hexStyles.hexEvenCss: hexStyles.hexOddCss}>
        <div onClick={onClick} style={hexStyles.topOfHexCss}/>
        <div onClick={onClick} style={hexStyles.middleOfHexCss}/>
        <div onClick={onClick} style={hexStyles.bottomOfHexCss}/>
      </div>
    );
}

interface hexCSS  {
    hexOddCss: object;
    hexEvenCss: object;
    topOfHexCss : object;
    middleOfHexCss : object;
    bottomOfHexCss : object;
    hexRowOdd : object;
    hexRowEven : object;

}

function oldHex ({hex, column, row}:hexProps){
    let evenColumn = !!oddOrEven(column)
    let third =  !! (row % 3)
    let left = (column* (chosenSize*asPercents.leftAdjustor))
    let top = (row*(chosenSize*asPercents.height));
    if(evenColumn){
        top += chosenSize*asPercents.halfHeight
    }
    top-= (row * chosenSize * .04)



    let style :CSSProperties = {
        maxWidth: (chosenSize)+'px',
        position: 'absolute',
        left: left,
        top: top,
    }
    return (
                <img style={style} src={"assets/hexpic2.png"} alt={'woops'}/>
    );
}

export default HexagonBoard;
