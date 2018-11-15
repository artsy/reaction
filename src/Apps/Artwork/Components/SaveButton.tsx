import { color, Flex } from "@artsy/palette"
import Icon from "Components/Icon"
import React from "react"
import styled from "styled-components"

const SaveIconWrapper = styled(Flex)`
  position: relative;
  justify-content: center;
`

const SaveIcon = styled(Icon)`
  color: ${color("black100")};
  cursor: pointer;
`

export class SaveButton extends React.Component {
  render() {
    return (
      <SaveIconWrapper>
        <SaveIcon name="heart" />
      </SaveIconWrapper>
    )
  }
}
