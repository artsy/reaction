export interface MarginProperties {
  m?: number
  mr?: number
  ml?: number
  mt?: number
  mb?: number
}

export interface FlexboxProperties {
  flexDirection?: "row" | "column"
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch"
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
}
