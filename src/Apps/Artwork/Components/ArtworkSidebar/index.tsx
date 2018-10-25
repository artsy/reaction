import { Box, Separator, Spacer } from "@artsy/palette"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/Router"
import React, { Component } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ArtworkSidebarArtistsFragmentContainer as Artists } from "./ArtworkSidebarArtists"
import { ArtworkSidebarAuctionPartnerInfoFragmentContainer as AuctionPartnerInfo } from "./ArtworkSidebarAuctionPartnerInfo"
import { ArtworkSidebarBidActionFragmentContainer as BidAction } from "./ArtworkSidebarBidAction"
import { ArtworkSidebarCommercialFragmentContainer as Commercial } from "./ArtworkSidebarCommercial"
import { ArtworkSidebarCurrentBidInfoFragmentContainer as CurrentBidInfo } from "./ArtworkSidebarCurrentBidInfo"
import { ArtworkSidebarExtraLinksFragmentContainer as ExtraLinks } from "./ArtworkSidebarExtraLinks"
import { ArtworkSidebarMetadataFragmentContainer as Metadata } from "./ArtworkSidebarMetadata"
import { ArtworkSidebarPartnerInfoFragmentContainer as PartnerInfo } from "./ArtworkSidebarPartnerInfo"

import { ArtworkSidebar_artwork } from "__generated__/ArtworkSidebar_artwork.graphql"
import { ArtworkSidebarQuery } from "__generated__/ArtworkSidebarQuery.graphql"

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar_artwork
}

const ArtworkSidebarContainer = Box

export class ArtworkSidebar extends Component<ArtworkSidebarProps> {
  render() {
    const { artwork } = this.props
    return (
      <ArtworkSidebarContainer>
        <Artists artwork={artwork} />
        <Spacer mb={2} />
        <Metadata artwork={artwork} />
        <Spacer mb={2} />

        {artwork.is_in_auction ? (
          <React.Fragment>
            <AuctionPartnerInfo artwork={artwork} />
            <Separator />
            <CurrentBidInfo artwork={artwork} />
            <BidAction artwork={artwork} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Separator mt={3} mb={1} />
            <Commercial artwork={artwork} />
            <PartnerInfo artwork={artwork} />
          </React.Fragment>
        )}

        <Separator />
        <ExtraLinks artwork={artwork} />
      </ArtworkSidebarContainer>
    )
  }
}

export const ArtworkSidebarFragmentContainer = createFragmentContainer(
  ArtworkSidebar,
  graphql`
    fragment ArtworkSidebar_artwork on Artwork {
      is_in_auction
      ...ArtworkSidebarArtists_artwork
      ...ArtworkSidebarMetadata_artwork
      ...ArtworkSidebarAuctionPartnerInfo_artwork
      ...ArtworkSidebarCurrentBidInfo_artwork
      ...ArtworkSidebarBidAction_artwork
      ...ArtworkSidebarCommercial_artwork
      ...ArtworkSidebarPartnerInfo_artwork
      ...ArtworkSidebarExtraLinks_artwork
    }
  `
)

export const ArtworkSidebarQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkSidebarQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query ArtworkSidebarQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...ArtworkSidebar_artwork
                }
              }
            `}
            render={renderWithLoadProgress(ArtworkSidebarFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
