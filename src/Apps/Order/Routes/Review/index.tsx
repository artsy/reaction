import { Button, Flex, Join, Sans, Spacer } from "@artsy/palette"
import { Review_order } from "__generated__/Review_order.graphql"
import { ReviewSubmitOrderMutation } from "__generated__/ReviewSubmitOrderMutation.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { ItemReviewFragmentContainer as ItemReview } from "Apps/Order/Components/ItemReview"
import { ShippingAndPaymentReviewFragmentContainer as ShippingAndPaymentReview } from "Apps/Order/Components/ShippingAndPaymentReview"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Responsive } from "Utils/Responsive"
import { Helper } from "../../Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"

export interface ReviewProps {
  order: Review_order
  relay?: RelayProp
  router: Router
}

interface ReviewState {
  isSubmitting: boolean
  isErrorModalOpen: boolean
  errorModalMessage: string
}

export class ReviewRoute extends Component<ReviewProps, ReviewState> {
  state = {
    isSubmitting: false,
    isErrorModalOpen: false,
    errorModalMessage: null,
  }

  onOrderSubmitted() {
    if (this.props.relay && this.props.relay.environment) {
      this.setState({ isSubmitting: true }, () =>
        commitMutation<ReviewSubmitOrderMutation>(
          this.props.relay.environment,
          {
            mutation: graphql`
              mutation ReviewSubmitOrderMutation($input: SubmitOrderInput!) {
                submitOrder(input: $input) {
                  orderOrError {
                    __typename
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
              if ("error" in result.submitOrder.orderOrError) {
                this.onMutationError(result.submitOrder.orderOrError.error)
                return
              }

              this.props.router.push(`/order2/${this.props.order.id}/status`)
            },
            onError: this.onMutationError.bind(this),
          }
        )
      )
    }
  }

  private onMutationError(errors, errorModalMessage?) {
    console.error("Order/Routes/Review/index.tsx", errors)
    this.setState({
      isSubmitting: false,
      isErrorModalOpen: true,
      errorModalMessage,
    })
  }

  onChangePayment() {
    this.props.router.push(`/order2/${this.props.order.id}/payment`)
  }

  onChangeShipping() {
    this.props.router.push(`/order2/${this.props.order.id}/shipping`)
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  render() {
    const { order } = this.props
    const { isSubmitting } = this.state

    return (
      <>
        <Row>
          <Col>
            <BuyNowStepper currentStep={"review"} />
          </Col>
        </Row>

        <Responsive>
          {({ xs }) => (
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
          )}
        </Responsive>

        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
          detailText={this.state.errorModalMessage}
        />
      </>
    )
  }
}

export const ReviewFragmentContainer = createFragmentContainer(
  ReviewRoute,
  graphql`
    fragment Review_order on Order {
      id
      lineItems {
        edges {
          node {
            artwork {
              id
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
