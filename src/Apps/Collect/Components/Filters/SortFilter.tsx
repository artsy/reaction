import { SystemContext } from "Artsy"
import React, { useContext } from "react"
import { Media } from "Utils/Responsive"
import { FilterState } from "../../FilterState"

import { Button, FilterIcon, Flex, SmallSelect, Spacer } from "@artsy/palette"

export const SortFilter: React.FC<{
  filters: FilterState
  onShow?: () => void
}> = ({ filters, onShow }) => {
  const { mediator } = useContext(SystemContext)
  return (
    <Flex justifyContent={["space-between", "flex-end"]} alignItems="center">
      <SmallSelect
        mt="-8px"
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
        onSelect={sort => {
          return filters.setFilter("sort", sort, mediator)
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
