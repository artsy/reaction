import { Checkbox, Sans } from "@artsy/palette"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { FilterState } from "../../FilterState"

export const WaysToBuyFilter: React.SFC<{
  filters: FilterState
}> = ({ filters }) => (
  <ContextConsumer>
    {({ mediator }) => (
      <React.Fragment>
        <Sans size="2" weight="medium" color="black100" my={1}>
          Ways to buy
        </Sans>
        <Checkbox
          selected={filters.state.acquireable}
          onSelect={value => {
            return filters.setFilter("acquireable", value, mediator)
          }}
        >
          Buy now
        </Checkbox>
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
    )}
  </ContextConsumer>
)
