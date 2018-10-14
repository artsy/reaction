import { SystemProps } from "Artsy/SystemContext"
import React from "react"
import { FilterState } from "../../FilterState"

import { Checkbox, Sans } from "@artsy/palette"

export const WaysToBuyFilter: React.SFC<{
  enableBuyNow: boolean
  filters: FilterState
  mediator: SystemProps["mediator"]
}> = ({ enableBuyNow, filters, mediator }) => {
  return (
    <React.Fragment>
      <Sans size="2" weight="medium" color="black100" my={1}>
        Ways to buy
      </Sans>
      {enableBuyNow && (
        <Checkbox
          selected={filters.state.acquireable}
          onSelect={value => {
            return filters.setFilter("acquireable", value, mediator)
          }}
        >
          Buy now
        </Checkbox>
      )}
      <Checkbox
        selected={filters.state.at_auction}
        onSelect={value => filters.setFilter("at_auction", value, mediator)}
        disabled={filters.isPriceSelected()}
      >
        Bid
      </Checkbox>
      <Checkbox
        selected={filters.state.inquireable_only}
        onSelect={value =>
          filters.setFilter("inquireable_only", value, mediator)
        }
      >
        Inquire
      </Checkbox>
    </React.Fragment>
  )
}
