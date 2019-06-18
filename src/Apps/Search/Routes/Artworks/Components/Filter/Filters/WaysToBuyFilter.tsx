import { Box, Checkbox, Sans, Spacer } from "@artsy/palette"
import { FilterContextValues, Filters } from "Apps/Search/FilterContext"
import React from "react"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof Filters
}

interface Props {
  filterContext: FilterContextValues
}

export class WaysToBuyFilter extends React.Component<Props> {
  onSelect(type, value) {
    const { filterContext } = this.props
    filterContext.setFilter(type, value)
  }

  render() {
    const { filterContext } = this.props
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
        disabled: filterContext.isRangeSelected("price_range"),
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
          onSelect: value => this.onSelect(way.state, value),
          selected: filterContext.filters[way.state] as boolean,
        }
        return <Checkbox {...props}>{way.name}</Checkbox>
      })

    return (
      <Box pt={1}>
        <Sans size="2" weight="medium" color="black100">
          Ways to buy
        </Sans>
        <Spacer mb={2} />
        {constructCheckboxes()}
      </Box>
    )
  }
}
