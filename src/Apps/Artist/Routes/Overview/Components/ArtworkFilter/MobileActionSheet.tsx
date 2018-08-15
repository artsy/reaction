import { Sans } from "@artsy/palette"
import React, { SFC } from "react"
import styled from "styled-components"
import { MobileTopBar } from "Styleguide/Components/MobileTopBar"
import { StackableBorderBox } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Subscribe } from "unstated"
import { FilterState } from "../../state"

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
      {({ state: { selectedFilters } }) => {
        const filterCount = selectedFilters.length
          ? `(${selectedFilters.length})`
          : ""

        return (
          <Container>
            <MobileTopBar>
              <Button variant="noOutline" size="small">
                Reset
              </Button>
              <Sans size="2" weight="medium">
                Filter {filterCount}
              </Sans>
              <Button
                variant="primaryBlack"
                size="small"
                onClick={() => onClose()}
              >
                Apply
              </Button>
            </MobileTopBar>
            <StackableBorderBox flexDirection="column">
              {children}
            </StackableBorderBox>
          </Container>
        )
      }}
    </Subscribe>
  )
}

const Container = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`
