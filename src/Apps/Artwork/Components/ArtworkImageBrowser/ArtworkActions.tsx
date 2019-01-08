import { color, Flex, Spacer } from "@artsy/palette"
import { ArtworkActions_artwork } from "__generated__/ArtworkActions_artwork.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Bell } from "Assets/Icons/Bell"
import { Heart } from "Assets/Icons/Heart"
import SaveButton, { SaveProps, SaveState } from "Components/Artwork/Save"
import Icon from "Components/Icon"
import { isNull } from "lodash"
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

@track()
export class ArtworkActions extends React.Component<
  ArtworkActionsProps,
  ArtworkActionsState
> {
  state = {
    showSharePanel: false,
  }

  @track({
    flow: Schema.Flow.ArtworkShare,
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.ShareButton,
    type: Schema.Type.Button,
  })
  toggleSharePanel() {
    const showSharePanel = !this.state.showSharePanel
    this.setState({
      showSharePanel,
    })
  }

  render() {
    return (
      <Container>
        <SaveButton artwork={this.props.artwork} render={Save(this.props)} />
        <Spacer mx={0.5} />
        <ShareButton onClick={this.toggleSharePanel.bind(this)} />

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

      sale {
        is_closed
        is_auction
      }
    }
  `
)

const Container = styled(Flex).attrs({
  justifyContent: ["left", "center"],
  mb: [2, 2],
  ml: [-0.5, 1],
  pt: [2, 3],
})`
  position: relative;
  user-select: none;
  cursor: pointer;
`

const ShareButton = styled(Icon).attrs({
  name: "share",
  color: color("black100"),
})``

ShareButton.displayName = "ShareButton"

/**
 * Custom renderer for SaveButton
 */
const Save = (actionProps: ArtworkActionsProps) => (
  props: SaveProps,
  state: SaveState
) => {
  const { isHovered } = state
  const fill = isHovered ? color("purple100") : color("black100")

  // Grab props from ArtworkActions to check if sale is open
  const {
    artwork: { sale },
  } = actionProps

  const isOpenSale = sale && sale.is_auction && !sale.is_closed

  // Check if saved by evaluating props from SaveButton
  const isSaved = isNull(state.is_saved)
    ? props.artwork.is_saved
    : state.is_saved

  // If an Auction, use Bell (for notifications); if a standard artwork use Heart
  const SaveIcon = isOpenSale ? Bell : Heart

  return (
    <SaveIcon fill={fill} selected={isSaved} style={{ cursor: "pointer" }} />
  )
}
