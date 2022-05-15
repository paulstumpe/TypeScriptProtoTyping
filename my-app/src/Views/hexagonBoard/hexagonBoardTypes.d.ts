
export type hex={
  data:string
}
export type boardSettings = {
  hexColor : string;
  pxUnit : number;
  vertical : boolean;
  rowCount : number;
  columnCount : number;
}
export type rowProps = {
  column: hex[],
  row: number,
  boardSettings:boardSettings,
}
export type rowsProps = {
  boardSettings:boardSettings,
}
export type hexProps = {
  hex:hex,
  column:number,
  row: number,
  boardSettings:boardSettings,
}
