import React from "react"
import { data as sd } from "sharify"
import { Subscribe } from "unstated"

import { FilterState } from "Apps/Collect/FilterState"
import { Mediator } from "Artsy/SystemContext"
import { MobileActionSheet } from "../MobileActionSheet"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SortFilter } from "./SortFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"

import { Box, Flex, Separator, Spacer } from "@artsy/palette"
import { Toggle } from "Styleguide/Components"

export interface FilterContainerProps {
  user?: any
  mediator: Mediator
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
    const { mediums, isMobile } = this.props

    return (
      <>
        {!isMobile && <Separator mb={2} mt={-1} />}

        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          <WaysToBuyFilter enableBuyNow={this.enableBuyNow} filters={filters} />
        </Flex>

        <Flex flexDirection="column" alignItems="left" my={1}>
          <PriceRangeFilter filters={filters} />
        </Flex>

        <Toggle label="Medium" expanded>
          <MediumFilter filters={filters} mediums={mediums} />
        </Toggle>

        <Toggle expanded label="Time period">
          <TimePeriodFilter filters={filters} />
        </Toggle>
      </>
    )
  }

  render() {
    const { isMobile } = this.props
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
                {!isMobile && <Separator mb={2} mt={-1} />}

                <SortFilter filters={filters} xs={isMobile} />

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

const Sidebar = Box
