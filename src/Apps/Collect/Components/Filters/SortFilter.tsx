import { Button, color, Flex, SmallSelect, Spacer } from "@artsy/palette"
import { ContextConsumer } from "Artsy/SystemContext"
import { FilterIcon } from "Assets/Icons/FilterIcon"
import React from "react"
import { FilterState } from "../../FilterState"

export const SortFilter: React.SFC<{
  filters: FilterState
  xs: boolean
}> = ({ filters, xs }) => {
  return (
    <ContextConsumer>
      {({ mediator }) => (
        <Flex
          justifyContent={xs ? "space-between" : "flex-end"}
          alignItems="center"
        >
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

          {xs && (
            <Button
              size="small"
              mt={-1}
              onClick={() => this.setState({ showMobileActionSheet: true })}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <FilterIcon fill={color("white100")} />
                <Spacer mr={0.5} />
                Filter
              </Flex>
            </Button>
          )}
        </Flex>
      )}
    </ContextConsumer>
  )
}
