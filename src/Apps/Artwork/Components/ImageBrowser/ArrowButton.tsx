import { Flex } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Arrow } from "Styleguide/Elements"

export const ArrowButton = ({ direction, onClick }) => {
  return (
    <ArrowButtonContainer
      flexDirection="column"
      justifyContent="center"
      height="100%"
      onClick={onClick}
    >
      <Arrow direction={direction} fontSize="24px" />
    </ArrowButtonContainer>
  )
}

const ArrowButtonContainer = styled(Flex)`
  cursor: pointer;
  opacity: 0.1;
  transition: opacity 0.25s;

  &:hover {
    opacity: 1;
  }
`
