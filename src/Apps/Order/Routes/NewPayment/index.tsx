import { NewPayment_me } from "__generated__/NewPayment_me.graphql"
import { NewPayment_order } from "__generated__/NewPayment_order.graphql"
import { NewPaymentRouteSetOrderPaymentMutation } from "__generated__/NewPaymentRouteSetOrderPaymentMutation.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy/Analytics"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { RouteConfig, Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayRefetchProp } from "react-relay"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

import { Button, Col, Flex, Join, Row, Spacer } from "@artsy/palette"
import {
  PaymentPicker,
  PaymentPickerFragmentContainer,
} from "Apps/Order/Components/PaymentPicker"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { get } from "Utils/get"

export const ContinueButton = props => (
  <Button size="large" width="100%" {...props}>
    Continue
  </Button>
)

export interface NewPaymentProps
  extends ReactStripeElements.InjectedStripeProps {
  order: NewPayment_order
  me: NewPayment_me
  relay?: RelayRefetchProp
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

interface NewPaymentState {
  isGettingCreditCardId: boolean
}

const logger = createLogger("Order/Routes/NewPayment/index.tsx")

@track()
export class NewPaymentRoute extends Component<
  NewPaymentProps,
  NewPaymentState
> {
  paymentPicker = React.createRef<PaymentPicker>()
  state = {
    isGettingCreditCardId: false,
  }

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

      const orderOrError = (await this.fixFailedPayment({
        input: {
          creditCardId: result.creditCardId,
          offerId: this.props.order.lastOffer.id,
        },
      })).ecommerceFixFailedPayment.orderOrError

      if (orderOrError.error) {
        this.handleFixFailedPaymentError(orderOrError.error.code)
        return
      }

      this.props.router.push(`/orders/${this.props.order.id}/status`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  render() {
    const { order, isCommittingMutation } = this.props
    const { isGettingCreditCardId } = this.state

    const isLoading = isCommittingMutation || isGettingCreditCardId

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper currentStep="Payment" steps={["Payment"]} />
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
                {order.mode === "OFFER" && (
                  <>
                    <Flex>
                      <CountdownTimer
                        action="Submit new payment"
                        note="Expiration will end negotiations on this offer. Keep in mind the work can be sold to another buyer in the meantime."
                        countdownStart={order.lastOffer.createdAt}
                        countdownEnd={order.stateExpiresAt}
                      />
                    </Flex>
                    <Spacer mb={[2, 3]} />
                  </>
                )}
                <Join separator={<Spacer mb={3} />}>
                  <PaymentPickerFragmentContainer
                    order={order}
                    me={this.props.me}
                    commitMutation={this.props.commitMutation}
                    innerRef={this.paymentPicker}
                  />
                  <Media greaterThan="xs">
                    <ContinueButton
                      onClick={this.onContinue}
                      loading={isLoading}
                    />
                  </Media>
                </Join>
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

  fixFailedPayment(
    variables: NewPaymentRouteSetOrderPaymentMutation["variables"]
  ) {
    return this.props.commitMutation<NewPaymentRouteSetOrderPaymentMutation>({
      variables,
      mutation: graphql`
        mutation NewPaymentRouteSetOrderPaymentMutation(
          $input: FixFailedPaymentInput!
        ) {
          ecommerceFixFailedPayment(input: $input) {
            orderOrError {
              ... on OrderWithMutationSuccess {
                order {
                  state
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
                  ... on OfferOrder {
                    awaitingResponseFrom
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

  async handleFixFailedPaymentError(code: string) {
    switch (code) {
      case "capture_failed": {
        this.props.dialog.showErrorDialog({
          title: "Charge failed",
          message:
            "Payment authorization has been declined. Please contact your card provider and try again.",
        })
        break
      }
      case "insufficient_inventory": {
        await this.props.dialog.showErrorDialog({
          title: "Not available",
          message: "Sorry, the work is no longer available.",
        })
        this.routeToArtistPage()
        break
      }
      default: {
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

  routeToArtistPage() {
    const artistId = this.artistId()

    // Don't confirm whether or not you want to leave the page
    this.props.route.onTransition = () => null
    window.location.assign(`/artist/${artistId}`)
  }
}

export const NewPaymentFragmentContainer = createFragmentContainer(
  injectCommitMutation(
    injectStripe(trackPageViewWrapper(injectDialog(NewPaymentRoute)))
  ),
  {
    me: graphql`
      fragment NewPayment_me on Me {
        ...PaymentPicker_me
      }
    `,
    order: graphql`
      fragment NewPayment_order on Order {
        id
        mode
        stateExpiresAt
        lineItems {
          edges {
            node {
              artwork {
                id
                artists {
                  id
                }
              }
            }
          }
        }
        ... on OfferOrder {
          lastOffer {
            createdAt
            id
            note
          }
        }
        ...PaymentPicker_order
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
      }
    `,
  }
)
