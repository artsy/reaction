import { Review_order } from "__generated__/Review_order.graphql"
import { ReviewSubmitOrderMutation } from "__generated__/ReviewSubmitOrderMutation.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { ItemReviewFragmentContainer as ItemReview } from "Apps/Order/Components/ItemReview"
import { ShippingAndPaymentReviewFragmentContainer as ShippingAndPaymentReview } from "Apps/Order/Components/ShippingAndPaymentReview"
import { TermsOfServiceCheckbox } from "Apps/Order/Components/TermsOfServiceCheckbox"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Join } from "Styleguide/Elements/Join"
import { Spacer } from "Styleguide/Elements/Spacer"
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
  termsCheckboxSelected: boolean
  isSubmitting: boolean
}

export class ReviewRoute extends Component<ReviewProps, ReviewState> {
  state = {
    termsCheckboxSelected: false,
    isSubmitting: false,
  }

  updateTermsCheckbox() {
    const { termsCheckboxSelected } = this.state
    this.setState({
      termsCheckboxSelected: !termsCheckboxSelected,
    })
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
                  }
                }
              }
            `,
            variables: {
              input: {
                orderId: this.props.order.id,
              },
            },
            onCompleted: () =>
              // TODO: handle failure
              this.props.router.push(`/order2/${this.props.order.id}/status`),
          }
        )
      )
    }
  }

  onChangePayment() {
    console.log("Clicked to change payment")
  }

  onChangeShipping() {
    console.log("Clicked to change shipping")
  }

  render() {
    const { order } = this.props
    const { termsCheckboxSelected, isSubmitting } = this.state

    return (
      <>
        <Row>
          <Col>
            <BuyNowStepper currentStep={"review"} />
          </Col>
        </Row>

        <Spacer mb={3} />

        <Responsive>
          {({ xs }) => (
            <TwoColumnLayout
              Content={
                <>
                  <Join separator={<Spacer mb={3} />}>
                    <ShippingAndPaymentReview
                      order={order}
                      onChangePayment={this.onChangePayment}
                      onChangeShipping={this.onChangeShipping}
                      mb={xs ? 2 : 3}
                    />

                    {!xs && (
                      <>
                        <ItemReview
                          artwork={order.lineItems.edges[0].node.artwork}
                        />
                        <Spacer mb={3} />
                        <Flex justifyContent="center">
                          <TermsOfServiceCheckbox
                            onSelect={() => this.updateTermsCheckbox()}
                            selected={termsCheckboxSelected}
                          />
                        </Flex>
                        <Spacer mb={3} />
                        <Button
                          size="large"
                          width="100%"
                          loading={isSubmitting}
                          disabled={!termsCheckboxSelected}
                          onClick={() => this.onOrderSubmitted()}
                        >
                          Submit Order
                        </Button>
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
                      <Flex justifyContent="center">
                        <TermsOfServiceCheckbox
                          onSelect={() => this.updateTermsCheckbox()}
                          selected={termsCheckboxSelected}
                        />
                      </Flex>
                      <Spacer mb={2} />
                      <Button
                        size="large"
                        width="100%"
                        disabled={!termsCheckboxSelected}
                        onClick={() => this.onOrderSubmitted()}
                      >
                        Submit Order
                      </Button>
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
