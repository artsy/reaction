import React from "react"
import { Subscribe } from "unstated"

import { FilterState } from "Apps/Collect/FilterState"
import { Mediator } from "Artsy/SystemContext"
import { MobileActionSheet } from "../MobileActionSheet"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SortFilter } from "./SortFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"

import { Box, Flex, Separator, Spacer, Toggle } from "@artsy/palette"
import { Media } from "Utils/Responsive"

export interface FilterContainerProps {
  user?: any
  mediator: Mediator
  mediums: Array<{ id: string; name: string }>
  timePeriods?: Array<{ name: string }>
}

export interface FilterContainerState {
  showMobileActionSheet: boolean
}
export class FilterContainer extends React.Component<
  FilterContainerProps,
  FilterContainerState
> {
  state = {
    showMobileActionSheet: false,
  }

  hideMobileActionSheet = () => {
    this.setState({
      showMobileActionSheet: false,
    })
  }

  renderFilters(filters: FilterState) {
    const { mediums, timePeriods } = this.props

    return (
      <>
        <Media greaterThan="xs">
          <Separator mb={2} mt={-1} />
        </Media>

        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          <WaysToBuyFilter filters={filters} />
        </Flex>

        <Flex flexDirection="column" alignItems="left" my={1}>
          <PriceRangeFilter filters={filters} />
        </Flex>

        <Toggle label="Medium" expanded>
          <MediumFilter filters={filters} mediums={mediums} />
        </Toggle>

        <Toggle expanded label="Time period">
          <TimePeriodFilter
            filters={filters}
            timePeriods={!!timePeriods ? timePeriods.map(a => a.name) : null}
          />
        </Toggle>
      </>
    )
  }

  render() {
    const Filters = ({ filters }) => this.renderFilters(filters)

    // tslint:disable-next-line:ban-types
    const children: (filters: FilterState) => null =
      (this.props.children as (filters: FilterState) => null) || (() => null)

    const Mobile = props =>
      // Mobile
      this.state.showMobileActionSheet && (
        <MobileActionSheet onClose={this.hideMobileActionSheet}>
          <Filters {...props} />
        </MobileActionSheet>
      )

    const Desktop = props => (
      <Box width="25%" mr={2}>
        <Filters {...props} />
      </Box>
    )

    return (
      <Subscribe to={[FilterState]}>
        {(filters: FilterState) => {
          return (
            <Flex>
              <Media at="xs">
                <Mobile filters={filters} />
              </Media>
              <Media greaterThan="xs">
                {(className, renderChildren) =>
                  renderChildren && (
                    <Desktop filters={filters} className={className} />
                  )
                }
              </Media>
              <span id="jump--collectArtworkGrid" />

              <Box width={["100%", "75%"]}>
                <Media greaterThan="xs">
                  <Separator mb={2} mt={-1} />
                </Media>

                <SortFilter
                  filters={filters}
                  onShow={() => this.setState({ showMobileActionSheet: true })}
                />

                <Spacer mb={2} />

                {children(filters)}
              </Box>
            </Flex>
          )
        }}
      </Subscribe>
    )
  }
}
