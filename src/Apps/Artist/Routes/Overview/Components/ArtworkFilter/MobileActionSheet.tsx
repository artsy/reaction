import { Sans } from "@artsy/palette"
import React, { SFC } from "react"
import styled from "styled-components"
import { MobileTopBar } from "Styleguide/Components/MobileTopBar"
import { StackableBorderBox } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"

interface MobileActionSheet {
  children: JSX.Element
  onClose?: () => void
}

export const MobileActionSheet: SFC<MobileActionSheet> = ({
  children,
  onClose,
}) => {
  return (
    <Container>
      <Flex flexDirection="column">
        <MobileTopBar>
          <Button variant="noOutline" size="small">
            Reset
          </Button>
          <Sans size="2" weight="medium">
            Filter (2)
          </Sans>
          <Button variant="primaryBlack" size="small" onClick={() => onClose()}>
            Apply
          </Button>
        </MobileTopBar>
        <StackableBorderBox flexDirection="column">
          {children}
        </StackableBorderBox>
      </Flex>
    </Container>
  )
}

MobileActionSheet.defaultProps = {
  onClose: () => {
    //
  },
}

const Container = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;

  > div {
    overflow-y: scroll;
  }
`
