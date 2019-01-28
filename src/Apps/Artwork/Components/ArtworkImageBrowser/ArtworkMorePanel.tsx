import { Box, color, Flex, Sans, Separator, space } from "@artsy/palette"
import Icon from "Components/Icon"
import React from "react"
import styled from "styled-components"

interface ArtworkMorePanelProps {
  onClose: () => void
}

export class ArtworkMorePanel extends React.Component<ArtworkMorePanelProps> {
  render() {
    return (
      <Container>
        <Box position="absolute" top={space(1)} right={space(1)}>
          <CloseIcon name="close" onClick={this.props.onClose} />
        </Box>
        <Flex flexDirection="column" p={2}>
          <Flex flexDirection="row" mb={2}>
            <Sans size="3" weight="medium" color="black100">
              More actions
            </Sans>
          </Flex>
          <Separator />
        </Flex>
      </Container>
    )
  }
}

// TODO: We need to figure out if this is going to be a new re-usable panel type
//       in which I wouldn’t want to add this into Share
const Container = styled.div`
  position: absolute;
  width: 300px;
  top: -230px;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`

const CloseIcon = styled(Icon)`
  color: ${color("black30")};
  cursor: pointer;
  font-size: 12px;
`
