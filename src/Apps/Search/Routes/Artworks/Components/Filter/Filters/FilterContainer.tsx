import React from "react"
import styled from "styled-components"
import { Subscribe } from "unstated"

import { FilterState } from "Apps/Search/FilterState"
import { MobileActionSheet } from "../SearchResultsMobileActionSheet"
import { ColorFilter } from "./ColorFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeRangeFilters } from "./SizeRangeFilters"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"

import {
  Box,
  Button,
  FilterIcon,
  Flex,
  Separator,
  Spacer,
  Toggle,
} from "@artsy/palette"
import { Media } from "Utils/Responsive"

export interface FilterContainerProps {
  user?: any
  mediums: Array<{ id: string; name: string }>
  timePeriods?: Array<{ name: string }>
  children?: (filters: FilterState) => JSX.Element
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

  componentDidMount() {
    this.updateBodyScrollBlock()
  }

  componentDidUpdate() {
    this.updateBodyScrollBlock()
  }

  updateBodyScrollBlock() {
    if (this.state.showMobileActionSheet) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
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
        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          <WaysToBuyFilter filters={filters} />
        </Flex>

        <Toggle label="Medium" expanded>
          <Flex flexDirection="column" alignItems="left" mb={1}>
            <MediumFilter filters={filters} mediums={mediums} />
          </Flex>
        </Toggle>

        <Toggle label="Price" expanded>
          <Flex flexDirection="column" alignItems="left" my={1}>
            <PriceRangeFilter filters={filters} />
          </Flex>
        </Toggle>

        <Toggle label="Size">
          <Flex flexDirection="column" alignItems="left" my={1}>
            <SizeRangeFilters filters={filters} />
          </Flex>
        </Toggle>

        <Toggle label="Color">
          <Flex flexDirection="column" alignItems="center">
            <ColorFilter filters={filters} />
          </Flex>
        </Toggle>
        <Toggle label="Time period">
          <TimePeriodFilter
            filters={filters}
            timePeriods={!!timePeriods ? timePeriods.map(a => a.name) : null}
          />
        </Toggle>
      </>
    )
  }

  render() {
    return (
      <Subscribe to={[FilterState]}>
        {(filters: FilterState) => {
          return (
            <>
              {/** Mobile */}
              <Media at="xs">
                <Mobile>
                  {this.state.showMobileActionSheet && (
                    <MobileActionSheet onClose={this.hideMobileActionSheet}>
                      {this.renderFilters(filters)}
                    </MobileActionSheet>
                  )}

                  <span id="jump--searchArtworkGrid" />
                  <Flex justifyContent="flex-end" alignItems="center">
                    <Button
                      size="small"
                      mt={-1}
                      onClick={() =>
                        this.setState({ showMobileActionSheet: true })
                      }
                    >
                      <Flex justifyContent="space-between" alignItems="center">
                        <FilterIcon fill="white100" />
                        <Spacer mr={0.5} />
                        Filter
                      </Flex>
                    </Button>
                  </Flex>

                  <Spacer mb={2} />

                  {this.props.children(filters)}
                </Mobile>
              </Media>

              {/** Desktop */}
              <Media greaterThan="xs">
                <Desktop>
                  <Box width="25%" mr={2}>
                    {this.renderFilters(filters)}
                    <Separator mb={2} mt={-1} />
                  </Box>
                  <Box width="75%">
                    <span id="jump--searchArtworkGrid" />

                    {this.props.children(filters)}
                  </Box>
                </Desktop>
              </Media>
            </>
          )
        }}
      </Subscribe>
    )
  }
}

const Mobile = styled(Box)``
const Desktop = styled(Flex)``

Mobile.displayName = "Mobile"
Desktop.displayName = "Desktop"
