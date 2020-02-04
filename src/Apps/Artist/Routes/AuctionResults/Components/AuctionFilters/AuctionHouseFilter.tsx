import { Box, Checkbox, Flex, Toggle } from "@artsy/palette"
import React from "react"

const auctionHouses = [
  { name: "sothebys", displayName: "Sotheby's" },
  { name: "christies", displayName: "Christie's" },
  { namee: "bonhams", displayName: "Bonhams" },
  { name: "phillips", displayName: "Phillips" },
]

export const AuctionHouseFilter: React.FC = () => {
  return (
    <Toggle label="Auction house" expanded>
      <Flex flexDirection="column" alignItems="left">
        <Box pt={1}>
          {auctionHouses.map((checkbox, index) => {
            const props = {
              key: index,
              // onSelect: value => filterContext.setFilter(checkbox.state, value),
              // selected: Boolean(filterContext.filters[checkbox.state]),
            }
            return <Checkbox {...props}>{checkbox.displayName}</Checkbox>
          })}
        </Box>
      </Flex>
    </Toggle>
  )
}
