import { Sans } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"

export interface ExtraLinksProps {
  artwork: {
    readonly __id: string
    readonly is_biddable: boolean
    readonly is_for_sale: boolean
    artists: Array<{
      readonly __id: string
      readonly is_consignable: boolean
    }>
  }
}

const ExtraLinksContainer = Box

export class ExtraLinks extends React.Component<ExtraLinksProps> {
  render() {
    if (this.props.artwork.is_biddable) {
      return (
        <ExtraLinksContainer pb={3} pt={1}>
          <Sans size="2" color="black60">
            Have a question? <a href="#">Read our FAQ</a> or{" "}
            <a href="#">ask a specialist</a>.
          </Sans>
        </ExtraLinksContainer>
      )
    }
    const isForSaleArtwork = this.props.artwork.is_for_sale
    const consignableArtists = this.props.artwork.artists.filter(
      artist => artist.is_consignable
    )
    if (!isForSaleArtwork && consignableArtists.length === 0) {
      return null
    }
    return (
      <ExtraLinksContainer pb={3} pt={1}>
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
