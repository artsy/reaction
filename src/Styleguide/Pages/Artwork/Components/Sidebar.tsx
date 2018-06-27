import { Serif } from "@artsy/palette"
import React, { Component } from "react"
import styled from "styled-components"
import { Separator } from "Styleguide/Elements/Separator"
import { Artists } from "./Sidebar/Artists"
import { ArtworkMetadata } from "./Sidebar/ArtworkMetadata"
import { AuctionPartnerInfo } from "./Sidebar/AuctionPartnerInfo"
import { BidAction } from "./Sidebar/BidAction"
import { Commercial } from "./Sidebar/Commercial"
import { CurrentBidInfo } from "./Sidebar/CurrentBidInfo"
import { ExtraLinks } from "./Sidebar/ExtraLinks"
import { PartnerInfo } from "./Sidebar/PartnerInfo"

export interface ArtworkSidebarProps {
  readonly artwork: {
    readonly __id: string
    readonly artists: Array<{
      readonly __id: string
      readonly id: string
      readonly name: string
      readonly is_followed: boolean | null
      readonly href?: string
      readonly is_consignable: boolean
    }>
    readonly partner: {
      readonly __id: string
      readonly name: string
      readonly href?: string
      readonly locations: Array<{
        readonly city: string
      }>
    }
    readonly sale: {
      readonly is_preview: boolean
      readonly is_open: boolean
      readonly is_closed: boolean
      readonly is_live_open: boolean
      readonly is_with_buyers_premium: boolean
      readonly is_registration_closed: boolean
    }
    readonly sale_artwork: {
      readonly lot_label: string
      readonly estimate: string
      readonly is_with_reserve: boolean
      readonly reserve_message: string
      readonly reserve_status: string
      readonly current_bid: {
        readonly display: string
      }
      readonly counts: {
        readonly bidder_positions: number
      }
    }
    readonly is_in_auction: boolean
    readonly is_biddable: boolean
    readonly is_sold: boolean
    readonly title: string
    readonly date: string
    readonly medium: string
    readonly dimensions: {
      in: string
      cm: string
    }
    readonly collecting_institution?: string
    readonly edition_of: string
    readonly attribution_class: {
      short_description: string
    }
    readonly edition_sets: Array<{
      readonly __id: string
      readonly dimensions: {
        readonly in: string
        readonly cm: string
      }
      readonly sale_message: string | null
      readonly edition_of?: string
    }>
    readonly sale_message: string | null
    readonly is_inquireable: boolean
    readonly is_price_range?: boolean | null
    readonly is_for_sale: boolean
  }
}

const SidebarContainer = styled.div``

export class Sidebar extends Component<ArtworkSidebarProps> {
  render() {
    const { artwork } = this.props
    return (
      <SidebarContainer>
        <Artists artists={artwork.artists} />

        {artwork.is_biddable &&
          artwork.sale_artwork &&
          artwork.sale_artwork.lot_label && (
            <Serif size="2" weight="semibold" color="black100">
              Lot {artwork.sale_artwork.lot_label}
            </Serif>
          )}
        <ArtworkMetadata artwork={artwork} />

        {artwork.is_in_auction ? (
          <React.Fragment>
            <AuctionPartnerInfo artwork={artwork} />
            <Separator />
            {artwork.sale &&
              !artwork.sale.is_live_open && (
                <CurrentBidInfo artwork={artwork} />
              )}
            {artwork.sale &&
              !artwork.sale.is_closed && <BidAction artwork={artwork} />}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Separator />
            <Commercial artwork={artwork} />
            <PartnerInfo artwork={artwork} />
          </React.Fragment>
        )}

        <Separator />
        <ExtraLinks artwork={artwork} />
      </SidebarContainer>
    )
  }
}
