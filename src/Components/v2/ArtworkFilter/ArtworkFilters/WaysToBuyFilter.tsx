import { Box, Checkbox, Sans, Spacer } from "@artsy/palette"
import React, { FC } from "react"

import {
  ArtworkFilters,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof ArtworkFilters
}

export const WaysToBuyFilter: FC = () => {
  const filterContext = useArtworkFilterContext()

  const checkboxes: WayToBuy[] = [
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

  return (
    <Box pt={1}>
      <Sans size="2" weight="medium" color="black100">
        Ways to buy
      </Sans>
      <Spacer mb={2} />
      {checkboxes.map((checkbox, index) => {
        const props = {
          disabled: checkbox.disabled,
          key: index,
          onSelect: value => filterContext.setFilter(checkbox.state, value),
          selected: Boolean(filterContext.filters[checkbox.state]),
        }
        return <Checkbox {...props}>{checkbox.name}</Checkbox>
      })}
    </Box>
  )
}
