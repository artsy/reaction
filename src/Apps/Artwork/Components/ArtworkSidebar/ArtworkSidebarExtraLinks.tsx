import { Box, Link, Sans, Spacer } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ContextConsumer } from "Artsy/Router"
import { Mediator } from "Artsy/SystemContext"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"

import { ArtworkSidebarExtraLinks_artwork } from "__generated__/ArtworkSidebarExtraLinks_artwork.graphql"

export interface ArtworkSidebarExtraLinksProps {
  artwork: ArtworkSidebarExtraLinks_artwork
}

export interface ArtworkSidebarExtraLinksContainerProps
  extends ArtworkSidebarExtraLinksProps {
  mediator: Mediator
}

const Container = ({ children }) => (
  <Sans size="2" color="black60">
    {children}
  </Sans>
)

@track({
  context_module: Schema.ContextModule.Sidebar,
})
class ArtworkSidebarExtraLinksContainer extends React.Component<
  ArtworkSidebarExtraLinksContainerProps
> {
  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.AuctionConditionsOfSale,
    type: Schema.Type.Link,
  }))
  onClickConditionsOfSale() {
    window.open(sd.APP_URL + "/conditions-of-sale", "_blank")
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.AuctionFAQ,
    type: Schema.Type.Link,
  }))
  onClickAuctionFAQ() {
    this.props.mediator &&
      this.props.mediator.trigger &&
      this.props.mediator.trigger("openAuctionFAQModal")
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOReadFAQ,
    type: Schema.Type.Link,
  }))
  onClickBuyNowFAQ() {
    window.open(sd.APP_URL + "/buy-now-feature-faq", "_blank")
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.CollectorFAQ,
    type: Schema.Type.Link,
  }))
  onClickCollectorFAQ() {
    this.props.mediator &&
      this.props.mediator.trigger &&
      this.props.mediator.trigger("openCollectorFAQModal")
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.AuctionAskSpecialist,
    type: Schema.Type.Link,
  }))
  onClickAuctionAskSpecialist() {
    this.props.mediator &&
      this.props.mediator.trigger &&
      this.props.mediator.trigger("openAuctionAskSpecialistModal", {
        artworkId: this.props.artwork._id,
      })
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOAskSpecialist,
    type: Schema.Type.Link,
  }))
  onClickBuyNowAskSpecialist() {
    this.props.mediator &&
      this.props.mediator.trigger &&
      this.props.mediator.trigger("openBuyNowAskSpecialistModal", {
        artworkId: this.props.artwork._id,
      })
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.ConsignLearnMore,
    type: Schema.Type.Link,
  }))
  onClickConsign() {
    window.open(sd.APP_URL + "/consign", "_blank")
  }

  renderAuctionTerms() {
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
  renderAuctionQuestionsLine() {
    return (
      <Container>
        Have a question? Read our{" "}
        <Link onClick={this.onClickAuctionFAQ.bind(this)}>auction FAQs</Link> or{" "}
        <Link onClick={this.onClickAuctionAskSpecialist.bind(this)}>
          ask a specialist
        </Link>.
      </Container>
    )
  }
  renderForSaleQuestionsLine() {
    const { is_acquireable, is_inquireable } = this.props.artwork

    if (is_acquireable)
      return (
        <Container>
          Have a question?{" "}
          <Link onClick={this.onClickBuyNowFAQ.bind(this)}>Read our FAQ</Link>{" "}
          or{" "}
          <Link onClick={this.onClickBuyNowAskSpecialist.bind(this)}>
            ask a specialist
          </Link>.
        </Container>
      )

    if (is_inquireable)
      return (
        <Container>
          Have a question?{" "}
          <Link onClick={this.onClickCollectorFAQ.bind(this)}>
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

export const ArtworkSidebarExtraLinks: SFC<
  ArtworkSidebarExtraLinksProps
> = props => {
  return (
    <ContextConsumer>
      {({ mediator }) => (
        <ArtworkSidebarExtraLinksContainer {...props} mediator={mediator} />
      )}
    </ContextConsumer>
  )
}

export const ArtworkSidebarExtraLinksFragmentContainer = createFragmentContainer(
  ArtworkSidebarExtraLinks,
  graphql`
    fragment ArtworkSidebarExtraLinks_artwork on Artwork {
      _id
      is_in_auction
      is_for_sale
      is_acquireable
      is_inquireable
      artists {
        _id
        is_consignable
      }
      sale {
        _id
        is_closed
      }
    }
  `
)
