import { Box, Spacer } from "@artsy/palette"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { AuctionTimerFragmentContainer as AuctionTimer } from "Components/v2/AuctionTimer"
import React, { Component, useContext } from "react"
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
import { SystemContext } from "Artsy"

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

        {artwork.is_in_auction ? (
          <React.Fragment>
            <Spacer mb={2} />
            <AuctionPartnerInfo artwork={artwork} />
            <CurrentBidInfo artwork={artwork} />
            <BidAction artwork={artwork} />
            {!artwork.sale.is_closed && (
              <Box py={2}>
                <AuctionTimer sale={artwork.sale} />
              </Box>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Spacer mb={3} />
            <Commercial artwork={artwork} />
            <PartnerInfo artwork={artwork} />
          </React.Fragment>
        )}

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
      sale {
        is_closed
        ...AuctionTimer_sale
      }
    }
  `
)

export const ArtworkSidebarQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)

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
}
