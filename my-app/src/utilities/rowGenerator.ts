import {hex} from "../Views/hexagonBoard/hexagonBoardTypes";

export default function rowGenerator (rowCount:number, columnCount:number):hex[][]{
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
