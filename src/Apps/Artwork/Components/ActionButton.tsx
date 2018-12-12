import { Box, color, Flex, space } from "@artsy/palette"
import Icon from "Components/Icon"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Share } from "./Share"

const ActionIcon = styled(Icon)`
  color: ${color("black100")};
  cursor: pointer;
`
interface State {
  isOpen: boolean
}

interface Props {
  href: string
}

export class ShareButton extends React.Component<Props, State> {
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
      <Flex mt={1} justifyContent="center" position="relative">
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
