import React from "react"
import { Media } from "Utils/Responsive"
import { FilterState } from "../../FilterState"

import { Button, FilterIcon, Flex, SelectSmall, Spacer } from "@artsy/palette"

export const SortFilter: React.FC<{
  filters: FilterState
  onShow?: () => void
  isCollection?: boolean
}> = ({ filters, onShow, isCollection = false }) => {
  let options = [
    {
      value: "-decayed_merch",
      text: "Default",
    },
  ]

  const include_for_collections = [
    {
      value: "-prices",
      text: "Price (desc.)",
    },
    {
      value: "prices",
      text: "Price (asc.)",
    },
  ]

  const always_include = [
    {
      value: "-partner_updated_at",
      text: "Recently updated",
    },
    {
      value: "-published_at",
      text: "Recently added",
    },
    {
      value: "-year",
      text: "Artwork year (desc.)",
    },
    {
      value: "year",
      text: "Artwork year (asc.)",
    },
  ]

  if (isCollection) {
    options = options.concat(include_for_collections).concat(always_include)
  } else {
    options = options.concat(always_include)
  }

  return (
    <Flex justifyContent={["space-between", "flex-end"]} alignItems="center">
      <SelectSmall
        options={options}
        selected={filters.state.sort}
        title="Sort"
        onSelect={sort => {
          return filters.setFilter("sort", sort)
        }}
      />

      <Media at="xs">
        <Button size="small" mt={-1} onClick={onShow}>
          <Flex justifyContent="space-between" alignItems="center">
            <FilterIcon fill="white100" />
            <Spacer mr={0.5} />
            Filter
          </Flex>
        </Button>
      </Media>
    </Flex>
  )
}
