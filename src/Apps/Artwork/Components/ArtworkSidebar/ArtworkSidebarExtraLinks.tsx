import { Box, Sans, Spacer } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarExtraLinks_artwork } from "__generated__/ArtworkSidebarExtraLinks_artwork.graphql"

export interface ArtworkSidebarExtraLinksProps {
  artwork: ArtworkSidebarExtraLinks_artwork
}

const Container = ({ children }) => (
  <Sans size="2" color="black60">
    {children}
  </Sans>
)

export class ArtworkSidebarExtraLinks extends React.Component<
  ArtworkSidebarExtraLinksProps
> {
  renderAuctionTerms() {
    return (
      <Container>
        By placing your bid you agree to Artsy's{" "}
        <a href="#">Conditions of Sale</a>.
        <Spacer mb={1} />
      </Container>
    )
  }
  renderAuctionQuestionsLine() {
    return (
      <Container>
        Have a question? Read our <a href="#">auction FAQs</a> or{" "}
        <a href="#">ask a specialist</a>.
      </Container>
    )
  }
  renderForSaleQuestionsLine() {
    const { is_acquireable, is_inquireable } = this.props.artwork

    if (is_acquireable)
      return (
        <Container>
          Have a question? <a href="#">Read our FAQ</a> or{" "}
          <a href="#">ask a specialist</a>.
        </Container>
      )

    if (is_inquireable)
      return (
        <Container>
          Have a question? <a href="#">Read our FAQ</a>.
        </Container>
      )
  }

  renderConsignmentsLine(artistsCount) {
    return (
      <Container>
        Want to sell a work by{" "}
        {artistsCount === 1 ? "this artist" : "these artists"}?{" "}
        <a href="#">Learn more</a>.
      </Container>
    )
  }

  render() {
    const { artwork } = this.props
    const consignableArtistsCount = artwork.artists.filter(
      artist => artist.is_consignable
    ).length
    const isInOpenAuction =
      artwork.is_in_auction && artwork.sale && !artwork.sale.is_closed
    const renderQuestionsLine = artwork.is_for_sale || isInOpenAuction

    if (!renderQuestionsLine && !!!consignableArtistsCount) return null

    return (
      <Box mt={2}>
        {isInOpenAuction && this.renderAuctionTerms()}
        {renderQuestionsLine &&
          (artwork.is_in_auction
            ? this.renderAuctionQuestionsLine()
            : this.renderForSaleQuestionsLine())}
        {!!consignableArtistsCount &&
          this.renderConsignmentsLine(consignableArtistsCount)}
      </Box>
    )
  }
}

export const ArtworkSidebarExtraLinksFragmentContainer = createFragmentContainer(
  ArtworkSidebarExtraLinks,
  graphql`
    fragment ArtworkSidebarExtraLinks_artwork on Artwork {
      __id
      is_in_auction
      is_for_sale
      is_acquireable
      is_inquireable
      artists {
        __id
        is_consignable
      }
      sale {
        is_closed
      }
    }
  `
)
