import { Filters } from "./FilterContext"

export interface FilterPayload {
  value?: any
  name: string
}

export const filterReducer: (
  state: Filters,
  // TODO - figure out how to type payload so that set can take name/value and unset can take just name
  action: { type: string; payload: FilterPayload }
) => Filters = (state, action) => {
  switch (action.type) {
    case "set":
      return setFilterReducer(state, action.payload)
    case "unset":
      return unsetFilterReducer(state, action.payload)
    default:
      throw new Error("Unexpected action")
  }
}

const setFilterReducer: (state: Filters, payload: FilterPayload) => Filters = (
  state,
  payload
) => {
  return { ...state, [payload.name]: payload.value }
}

export const initialValueForField: (name: string) => any = name => {
  switch (name) {
    case "page":
      return 1
    case "major_periods":
      return []
    case "sort":
      return "-decayed_merch"
    case "price_range":
      return "*-*"
    default:
      return undefined
  }
}

const unsetFilterReducer: (
  state: Filters,
  payload: FilterPayload
) => Filters = (state, payload) => {
  return { ...state, [payload.name]: initialValueForField(payload.name) }
}
