import { Box, Checkbox, Flex, Toggle } from "@artsy/palette"
import React from "react"
import { useAuctionResultsFilterContext } from "../../AuctionResultsFilterContext"

const sizeMap = [
  { displayName: "Small", name: "SMALL" },
  { displayName: "Medium", name: "MEDIUM" },
  { displayName: "Large", name: "LARGE" },
]

export const SizeFilter: React.FC = () => {
  const filterContext = useAuctionResultsFilterContext()

  const toggleSelection = (selected, name) => {
    let sizes = filterContext.filters.sizes.slice()
    if (selected) {
      sizes.push(name)
    } else {
      sizes = sizes.filter(item => item !== name)
    }
    filterContext.setFilter("sizes", sizes)
  }

  return (
    <Toggle label="Artwork size" expanded>
      <Flex flexDirection="column" alignItems="left">
        <Box pt={1}>
          {sizeMap.map((checkbox, index) => {
            const { name, displayName } = checkbox
            const props = {
              key: index,
              onSelect: selected => {
                toggleSelection(selected, name)
              },
              selected: filterContext.filters.sizes.includes(name),
            }
            return <Checkbox {...props}>{displayName}</Checkbox>
          })}
        </Box>
      </Flex>
    </Toggle>
  )
}
