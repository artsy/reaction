import React, { Component } from "react"
import styled from "styled-components"
import { RulerSeparator } from "../../Elements/RulerSeparator"
import { Artists } from "./Sidebar/Artists"
import { ArtworkMetadata } from "./Sidebar/ArtworkMetadata"
import { Commertial } from "./Sidebar/Commertial"

export interface ArtworkSidebarProps {
  readonly artwork: {
    readonly artists: Array<{
      readonly __id: string
      readonly id: string
      readonly name: string
      readonly is_followed: boolean | null
      readonly href?: string
    }>
    readonly title: string
    readonly date: string
    readonly medium: string
    readonly dimensions: {
      in: string
      cm: string
    }
    readonly edition_of: string
    readonly attribution_class: {
      short_description: string
    }
    readonly edition_sets: Array<{
      readonly id: string
      readonly dimensions: {
        readonly in: string
        readonly cm: string
      }
      readonly edition_of?: string
    }>
    readonly sale_message: string | null
    readonly is_inquireable: boolean
    readonly is_price_range?: boolean | null
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
        <RulerSeparator />
        <Commertial artwork={artwork} />
      </SidebarContainer>
    )
  }
}
