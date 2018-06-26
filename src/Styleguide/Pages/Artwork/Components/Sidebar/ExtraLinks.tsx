import { Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { ExtraLinks_artwork } from "__generated__/ExtraLinks_artwork.graphql"

export interface ExtraLinksProps {
  artwork: ExtraLinks_artwork
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

export const ExtraLinksFragmentContainer = createFragmentContainer(
  ExtraLinks,
  graphql`
    fragment ExtraLinks_artwork on Artwork {
      __id
      is_biddable
      is_for_sale
      artists {
        __id
        is_consignable
      }
    }
  `
)
