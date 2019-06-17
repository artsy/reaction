import { Filters } from "./FilterContext"

export interface FilterPayload {
  value: any
  name: string
}

export const filterReducer: (
  state: Filters,
  action: { type: string; payload: FilterPayload }
) => Filters = (state, action) => {
  switch (action.type) {
    case "set":
      return setFilterReducer(state, action.payload)
    default:
      throw new Error("Unexpected action")
  }
}

const setFilterReducer: (state: Filters, payload: FilterPayload) => Filters = (
  state,
  payload
) => {
  switch (payload.name) {
    case "page":
      return { ...state, page: payload.value }
    case "medium":
      return { ...state, medium: payload.value }
    default:
      throw new Error("Unexpected property")
  }
}
