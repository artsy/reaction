import React from "react"
import { Media } from "Utils/Responsive"
import { FilterState } from "../../FilterState"
import { getSortOptions, SortTypes } from "./SortFilterSortTypes"

import { Button, FilterIcon, Flex, SelectSmall, Spacer } from "@artsy/palette"

export const SortFilter: React.FC<{
  filters: FilterState
  onShow?: () => void
  sortType?: SortTypes
}> = ({ filters, onShow, sortType }) => {
  return (
    <Flex justifyContent={["space-between", "flex-end"]} alignItems="center">
      <SelectSmall
        options={getSortOptions(sortType)}
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

SortFilter.defaultProps = {
  sortType: SortTypes.default,
}
