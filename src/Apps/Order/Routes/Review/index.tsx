import { Button, Flex, Join, Sans, Spacer } from "@artsy/palette"
import { Review_order } from "__generated__/Review_order.graphql"
import { ReviewSubmitOrderMutation } from "__generated__/ReviewSubmitOrderMutation.graphql"
import { ItemReviewFragmentContainer as ItemReview } from "Apps/Order/Components/ItemReview"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { ShippingAndPaymentReviewFragmentContainer as ShippingAndPaymentReview } from "Apps/Order/Components/ShippingAndPaymentReview"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ContextConsumer, Mediator } from "Artsy/SystemContext"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { RouteConfig, Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { Col, Row } from "Styleguide/Elements/Grid"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { get } from "Utils/get"
import { Responsive } from "Utils/Responsive"
import { Helper } from "../../Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"

export interface ReviewProps {
  mediator: Mediator
  order: Review_order
  relay?: RelayProp
  router: Router
  route: RouteConfig
}

interface ReviewState {
  isSubmitting: boolean
  isErrorModalOpen: boolean
  errorModalMessage: string
  errorModalTitle: string
  errorModalCtaAction: () => null
}

@track()
export class ReviewRoute extends Component<ReviewProps, ReviewState> {
  state = {
    isSubmitting: false,
    isErrorModalOpen: false,
    errorModalMessage: null,
    errorModalTitle: null,
    errorModalCtaAction: null,
  }

  constructor(props) {
    super(props)
    this.onSuccessfulSubmit = this.onSuccessfulSubmit.bind(this)
  }

  componentDidMount() {
    this.props.mediator.trigger("order:review")
  }

  @track<ReviewProps>(props => ({
    action_type: Schema.ActionType.SubmittedOrder,
    order_id: props.order.id,
  }))
  onSuccessfulSubmit() {
    this.props.router.push(`/orders/${this.props.order.id}/status`)
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

              const error = orderOrError.error
              if (error) {
                switch (error.code) {
                  case "insufficient_inventory": {
                    const artistId = this.artistId()
                    this.onMutationError(
                      error,
                      "Not available",
                      "Sorry, the work is no longer available.",
                      artistId ? this.routeToArtistPage.bind(this) : null
                    )
                    break
                  }
                  case "failed_charge_authorize": {
                    const parsedData = JSON.parse(error.data)
                    this.onMutationError(
                      error,
                      "An error occurred",
                      parsedData.failure_message
                    )
                    break
                  }
                  case "artwork_version_mismatch": {
                    this.onMutationError(
                      error,
                      "Work has been updated",
                      "Something about the work changed since you started checkout. Please review the work before submitting your order.",
                      this.routeToArtworkPage.bind(this)
                    )
                    break
                  }
                  default: {
                    this.onMutationError(error)
                    break
                  }
                }
              } else {
                this.onSuccessfulSubmit()
              }
            },
            onError: this.onMutationError.bind(this),
          }
        )
      )
    }
  }

  private artistId() {
    return get(
      this.props.order,
      o => o.lineItems.edges[0].node.artwork.artists[0].id
    )
  }

  private routeToArtworkPage() {
    const artworkId = get(
      this.props.order,
      o => o.lineItems.edges[0].node.artwork.id
    )
    // Don't confirm whether or not you want to leave the page
    this.props.route.onTransition = () => null
    window.location.assign(`/artwork/${artworkId}`)
  }

  private routeToArtistPage() {
    const artistId = this.artistId()

    // Don't confirm whether or not you want to leave the page
    this.props.route.onTransition = () => null
    window.location.assign(`/artist/${artistId}`)
  }

  private onMutationError(
    errors,
    errorModalTitle?,
    errorModalMessage?,
    errorModalCtaAction?
  ) {
    console.error("Order/Routes/Review/index.tsx", errors)
    this.setState({
      isSubmitting: false,
      isErrorModalOpen: true,
      errorModalTitle,
      errorModalMessage,
      errorModalCtaAction,
    })
  }

  onChangePayment() {
    this.props.router.push(`/orders/${this.props.order.id}/payment`)
  }

  onChangeShipping() {
    this.props.router.push(`/orders/${this.props.order.id}/shipping`)
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  render() {
    const { order } = this.props
    const { isSubmitting } = this.state

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Review"
                makeOfferFlow={false /* TODO: order.isMakeOffer or whatever */}
              />
            </Col>
          </Row>
        </HorizontalPadding>

        <Responsive>
          {({ xs }) => (
            <HorizontalPadding>
              <TwoColumnLayout
                Content={
                  <>
                    <Join separator={<Spacer mb={3} />}>
                      <ShippingAndPaymentReview
                        order={order}
                        onChangePayment={this.onChangePayment.bind(this)}
                        onChangeShipping={this.onChangeShipping.bind(this)}
                        mb={xs ? 2 : 3}
                      />

                      {!xs && (
                        <>
                          <ItemReview
                            artwork={order.lineItems.edges[0].node.artwork}
                          />
                          <Spacer mb={3} />
                          <Button
                            size="large"
                            width="100%"
                            loading={isSubmitting}
                            onClick={() => this.onOrderSubmitted()}
                          >
                            Submit
                          </Button>
                          <Spacer mb={2} />
                          <Sans textAlign="center" size="2" color="black60">
                            By clicking Submit, I agree to Artsy’s{" "}
                            <a
                              href="https://www.artsy.net/conditions-of-sale"
                              target="_blank"
                            >
                              Conditions of Sale
                            </a>
                            .
                          </Sans>
                        </>
                      )}
                    </Join>
                    <Spacer mb={3} />
                  </>
                }
                Sidebar={
                  <Flex flexDirection="column">
                    <TransactionSummary order={order} mb={xs ? 2 : 3} />
                    {!xs && (
                      <Helper
                        artworkId={order.lineItems.edges[0].node.artwork.id}
                      />
                    )}
                    {xs && (
                      <>
                        <Button
                          size="large"
                          width="100%"
                          loading={isSubmitting}
                          onClick={() => this.onOrderSubmitted()}
                        >
                          Submit
                        </Button>
                        <Spacer mb={2} />
                        <Sans size="2" color="black60">
                          By clicking Submit, I agree to Artsy’s{" "}
                          <a
                            href="https://www.artsy.net/conditions-of-sale"
                            target="_blank"
                          >
                            Conditions of Sale
                          </a>
                          .
                        </Sans>
                        <Spacer mb={2} />
                        <Helper
                          artworkId={order.lineItems.edges[0].node.artwork.id}
                        />
                      </>
                    )}
                  </Flex>
                }
              />
            </HorizontalPadding>
          )}
        </Responsive>

        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
          detailText={this.state.errorModalMessage}
          contactEmail="orders@artsy.net"
          headerText={this.state.errorModalTitle}
          ctaAction={this.state.errorModalCtaAction}
        />
      </>
    )
  }
}

const ReviewRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => {
      return <ReviewRoute {...props} mediator={mediator} />
    }}
  </ContextConsumer>
)

export const ReviewFragmentContainer = createFragmentContainer(
  ReviewRouteWrapper,
  graphql`
    fragment Review_order on Order {
      id
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
      ...TransactionSummary_order
      ...ShippingAndPaymentReview_order
    }
  `
)
