import React, { Component } from "react"
import styled from "styled-components"
import { Separator } from "Styleguide/Elements/Separator"
import { Artists } from "./Sidebar/Artists"
import { ArtworkMetadata } from "./Sidebar/ArtworkMetadata"
import { Commercial } from "./Sidebar/Commercial"
import { PartnerInfo } from "./Sidebar/PartnerInfo"
import { ExtraLinks } from "./Sidebar/ExtraLinks"

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
      readonly is_live_open: boolean
    }
    readonly sale_artwork: {
      readonly lot_label: string
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
        <ArtworkMetadata artwork={artwork} />
        <Separator />
        <Commercial artwork={artwork} />
        <PartnerInfo artwork={artwork} />
        <Separator />
        <ExtraLinks artwork={artwork} />
      </SidebarContainer>
    )
  }
}
