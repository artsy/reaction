import { Checkbox, Sans } from "@artsy/palette"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { data as sd } from "sharify"
import { FilterState, State } from "../../FilterState"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof State
}

const { ENABLE_MAKE_OFFER } = sd

export const WaysToBuyFilter: React.SFC<{
  filters: FilterState
}> = ({ filters }) => {
  const ways: WayToBuy[] = [
    {
      disabled: false,
      name: "Buy now",
      state: "acquireable",
    },
    {
      disabled: false,
      name: "Make offer",
      state: "offerable",
    },
    {
      disabled: filters.isRangeSelected("price_range"),
      name: "Bid",
      state: "at_auction",
    },
    {
      disabled: false,
      name: "Inquire",
      state: "inquireable_only",
    },
  ]

  if (!ENABLE_MAKE_OFFER) {
    ways.splice(1, 1)
  }

  const constructCheckboxes = mediator =>
    ways.map((way, index) => {
      const props = {
        disabled: way.disabled,
        key: index,
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
