import {CSSProperties} from "react";
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

function HexagonBoard({}:props) {

    return (
        <div>
            <Rows/>
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

    let rows = rowGenerator(20,80);
    return (
        <div>
            {rows.map((column, row)=>(
                <Columns column={column} row={row}/>
                ))}
        </div>

    );
}

type columnsProps ={
    column: hex[],
    row: number
}
function Columns ({column, row}:columnsProps){
    return (

        <div style={{display: 'flex'}}>
        {column.map((hex,column)=>(
                <Hex hex={hex} column={column} row={row} />
            )
            )}
        </div>
    )
}
function oddOrEven(number:number){
    return number % 2
}

type hexProps ={
    hex:hex,
    column:number,
    row: number,
}

function Hex ({hex, column, row}:hexProps){
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
