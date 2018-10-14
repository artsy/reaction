import React from "react"
import { data as sd } from "sharify"
import { Subscribe } from "unstated"

import { FilterState } from "Apps/Collect/FilterState"
import { SystemProps } from "Artsy/SystemContext"
import { MobileActionSheet } from "../MobileActionSheet"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SortFilter } from "./SortFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"

import { Box, Flex, Spacer } from "@artsy/palette"
import { Toggle } from "Styleguide/Components"

export interface FilterContainerProps {
  user?: any
  mediator: SystemProps["mediator"]
  mediums: Array<{ id: string; name: string }>
  isMobile?: boolean
}

export interface FilterContainerState {
  showMobileActionSheet: boolean
}

export class FilterContainer extends React.Component<
  FilterContainerProps,
  FilterContainerState
> {
  static defaultProps = {
    isMobile: false,
  }

  state = {
    showMobileActionSheet: false,
  }

  get enableBuyNow(): boolean {
    const user = this.props.user
    const hasLabFeature =
      user &&
      user.lab_features &&
      user.lab_features.includes("New Buy Now Flow")
    return sd.ENABLE_NEW_BUY_NOW_FLOW || hasLabFeature
  }

  hideMobileActionSheet = () => {
    this.setState({
      showMobileActionSheet: false,
    })
  }

  renderFilters(filters: FilterState) {
    const { mediator, mediums } = this.props

    return (
      <>
        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          <WaysToBuyFilter
            enableBuyNow={this.enableBuyNow}
            filters={filters}
            mediator={mediator}
          />
        </Flex>

        <Flex flexDirection="column" alignItems="left" my={1}>
          <PriceRangeFilter filters={filters} mediator={mediator} />
        </Flex>

        <Toggle label="Medium" expanded>
          <MediumFilter
            filters={filters}
            mediums={mediums}
            mediator={mediator}
          />
        </Toggle>

        <Toggle expanded label="Time period">
          <TimePeriodFilter filters={filters} mediator={mediator} />
        </Toggle>
      </>
    )
  }

  render() {
    const { isMobile, mediator } = this.props
    const Filters = ({ filters }) => this.renderFilters(filters)

    // tslint:disable-next-line:ban-types
    const children = (this.props.children as Function) || (() => null)

    const Mobile = props =>
      // Mobile
      this.state.showMobileActionSheet && (
        <MobileActionSheet onClose={this.hideMobileActionSheet}>
          <Filters {...props} />
        </MobileActionSheet>
      )

    const Desktop = props => (
      <Sidebar width="25%" mr={2}>
        <Filters {...props} />
      </Sidebar>
    )

    return (
      <Subscribe to={[FilterState]}>
        {(filters: FilterState) => {
          return (
            <Flex>
              {isMobile ? (
                <Mobile filters={filters} />
              ) : (
                <Desktop filters={filters} />
              )}

              <span id="jump--collectArtworkGrid" />

              <Box width={isMobile ? "100%" : "75%"}>
                <SortFilter
                  filters={filters}
                  mediator={mediator}
                  xs={isMobile}
                />

                <Spacer mb={2} />

                {children({ filters })}
              </Box>
            </Flex>
          )
        }}
      </Subscribe>
    )
  }
}

const Sidebar = Box
