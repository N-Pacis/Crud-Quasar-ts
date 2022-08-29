export interface Column{
  label:string
  field:string
  color?:string
  loadingWidth?:string
  align?:string
  width?:string
  cellColor?:(value: string | number) => string
  help?:string
}
