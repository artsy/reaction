import { NewPayment_order } from "__generated__/NewPayment_order.graphql"
import { NewPaymentRouteCreateCreditCardMutation } from "__generated__/NewPaymentRouteCreateCreditCardMutation.graphql"
import { NewPaymentRouteSetOrderPaymentMutation } from "__generated__/NewPaymentRouteSetOrderPaymentMutation.graphql"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "Apps/Order/Components/AddressForm"

import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { validateAddress } from "Apps/Order/Utils/formValidators"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy/Analytics"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { RouteConfig, Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayRefetchProp } from "react-relay"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Flex,
  Join,
  Row,
  Serif,
  Spacer,
} from "@artsy/palette"
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
  relay?: RelayRefetchProp
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

interface NewPaymentState {
  hideBillingAddress: boolean
  address: Address
  addressErrors: AddressErrors
  addressTouched: AddressTouched
  stripeError: stripe.Error
  isCreatingStripeToken: boolean
}

const logger = createLogger("Order/Routes/NewPayment/index.tsx")

@track()
export class NewPaymentRoute extends Component<
  NewPaymentProps,
  NewPaymentState
> {
  state = {
    hideBillingAddress: true,
    stripeError: null,
    address: this.startingAddress(),
    addressErrors: {},
    addressTouched: {},
    isCreatingStripeToken: false,
  }

  startingAddress(): Address {
    return {
      ...emptyAddress,
      country: "US",
    }
  }

  get touchedAddress() {
    return {
      name: true,
      country: true,
      postalCode: true,
      addressLine1: true,
      addressLine2: true,
      city: true,
      region: true,
      phoneNumber: true,
    }
  }

  createStripeToken = async () => {
    try {
      this.setState({ isCreatingStripeToken: true })
      const stripeBillingAddress = this.getStripeBillingAddress()
      return await this.props.stripe.createToken(stripeBillingAddress)
    } finally {
      this.setState({ isCreatingStripeToken: false })
    }
  }

  onContinue = async () => {
    if (this.needsAddress()) {
      const { errors, hasErrors } = validateAddress(this.state.address)
      if (hasErrors) {
        this.setState({
          addressErrors: errors,
          addressTouched: this.touchedAddress,
        })
        return
      }
    }

    try {
      const stripeResult = await this.createStripeToken()

      if (stripeResult.error) {
        this.setState({ stripeError: stripeResult.error })
        return
      }

      const creditCardOrError = (await this.createCreditCard({
        input: { token: stripeResult.token.id, oneTimeUse: true },
      })).createCreditCard.creditCardOrError

      if (creditCardOrError.mutationError) {
        this.props.dialog.showErrorDialog({
          message: creditCardOrError.mutationError.detail,
        })
        return
      }

      const orderOrError = (await this.fixFailedPayment({
        input: {
          creditCardId: creditCardOrError.creditCard.id,
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

  handleChangeHideBillingAddress(hideBillingAddress: boolean) {
    if (!hideBillingAddress) {
      this.setState({
        address: {
          ...emptyAddress,
          country: "US",
        },
      })
    }

    this.setState({ hideBillingAddress })
  }

  onAddressChange: AddressChangeHandler = (address, key) => {
    const { errors } = validateAddress(address)
    this.setState({
      address,
      addressErrors: {
        ...this.state.addressErrors,
        [key]: errors[key],
      },
      addressTouched: {
        ...this.state.addressTouched,
        [key]: true,
      },
    })
  }

  render() {
    const { order, isCommittingMutation } = this.props
    const {
      stripeError,
      address,
      addressErrors,
      addressTouched,
      isCreatingStripeToken,
    } = this.state

    const isLoading = isCommittingMutation || isCreatingStripeToken

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
                  <Flex flexDirection="column">
                    <Serif mb={1} size="3t" color="black100" lineHeight="1.1em">
                      Credit card
                    </Serif>
                    <CreditCardInput
                      error={stripeError}
                      onChange={response => {
                        this.setState({ stripeError: response.error })
                      }}
                    />
                  </Flex>

                  {!this.isPickup() && (
                    <Checkbox
                      selected={this.state.hideBillingAddress}
                      onSelect={this.handleChangeHideBillingAddress.bind(this)}
                    >
                      Billing and shipping addresses are the same
                    </Checkbox>
                  )}
                  <Collapse open={this.needsAddress()}>
                    <AddressForm
                      value={address}
                      errors={addressErrors}
                      touched={addressTouched}
                      onChange={this.onAddressChange}
                      billing
                    />
                  </Collapse>

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

  private getStripeBillingAddress(): stripe.TokenOptions {
    const selectedBillingAddress = (this.needsAddress()
      ? this.state.address
      : this.props.order.requestedFulfillment) as Address
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      region,
      postalCode,
      country,
    } = selectedBillingAddress
    return {
      name,
      address_line1: addressLine1,
      address_line2: addressLine2,
      address_city: city,
      address_state: region,
      address_zip: postalCode,
      address_country: country,
    }
  }

  createCreditCard(
    variables: NewPaymentRouteCreateCreditCardMutation["variables"]
  ) {
    return this.props.commitMutation<NewPaymentRouteCreateCreditCardMutation>({
      variables,
      mutation: graphql`
        mutation NewPaymentRouteCreateCreditCardMutation(
          $input: CreditCardInput!
        ) {
          createCreditCard(input: $input) {
            creditCardOrError {
              ... on CreditCardMutationSuccess {
                creditCard {
                  id
                }
              }
              ... on CreditCardMutationFailure {
                mutationError {
                  type
                  message
                  detail
                }
              }
            }
          }
        }
      `,
    })
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

  private isPickup = () => {
    return this.props.order.requestedFulfillment.__typename === "Pickup"
  }

  private needsAddress = () => {
    return this.isPickup() || !this.state.hideBillingAddress
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
  graphql`
    fragment NewPayment_order on Order {
      id
      mode
      creditCard {
        name
        street1
        street2
        city
        state
        country
        postal_code
      }
      requestedFulfillment {
        __typename
        ... on Ship {
          name
          addressLine1
          addressLine2
          city
          region
          country
          postalCode
        }
        ... on Pickup {
          fulfillmentType
        }
      }
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
      ...ArtworkSummaryItem_order
      ...TransactionDetailsSummaryItem_order
    }
  `
)
