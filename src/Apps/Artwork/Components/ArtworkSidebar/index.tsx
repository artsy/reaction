import { Serif } from "@artsy/palette"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Separator } from "Styleguide/Elements/Separator"
import { ArtworkSidebarArtistsFragmentContainer as Artists } from "./ArtworkSidebarArtists"
import { ArtworkSidebarAuctionPartnerInfoFragmentContainer as AuctionPartnerInfo } from "./ArtworkSidebarAuctionPartnerInfo"
import { ArtworkSidebarBidActionFragmentContainer as BidAction } from "./ArtworkSidebarBidAction"
import { ArtworkSidebarCommercialFragmentContainer as Commercial } from "./ArtworkSidebarCommercial"
import { ArtworkSidebarCurrentBidInfoFragmentContainer as CurrentBidInfo } from "./ArtworkSidebarCurrentBidInfo"
import { ArtworkSidebarExtraLinksFragmentContainer as ExtraLinks } from "./ArtworkSidebarExtraLinks"
import { ArtworkSidebarMetadataFragmentContainer as Metadata } from "./ArtworkSidebarMetadata"
import { ArtworkSidebarPartnerInfoFragmentContainer as PartnerInfo } from "./ArtworkSidebarPartnerInfo"

import { ArtworkSidebar_artwork } from "__generated__/ArtworkSidebar_artwork.graphql"

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar_artwork
}

const ArtworkSidebarContainer = styled.div``

export class ArtworkSidebar extends Component<ArtworkSidebarProps> {
  render() {
    const { artwork } = this.props
    return (
      <ArtworkSidebarContainer>
        <Artists artwork={artwork as any} />

        {artwork.is_biddable &&
          artwork.sale_artwork &&
          artwork.sale_artwork.lot_label && (
            <Serif size="2" weight="semibold" color="black100">
              Lot {artwork.sale_artwork.lot_label}
            </Serif>
          )}
        <Metadata artwork={artwork as any} />

        {artwork.is_in_auction ? (
          <React.Fragment>
            <AuctionPartnerInfo artwork={artwork as any} />
            <Separator />
            <CurrentBidInfo artwork={artwork as any} />
            <BidAction artwork={artwork as any} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Separator />
            <Commercial artwork={artwork as any} />
            <PartnerInfo artwork={artwork as any} />
          </React.Fragment>
        )}

        <Separator />
        <ExtraLinks artwork={artwork as any} />
      </ArtworkSidebarContainer>
    )
  }
}

export const ArtworkSidebarFragmentContainer = createFragmentContainer(
  ArtworkSidebar,
  graphql`
    fragment ArtworkSidebar_artwork on Artwork {
      is_biddable
      is_in_auction
      sale_artwork {
        lot_label
      }
      sale {
        is_closed
      }
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
