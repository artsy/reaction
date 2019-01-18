import { Box, Button, Col, Flex, Join, Row, Spacer } from "@artsy/palette"
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
import { StickyFooter } from "Apps/Order/Components/StickyFooter"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { RouteConfig, Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { ErrorWithMetadata } from "Utils/errors"
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
}

interface ReviewState {
  isSubmitting: boolean
}

const logger = createLogger("Order/Routes/Review/index.tsx")

@track()
export class ReviewRoute extends Component<ReviewProps, ReviewState> {
  state: ReviewState = {
    isSubmitting: false,
  }

  constructor(props) {
    super(props)
    this.onSuccessfulSubmit = this.onSuccessfulSubmit.bind(this)
  }

  @track<ReviewProps>(props => ({
    action_type:
      props.order.mode === "BUY"
        ? Schema.ActionType.SubmittedOrder
        : Schema.ActionType.SubmittedOffer,
    order_id: props.order.id,
  }))
  onSuccessfulSubmit() {
    this.props.router.push(`/orders/${this.props.order.id}/status`)
  }

  onSubmit() {
    this.props.order.mode === "BUY"
      ? this.onOrderSubmitted()
      : this.onOfferOrderSubmitted()
  }

  onOrderSubmitted() {
    if (this.props.relay && this.props.relay.environment) {
      this.setState({ isSubmitting: true }, () =>
        commitMutation<ReviewSubmitOrderMutation>(
          this.props.relay.environment,
          {
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
            variables: {
              input: {
                orderId: this.props.order.id,
              },
            },
            onCompleted: result => {
              const {
                ecommerceSubmitOrder: { orderOrError },
              } = result
              this.onSubmitCompleted(orderOrError)
            },
            onError: this.onMutationError.bind(this),
          }
        )
      )
    }
  }

  onOfferOrderSubmitted() {
    if (this.props.relay && this.props.relay.environment) {
      this.setState({ isSubmitting: true }, () =>
        commitMutation<ReviewSubmitOfferOrderMutation>(
          this.props.relay.environment,
          {
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
            variables: {
              input: {
                offerId: this.props.order.myLastOffer.id,
              },
            },
            onCompleted: result => {
              const {
                ecommerceSubmitOrderWithOffer: { orderOrError },
              } = result
              this.onSubmitCompleted(orderOrError)
            },
            onError: this.onMutationError.bind(this),
          }
        )
      )
    }
  }

  onSubmitCompleted = orderOrError => {
    const error = orderOrError.error
    if (error) {
      switch (error.code) {
        case "insufficient_inventory": {
          const artistId = this.artistId()
          this.onMutationError(
            new ErrorWithMetadata(error.code, error),
            "Not available",
            "Sorry, the work is no longer available.",
            artistId ? this.routeToArtistPage.bind(this) : null
          )
          break
        }
        case "failed_charge_authorize": {
          const parsedData = JSON.parse(error.data)
          this.onMutationError(
            new ErrorWithMetadata(error.code, error),
            "An error occurred",
            parsedData.failure_message
          )
          break
        }
        case "artwork_version_mismatch": {
          this.onMutationError(
            new ErrorWithMetadata(error.code, error),
            "Work has been updated",
            "Something about the work changed since you started checkout. Please review the work before submitting your order.",
            this.routeToArtworkPage.bind(this)
          )
          break
        }
        default: {
          this.onMutationError(new ErrorWithMetadata(error.code, error))
          break
        }
      }
    } else {
      this.onSuccessfulSubmit()
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

  onMutationError(error, title?, message?, onContinue?) {
    logger.error(error)
    this.props.dialog
      .showErrorDialog({ message, title })
      // tslint:disable-next-line:no-empty
      .then(onContinue || (() => {}))
    this.setState({
      isSubmitting: false,
    })
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
    const { order } = this.props
    const { isSubmitting } = this.state
    const artwork = get(
      this.props,
      props => order.lineItems.edges[0].node.artwork
    )

    return (
      <>
        <Box pb={55}>
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
                        loading={isSubmitting}
                        onClick={() => this.onSubmit()}
                      >
                        Submit
                      </Button>
                      <Spacer mb={2} />
                      <ConditionsOfSaleDisclaimer textAlign="center" />
                    </Media>
                  </Join>
                  <Spacer mb={3} />
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
                      loading={isSubmitting}
                      onClick={() => this.onSubmit()}
                    >
                      Submit
                    </Button>
                    <Spacer mb={2} />
                    <ConditionsOfSaleDisclaimer />
                    <Spacer mb={2} />
                  </Media>
                </Flex>
              }
            />
          </HorizontalPadding>
        </Box>
        <StickyFooter orderType={order.mode} artworkId={artwork.id} />
      </>
    )
  }
}

export const ReviewFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(injectDialog(ReviewRoute)),
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
