import { color, Flex } from "@artsy/palette"
import { ArtworkActions_artwork } from "__generated__/ArtworkActions_artwork.graphql"
import { Heart } from "Assets/Icons/Heart"
import SaveButton, { SaveProps, SaveState } from "Components/Artwork/Save"
import Icon from "Components/Icon"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArtworkSharePanelFragmentContainer as ArtworkSharePanel } from "./ArtworkSharePanel"

interface ArtworkActionsProps {
  artwork: ArtworkActions_artwork
}

interface ArtworkActionsState {
  showSharePanel: boolean
}

export class ArtworkActions extends React.Component<
  ArtworkActionsProps,
  ArtworkActionsState
> {
  state = {
    showSharePanel: false,
  }

  toggleSharePanel = () => {
    const showSharePanel = !this.state.showSharePanel
    this.setState({
      showSharePanel,
    })
  }

  render() {
    return (
      <Container>
        <SaveButton artwork={this.props.artwork} render={Save} />
        <ShareButton onClick={this.toggleSharePanel} />

        {this.state.showSharePanel && (
          <ArtworkSharePanel
            artwork={this.props.artwork}
            onClose={this.toggleSharePanel}
          />
        )}
      </Container>
    )
  }
}

export const ArtworkActionsFragmentContainer = createFragmentContainer(
  ArtworkActions,
  graphql`
    fragment ArtworkActions_artwork on Artwork {
      ...Save_artwork
      ...ArtworkSharePanel_artwork
    }
  `
)

const Container = styled(Flex).attrs({
  justifyContent: ["left", "center"],
  mb: [2, 0],
  ml: [-0.5, 1],
  pt: [0, 3],
})`
  position: relative;
`

const ShareButton = styled(Icon).attrs({
  name: "share",
  color: color("black100"),
})`
  cursor: pointer;
  user-select: false;
`

/**
 * Custom renderer for SaveButton
 */
const Save = (props: SaveProps, state: SaveState) => {
  const { is_saved, isHovered } = state
  const fill = isHovered ? color("purple100") : color("black100")
  return <Heart fill={fill} selected={is_saved} style={{ cursor: "pointer" }} />
}
