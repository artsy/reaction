import { SelectSmall } from "@artsy/palette"
import React from "react"
import { Subscribe } from "unstated"
import { AuctionResultsState } from "../state"

const SORTS = [
  {
    value: "DATE_DESC",
    text: "Sale Date (Most recent)",
  },
  {
    value: "ESTIMATE_AND_DATE_DESC",
    text: "Estimate",
  },
  {
    value: "PRICE_AND_DATE_DESC",
    text: "Sale price",
  },
]

export const SortSelect = () => {
  return (
    <Subscribe to={[AuctionResultsState]}>
      {(filters: AuctionResultsState) => (
        <SelectSmall
          options={SORTS}
          selected={filters.state.sort}
          onSelect={filters.setSort}
        />
      )}
    </Subscribe>
  )
}
