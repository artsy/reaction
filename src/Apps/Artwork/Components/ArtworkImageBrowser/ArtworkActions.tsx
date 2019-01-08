import { Box, color, Flex, Link, Sans, Spacer } from "@artsy/palette"
import { ArtworkActions_artwork } from "__generated__/ArtworkActions_artwork.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ContextConsumer } from "Artsy/SystemContext"
import { Bell } from "Assets/Icons/Bell"
import { Download } from "Assets/Icons/Download"
import { Heart } from "Assets/Icons/Heart"
import SaveButton, { SaveProps, SaveState } from "Components/Artwork/Save"
import Icon from "Components/Icon"
import { isNull } from "lodash"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { slugify } from "underscore.string"
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

  filename() {
    const { artists, title, date } = this.props.artwork
    return slugify(
      compact([artists.map(({ name }) => name).join(", "), title, date]).join(
        " "
      )
    )
  }

  // TODO: Finish styling and enable.
  canDownload(user) {
    return false
    // const { is_downloadable } = this.props.artwork
    // return is_downloadable || (user && user.type === "Admin")
  }

  downloadableImageUrl(user) {
    const {
      artwork: { href },
    } = this.props

    return `${sd.APP_URL}${href}/download/${this.filename()}.jpg`
  }

  render() {
    return (
      <ContextConsumer>
        {({ user }) => {
          return (
            <Container>
              <SaveButton
                artwork={this.props.artwork}
                render={Save(this.props)}
              />
              <Spacer mx={0.5} />
              <ShareButton
                style={{ cursor: "pointer" }}
                onClick={this.toggleSharePanel.bind(this)}
              />

              {this.state.showSharePanel && (
                <ArtworkSharePanel
                  artwork={this.props.artwork}
                  onClose={this.toggleSharePanel.bind(this)}
                />
              )}
              {this.canDownload(user) && (
                <Box style={{ marginLeft: "auto" }}>
                  <Link
                    className="noUnderline"
                    href={this.downloadableImageUrl(user)}
                    target="_blank"
                  >
                    <Download />
                    <Sans style={{ display: "inline-block" }} mt={1} size="1">
                      Download
                    </Sans>
                  </Link>
                </Box>
              )}
            </Container>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const ArtworkActionsFragmentContainer = createFragmentContainer(
  ArtworkActions,
  graphql`
    fragment ArtworkActions_artwork on Artwork {
      ...Save_artwork
      ...ArtworkSharePanel_artwork

      artists {
        name
      }
      date
      title
      image {
        id
      }
      href
      is_downloadable
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
