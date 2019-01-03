import { Checkbox, Sans } from "@artsy/palette"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { FilterState } from "../../FilterState"

export const WaysToBuyFilter: React.SFC<{
  filters: FilterState
}> = ({ filters }) => {
  const ways = [
    {
      disabled: false,
      hasWorks: this.existy.hasBuyNowArtworks,
      name: "Buy now",
      state: "acquireable",
    },
    {
      disabled: false,
      hasWorks: this.existy.hasMakeOfferArtworks,
      name: "Make offer",
      state: "offerable",
    },
    {
      disabled: filters.isPriceSelected(),
      hasWorks: this.existy.hasAuctionArtworks,
      name: "Bid",
      state: "at_auction",
    },
    {
      disabled: false,
      hasWorks: this.existy.hasForSaleArtworks,
      name: "Inquire",
      state: "inquireable_only",
    },
  ]

  const constructCheckboxes = mediator =>
    ways.map((way, index) => {
      const props = {
        disabled: way.disabled,
        onSelect: value => filters.setFilter(way.state, value, mediator),
        selected: filters.state[way.state],
      }

      return <Checkbox {...props}>{way.name}</Checkbox>
    })

  return (
    <ContextConsumer>
      {({ mediator }) => (
        <React.Fragment>
          <Sans size="2" weight="medium" color="black100" my={1}>
            Ways to buy
          </Sans>
          {constructCheckboxes(mediator)}
        </React.Fragment>
      )}
    </ContextConsumer>
  )
}
