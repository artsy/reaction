import React from "react"
import { Media } from "Utils/Responsive"
import { FilterState } from "../../FilterState"

import { Button, FilterIcon, Flex, SelectSmall, Spacer } from "@artsy/palette"

export const SortFilter: React.FC<{
  filters: FilterState
  onShow?: () => void
}> = ({ filters, onShow }) => {
  return (
    <Flex justifyContent={["space-between", "flex-end"]} alignItems="center">
      <SelectSmall
        options={[
          {
            value: "-decayed_merch",
            text: "Default",
          },
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
        ]}
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
