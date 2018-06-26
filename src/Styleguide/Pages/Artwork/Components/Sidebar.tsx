import { Serif } from "@artsy/palette"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Separator } from "Styleguide/Elements/Separator"
import { ArtistsFragmentContainer as Artists } from "./Sidebar/Artists"
import { ArtworkMetadataFragmentContainer as ArtworkMetadata } from "./Sidebar/ArtworkMetadata"
import { AuctionPartnerInfoFragmentContainer as AuctionPartnerInfo } from "./Sidebar/AuctionPartnerInfo"
import { CommercialFragmentContainer as Commercial } from "./Sidebar/Commercial"
import { CurrentBidInfoFragmentContainer as CurrentBidInfo } from "./Sidebar/CurrentBidInfo"
import { ExtraLinksFragmentContainer as ExtraLinks } from "./Sidebar/ExtraLinks"
import { PartnerInfoFragmentContainer as PartnerInfo } from "./Sidebar/PartnerInfo"

import { Sidebar_artwork } from "__generated__/Sidebar_artwork.graphql"

export interface SidebarProps {
  artwork: Sidebar_artwork
}

const SidebarContainer = styled.div``

export class Sidebar extends Component<SidebarProps> {
  render() {
    const { artwork } = this.props
    return (
      <SidebarContainer>
        <Artists artwork={artwork as any} />

        {artwork.is_biddable &&
          artwork.sale_artwork &&
          artwork.sale_artwork.lot_label && (
            <Serif size="2" weight="semibold" color="black100">
              Lot {artwork.sale_artwork.lot_label}
            </Serif>
          )}
        <ArtworkMetadata artwork={artwork as any} />

        {artwork.is_in_auction ? (
          <React.Fragment>
            <AuctionPartnerInfo artwork={artwork as any} />
            <Separator />
            <CurrentBidInfo artwork={artwork as any} />
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
      </SidebarContainer>
    )
  }
}

export const SidebarFragmentContainer = createFragmentContainer(
  Sidebar,
  graphql`
    fragment Sidebar_artwork on Artwork {
      is_biddable
      is_in_auction
      sale_artwork {
        lot_label
      }
      ...Artists_artwork
      ...ArtworkMetadata_artwork
      ...AuctionPartnerInfo_artwork
      ...CurrentBidInfo_artwork
      ...Commercial_artwork
      ...PartnerInfo_artwork
      ...ExtraLinks_artwork
    }
  `
)
