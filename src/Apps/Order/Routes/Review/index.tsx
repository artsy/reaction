import { Button, Col, Flex, Join, Row, Spacer } from "@artsy/palette"
import { Review_order } from "__generated__/Review_order.graphql"
import { ReviewSubmitOfferOrderMutation } from "__generated__/ReviewSubmitOfferOrderMutation.graphql"
import { ReviewSubmitOrderMutation } from "__generated__/ReviewSubmitOrderMutation.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { ItemReviewFragmentContainer as ItemReview } from "Apps/Order/Components/ItemReview"
import {
  buyNowFlowSteps,
  offerFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { RouteConfig, Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"
import { OfferSummaryItemFragmentContainer as OfferSummaryItem } from "../../Components/OfferSummaryItem"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"

export interface ReviewProps {
  order: Review_order
  relay?: RelayProp
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

const logger = createLogger("Order/Routes/Review/index.tsx")

@track()
export class ReviewRoute extends Component<ReviewProps> {
  @track<ReviewProps>(props => ({
    action_type:
      props.order.mode === "BUY"
        ? Schema.ActionType.SubmittedOrder
        : Schema.ActionType.SubmittedOffer,
    order_id: props.order.id,
  }))
  async onSubmit() {
    const orderOrError =
      this.props.order.mode === "BUY"
        ? (await this.submitBuyOrder()).ecommerceSubmitOrder.orderOrError
        : (await this.submitOffer()).ecommerceSubmitOrderWithOffer.orderOrError

    if (orderOrError.error) {
      this.handleSubmitError(orderOrError.error)
      return
    }

    this.props.router.push(`/orders/${this.props.order.id}/status`)
  }

  submitBuyOrder() {
    return this.props.commitMutation<ReviewSubmitOrderMutation>({
      variables: {
        input: {
          orderId: this.props.order.id,
        },
      },
      mutation: graphql`
        mutation ReviewSubmitOrderMutation($input: SubmitOrderInput!) {
          ecommerceSubmitOrder(input: $input) {
            orderOrError {
              ... on OrderWithMutationSuccess {
                order {
                  state
                }
              }
              ... on OrderWithMutationFailure {
                error {
                  type
                  code
                  data
                }
              }
            }
          }
        }
      `,
    })
  }

  submitOffer() {
    return this.props.commitMutation<ReviewSubmitOfferOrderMutation>({
      variables: {
        input: {
          offerId: this.props.order.myLastOffer.id,
        },
      },
      mutation: graphql`
        mutation ReviewSubmitOfferOrderMutation(
          $input: SubmitOrderWithOfferInput!
        ) {
          ecommerceSubmitOrderWithOffer(input: $input) {
            orderOrError {
              ... on OrderWithMutationSuccess {
                order {
                  state
                }
              }
              ... on OrderWithMutationFailure {
                error {
                  type
                  code
                  data
                }
              }
            }
          }
        }
      `,
    })
  }

  async handleSubmitError(error: { code: string; data: string }) {
    logger.error(error)
    switch (error.code) {
      case "missing_required_info": {
        this.props.dialog.showErrorDialog({
          title: "Missing information",
          message:
            "Please review and update your shipping and/or payment details and try again.",
        })
        break
      }
      case "insufficient_inventory": {
        await this.props.dialog.showErrorDialog({
          title: "Not available",
          message: "Sorry, the work is no longer available.",
        })
        const artistId = this.artistId()
        if (artistId) {
          this.routeToArtistPage()
        }
        break
      }
      case "failed_charge_authorize": {
        const parsedData = JSON.parse(error.data)
        this.props.dialog.showErrorDialog({
          title: "An error occurred",
          message: parsedData.failure_message,
        })
        break
      }
      case "artwork_version_mismatch": {
        await this.props.dialog.showErrorDialog({
          title: "Work has been updated",
          message:
            "Something about the work changed since you started checkout. Please review the work before submitting your order.",
        })
        this.routeToArtworkPage()
        break
      }
      default: {
        logger.error(error)
        this.props.dialog.showErrorDialog()
        break
      }
    }
  }

  artistId() {
    return get(
      this.props.order,
      o => o.lineItems.edges[0].node.artwork.artists[0].id
    )
  }

  routeToArtworkPage() {
    const artworkId = get(
      this.props.order,
      o => o.lineItems.edges[0].node.artwork.id
    )
    // Don't confirm whether or not you want to leave the page
    this.props.route.onTransition = () => null
    window.location.assign(`/artwork/${artworkId}`)
  }

  routeToArtistPage() {
    const artistId = this.artistId()

    // Don't confirm whether or not you want to leave the page
    this.props.route.onTransition = () => null
    window.location.assign(`/artist/${artistId}`)
  }

  onChangeOffer = () => {
    this.props.router.push(`/orders/${this.props.order.id}/offer`)
  }

  onChangePayment = () => {
    this.props.router.push(`/orders/${this.props.order.id}/payment`)
  }

  onChangeShipping = () => {
    this.props.router.push(`/orders/${this.props.order.id}/shipping`)
  }

  render() {
    const { order, isCommittingMutation } = this.props

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Review"
                steps={
                  order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps
                }
              />
            </Col>
          </Row>
        </HorizontalPadding>

        <HorizontalPadding>
          <TwoColumnLayout
            Content={
              <>
                <Join separator={<Spacer mb={3} />}>
                  <Flex flexDirection="column" mb={[2, 3]}>
                    {order.mode === "OFFER" && (
                      <OfferSummaryItem
                        order={order}
                        onChange={this.onChangeOffer}
                      />
                    )}
                    <ShippingSummaryItem
                      order={order}
                      onChange={this.onChangeShipping}
                    />
                    <CreditCardSummaryItem
                      order={order}
                      onChange={this.onChangePayment}
                      title="Payment method"
                    />
                  </Flex>
                  <Media greaterThan="xs">
                    <ItemReview
                      artwork={order.lineItems.edges[0].node.artwork}
                    />
                    <Spacer mb={3} />
                    <Button
                      size="large"
                      width="100%"
                      loading={isCommittingMutation}
                      onClick={() => this.onSubmit()}
                    >
                      Submit
                    </Button>
                    <Spacer mb={2} />
                    <ConditionsOfSaleDisclaimer textAlign="center" />
                  </Media>
                </Join>
              </>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <ArtworkSummaryItem order={order} />
                  <TransactionDetailsSummaryItem order={order} />
                </Flex>
                <Spacer mb={[2, 3]} />
                <Media at="xs">
                  <Button
                    size="large"
                    width="100%"
                    loading={isCommittingMutation}
                    onClick={() => this.onSubmit()}
                  >
                    Submit
                  </Button>
                  <Spacer mb={2} />
                  <ConditionsOfSaleDisclaimer />
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>
      </>
    )
  }
}

export const ReviewFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(injectCommitMutation(injectDialog(ReviewRoute))),
  graphql`
    fragment Review_order on Order {
      id
      mode
      lineItems {
        edges {
          node {
            artwork {
              id
              artists {
                id
              }
              ...ItemReview_artwork
            }
          }
        }
      }
      ... on OfferOrder {
        myLastOffer {
          id
        }
      }
      ...ArtworkSummaryItem_order
      ...TransactionDetailsSummaryItem_order
      ...ShippingSummaryItem_order
      ...CreditCardSummaryItem_order
      ...OfferSummaryItem_order
    }
  `
)
