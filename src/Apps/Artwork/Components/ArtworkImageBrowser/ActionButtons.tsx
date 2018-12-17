import { Box, color, Flex, space } from "@artsy/palette"
import Icon from "Components/Icon"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"
import { ImageBrowserProps } from "."
import { Share } from "./Share"

// FIXME: Wire up
// import SaveButton from "Components/Artwork/Save"

interface State {
  isOpen: boolean
}

interface Props {
  href: string
}

export const ActionButtons: React.SFC<ImageBrowserProps> = props => {
  return (
    <Flex
      justifyContent={["left", "center"]}
      mb={[2, 0]}
      ml={[-0.5, 1]}
      pt={[0, 3]}
    >
      <SaveButton /> {/* FIXME: Wire up real share. artwork={props.artwork} */}
      <ShareButton href={props.artwork.href} />
    </Flex>
  )
}

const ActionIcon = styled(Icon)`
  color: ${color("black100")};
  cursor: pointer;
  user-select: false;
`

export const SaveButton: React.SFC = () => {
  return <ActionIcon name="heart" />
}

export class ShareButton extends React.Component<Props, State> {
  static displayName = "ShareButton"

  state = {
    isOpen: false,
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <Flex justifyContent="center" position="relative">
        {this.state.isOpen && (
          <Box bottom={space(4)} position="absolute">
            <Share
              url={sd.APP_URL + this.props.href}
              onClose={this.handleClose}
            />
          </Box>
        )}
        <ActionIcon name="share" onClick={this.handleOpen} />
      </Flex>
    )
  }
}

ActionIcon.displayName = "ActionIcon"
