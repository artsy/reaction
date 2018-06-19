import React from "react"
import styled from "styled-components"
import { Sans } from "@artsy/palette"
import { space, SpaceProps } from "styled-system"

export interface ExtraLinksProps {
  artwork: {
    readonly __id: string
    readonly is_for_sale: boolean
    artists: Array<{
      readonly __id: string
      readonly is_consignable: boolean
    }>
  }
}

const ExtraLinksContainer = styled.div.attrs<SpaceProps>({})`
  ${space};
`

export class ExtraLinks extends React.Component<ExtraLinksProps> {
  render() {
    const isForSaleArtwork = this.props.artwork.is_for_sale
    const consignableArtists = this.props.artwork.artists.filter(
      artist => artist.is_consignable
    )
    if (!isForSaleArtwork && consignableArtists.length === 0) {
      return null
    }
    return (
      <ExtraLinksContainer pb={2}>
        {isForSaleArtwork && (
          <Sans size="2" color="black60">
            Questions about buying art on Artsy? <a href="#">Read our FAQ</a>.
          </Sans>
        )}
        {consignableArtists.length > 0 && (
          <Sans size="2" color="black60">
            Want to sell a work by this artist? <a href="#">Lean more</a>.
          </Sans>
        )}
      </ExtraLinksContainer>
    )
  }
}
