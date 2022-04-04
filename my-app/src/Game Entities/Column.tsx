import Square from "./Square";

export default class Column {
    private rows: Square[];

    constructor(height:number) {
        this.rows = Column.generateRows(height);
    }

    private static generateRows (height:number):Square[]{
        if(height<1){
            throw Error('generate rows needs a positive integer');
        }
        let rows = [];
        for(let i =0; i<height; i++){
            rows.push(new Square())
        }
        return rows;
    }

}