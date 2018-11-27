import { Box, Button, Sans, Spacer } from "@artsy/palette"
import React, { SFC } from "react"
import styled from "styled-components"
import { MobileTopBar } from "Styleguide/Components"
import { Subscribe } from "unstated"
import { FilterState } from "../FilterState"

interface MobileActionSheet {
  children: JSX.Element
  onClose?: () => void
}

export const MobileActionSheet: SFC<MobileActionSheet> = ({
  children,
  onClose,
}) => {
  return (
    <Subscribe to={[FilterState]}>
      {({ resetFilters }: FilterState) => {
        return (
          <Container>
            <MobileTopBar>
              <Button
                variant="noOutline"
                size="small"
                onClick={() => resetFilters()}
              >
                Reset
              </Button>
              <FilterTitle size="2" weight="medium">
                Filter
              </FilterTitle>
              <Button
                variant="primaryBlack"
                size="small"
                onClick={() => onClose()}
              >
                Apply
              </Button>
            </MobileTopBar>

            <Spacer mb={3} />

            <Box p={2}>{children}</Box>
          </Container>
        )
      }}
    </Subscribe>
  )
}

const Container = styled(Box)`
  position: fixed;

  /* The z-index after Force's mobile top-nav header */
  z-index: 971;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

const FilterTitle = styled(Sans)`
  width: min-content;
`
