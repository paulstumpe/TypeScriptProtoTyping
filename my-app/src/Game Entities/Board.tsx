import Column from "./Column";

type boardConstructor = {
    height: number
    length: number
}

export default class Board {
    private height: number;
    private length: number;
    private columns: Column[];

    constructor({height, length}:boardConstructor) {
        this.height=height;
        this.length=length;
        this.columns = this.generateColumns(length);
    }

    private generateColumns(length:number):Column[]{
        if(length<1){
            throw Error('generate columns needs a positive integer');
        }
        let columns = [];
        for(let i =0; i<length; i++){
            columns.push(new Column(this.height))
        }
        return columns;
    }





}