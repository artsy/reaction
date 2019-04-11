import { Checkbox, Sans } from "@artsy/palette"
import { SystemContext } from "Artsy"
import React, { useContext } from "react"
import { FilterState, State } from "../../FilterState"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof State
}

export const WaysToBuyFilter: React.FC<{
  filters: FilterState
}> = ({ filters }) => {
  const { mediator } = useContext(SystemContext)

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

  const constructCheckboxes = () =>
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
    <React.Fragment>
      <Sans size="2" weight="medium" color="black100" my={1}>
        Ways to buy
      </Sans>
      {constructCheckboxes()}
    </React.Fragment>
  )
}
