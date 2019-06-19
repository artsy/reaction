import { Box, Checkbox, Sans, Spacer } from "@artsy/palette"
import { Filters, useFilterContext } from "Apps/Search/FilterContext"
import React, { FC } from "react"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof Filters
}

export const WaysToBuyFilter: FC = () => {
  const filterContext = useFilterContext()
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
      disabled: !filterContext.isDefaultValue("price_range"),
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
        onSelect: value => filterContext.setFilter(way.state, value),
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
