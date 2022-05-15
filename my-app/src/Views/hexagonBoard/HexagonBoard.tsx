import {CSSProperties, useState} from "react";
import {hexProps, rowProps, rowsProps, hex, boardSettings} from "./hexagonBoardTypes"



let defaultBoardSettings = {
    hexColor : `#6C6`,
    pxUnit : 60,
    vertical : false,
    rowCount : 4,
    columnCount : 4,
}

class HexMath {

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


function HexagonBoard() {
    let [boardSettings, setBoardSettings] = useState(defaultBoardSettings)
    return (
        <div>
            <Rows boardSettings={boardSettings} />
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

function Rows ({boardSettings}:rowsProps){
    const { rowCount, columnCount } = boardSettings;
    let rows = rowGenerator(rowCount,columnCount);
    return (
        <>
            {rows.map((column, row)=>(
                <Row column={column} row={row} boardSettings={boardSettings}/>
                ))}
        </>

    );
}

function Row ({column, row, boardSettings}:rowProps){
    const {hexColor, pxUnit, vertical} = boardSettings;
    let hexStyles = hexCss(hexColor, pxUnit, vertical)
    return (

        <div className={'row'} style={oddOrEven(row)? hexStyles.hexRowEven: hexStyles.hexRowOdd}>
        {column.map((hex,column)=>(
                <Hex hex={hex} column={column} row={row} boardSettings={boardSettings} />
            )
            )}
        </div>
    )
}
function oddOrEven(number:number):boolean{
    return !!(number % 2)
}


function Hex ({hex, column, row, boardSettings}:hexProps){
    const {hexColor, pxUnit, vertical} = boardSettings;
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


export default HexagonBoard;
