import { Box, Sans, Spacer } from "@artsy/palette"
import { ContextConsumer } from "Artsy/Router"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import { ArtworkSidebarExtraLinks_artwork } from "__generated__/ArtworkSidebarExtraLinks_artwork.graphql"
import { data as sd } from "sharify"

export interface ArtworkSidebarExtraLinksProps {
  artwork: ArtworkSidebarExtraLinks_artwork
}

const Container = ({ children }) => (
  <Sans size="2" color="black60">
    {children}
  </Sans>
)

const Link = styled.a`
  text-decoration: underline;
`

export class ArtworkSidebarExtraLinks extends React.Component<
  ArtworkSidebarExtraLinksProps
> {
  onClickConditionsOfSale() {
    window.open(`${sd.APP_URL}/conditions-of-sale`, "_blank")
  }
  onClickAuctionFAQ(mediator) {
    mediator && mediator.trigger("openAuctionFAQModal")
  }
  onClickBuyNowFAQ() {
    window.open(`${sd.APP_URL}/buy-now-feature-faq`, "_blank")
  }
  onClickCollectorFAQ(mediator) {
    mediator && mediator.trigger("openCollectorFAQModal")
  }
  onClickAuctionAskSpecialist(mediator) {
    mediator &&
      mediator.trigger("openAuctionAskSpecialistModal", {
        artworkId: this.props.artwork.__id,
      })
  }
  onClickBuyNowAskSpecialist(mediator) {
    mediator &&
      mediator.trigger("openBuyNowAskSpecialistModal", {
        artworkId: this.props.artwork.__id,
      })
  }
  onClickConsign() {
    window.open(`${sd.APP_URL}/consign`, "_blank")
  }

  renderAuctionTerms(mediator) {
    return (
      <Container>
        By placing your bid you agree to Artsy's{" "}
        <Link onClick={this.onClickConditionsOfSale.bind(this)}>
          Conditions of Sale
        </Link>.
        <Spacer mb={1} />
      </Container>
    )
  }
  renderAuctionQuestionsLine(mediator) {
    return (
      <Container>
        Have a question? Read our{" "}
        <Link onClick={this.onClickAuctionFAQ.bind(this, mediator)}>
          auction FAQs
        </Link>{" "}
        or{" "}
        <Link onClick={this.onClickAuctionAskSpecialist.bind(this, mediator)}>
          ask a specialist
        </Link>.
      </Container>
    )
  }
  renderForSaleQuestionsLine(mediator) {
    const { is_acquireable, is_inquireable } = this.props.artwork

    if (is_acquireable)
      return (
        <Container>
          Have a question?{" "}
          <Link onClick={this.onClickBuyNowFAQ.bind(this)}>Read our FAQ</Link>{" "}
          or{" "}
          <Link onClick={this.onClickBuyNowAskSpecialist.bind(this, mediator)}>
            ask a specialist
          </Link>.
        </Container>
      )

    if (is_inquireable)
      return (
        <Container>
          Have a question?{" "}
          <Link onClick={this.onClickCollectorFAQ.bind(this, mediator)}>
            Read our FAQ
          </Link>.
        </Container>
      )
  }

  renderConsignmentsLine(artistsCount) {
    return (
      <Container>
        Want to sell a work by{" "}
        {artistsCount === 1 ? "this artist" : "these artists"}?{" "}
        <Link onClick={this.onClickConsign.bind(this)}>Learn more</Link>.
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
      <ContextConsumer>
        {({ mediator }) => (
          <Box mt={2}>
            {isInOpenAuction && this.renderAuctionTerms(mediator)}
            {renderQuestionsLine &&
              (artwork.is_in_auction
                ? this.renderAuctionQuestionsLine(mediator)
                : this.renderForSaleQuestionsLine(mediator))}
            {!!consignableArtistsCount &&
              this.renderConsignmentsLine(consignableArtistsCount)}
          </Box>
        )}
      </ContextConsumer>
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
