import { Payment_me } from "__generated__/Payment_me.graphql"
import { Payment_order } from "__generated__/Payment_order.graphql"
import { PaymentRouteSetOrderPaymentMutation } from "__generated__/PaymentRouteSetOrderPaymentMutation.graphql"

import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import {
  buyNowFlowSteps,
  offerFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReactStripeElements } from "react-stripe-elements"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

import { Button, Col, Flex, Row, Spacer } from "@artsy/palette"
import {
  PaymentPicker,
  PaymentPickerFragmentContainer,
} from "Apps/Order/Components/PaymentPicker"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"

export const ContinueButton = props => (
  <Button size="large" width="100%" {...props}>
    Continue
  </Button>
)

export interface PaymentProps extends ReactStripeElements.InjectedStripeProps {
  order: Payment_order
  me: Payment_me
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

interface PaymentState {
  isGettingCreditCardId: boolean
}

const logger = createLogger("Order/Routes/Payment/index.tsx")

export class PaymentRoute extends Component<PaymentProps, PaymentState> {
  state: PaymentState = { isGettingCreditCardId: false }
  paymentPicker = React.createRef<PaymentPicker>()
  onContinue = async () => {
    try {
      this.setState({ isGettingCreditCardId: true })
      const result = await this.paymentPicker.current.getCreditCardId()
      this.setState({ isGettingCreditCardId: false })

      if (result.type === "invalid_form") {
        return
      }

      if (result.type === "error") {
        this.props.dialog.showErrorDialog({
          message: result.error,
        })
        return
      }

      const orderOrError = (await this.setOrderPayment({
        input: {
          creditCardId: result.creditCardId,
          orderId: this.props.order.id,
        },
      })).ecommerceSetOrderPayment.orderOrError

      if (orderOrError.error) {
        throw orderOrError.error
      }

      this.props.router.push(`/orders/${this.props.order.id}/review`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  render() {
    const { order, isCommittingMutation } = this.props
    const { isGettingCreditCardId } = this.state

    const isLoading = isGettingCreditCardId || isCommittingMutation

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Payment"
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
              <Flex
                flexDirection="column"
                style={isLoading ? { pointerEvents: "none" } : {}}
              >
                <PaymentPickerFragmentContainer
                  commitMutation={this.props.commitMutation}
                  me={this.props.me}
                  order={this.props.order}
                  innerRef={this.paymentPicker}
                />
                <Spacer mb={3} />
                <Media greaterThan="xs">
                  <ContinueButton
                    onClick={this.onContinue}
                    loading={isLoading}
                  />
                </Media>
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <ArtworkSummaryItem order={order} />
                  <TransactionDetailsSummaryItem order={order} />
                </Flex>
                <Spacer mb={[2, 3]} />
                <Media at="xs">
                  <>
                    <Spacer mb={3} />
                    <ContinueButton
                      onClick={this.onContinue}
                      loading={isLoading}
                    />
                  </>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>
      </>
    )
  }
  setOrderPayment(variables: PaymentRouteSetOrderPaymentMutation["variables"]) {
    return this.props.commitMutation<PaymentRouteSetOrderPaymentMutation>({
      variables,
      mutation: graphql`
        mutation PaymentRouteSetOrderPaymentMutation(
          $input: SetOrderPaymentInput!
        ) {
          ecommerceSetOrderPayment(input: $input) {
            orderOrError {
              ... on OrderWithMutationSuccess {
                order {
                  creditCard {
                    id
                    name
                    street1
                    street2
                    city
                    state
                    country
                    postal_code
                  }
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
}

export const PaymentFragmentContainer = createFragmentContainer(
  injectCommitMutation(trackPageViewWrapper(injectDialog(PaymentRoute))),
  {
    me: graphql`
      fragment Payment_me on Me {
        ...PaymentPicker_me
      }
    `,
    order: graphql`
      fragment Payment_order on Order {
        id
        mode
        lineItems {
          edges {
            node {
              artwork {
                id
              }
            }
          }
        }
        ...PaymentPicker_order
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
      }
    `,
  }
)
