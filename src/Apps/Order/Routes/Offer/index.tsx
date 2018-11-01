import { Button, Flex, Sans, Spacer } from "@artsy/palette"
import { Offer_order } from "__generated__/Offer_order.graphql"
import { OfferMutation } from "__generated__/OfferMutation.graphql"
import { Helper } from "Apps/Order/Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { ContextConsumer, Mediator } from "Artsy/SystemContext"
import { Input } from "Components/Input"
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
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { get } from "Utils/get"
import { Responsive } from "Utils/Responsive"
import { OrderStepper } from "../../Components/OrderStepper"

export interface OfferProps {
  order: Offer_order
  mediator: Mediator
  relay?: RelayProp
  router: Router
}

export interface OfferState {
  offerValue: number | null
  isCommittingMutation: boolean
  isErrorModalOpen: boolean
  errorModalTitle: string
  errorModalMessage: string
}

export class OfferRoute extends Component<OfferProps, OfferState> {
  state = {
    offerValue: null,
    isCommittingMutation: false,
    isErrorModalOpen: false,
    errorModalTitle: null,
    errorModalMessage: null,
  }

  onContinueButtonPressed: () => void = () => {
    this.setState({ isCommittingMutation: true }, () => {
      if (this.props.relay && this.props.relay.environment) {
        const { offerValue } = this.state
        commitMutation<OfferMutation>(this.props.relay.environment, {
          mutation: graphql`
            mutation OfferMutation($input: InitialOfferInput!) {
              ecommerceInitialOffer(input: $input) {
                orderOrError {
                  ... on OrderWithMutationSuccess {
                    __typename
                    order {
                      id
                      offerTotalCents
                      lastOffer {
                        id
                        amountCents
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
          variables: {
            input: {
              orderId: this.props.order.id,
              amountCents: offerValue,
            },
          },
          onCompleted: data => {
            this.setState({ isCommittingMutation: false })
            const {
              ecommerceInitialOffer: { orderOrError },
            } = data

            if (orderOrError.error) {
              const errorCode = orderOrError.error.code
              if (
                errorCode === "cant_offer" ||
                errorCode === "invalid_amount_cents"
              ) {
                this.onMutationError(
                  orderOrError.error,
                  "Cannot create offer",
                  "There was an error processing your offer. Please review and try again."
                )
              } else {
                this.onMutationError(orderOrError.error)
              }
            } else {
              this.props.router.push(`/orders/${this.props.order.id}/shipping`)
            }
          },
          onError: this.onMutationError.bind(this),
        })
      }
    })
  }

  onMutationError(errors, errorModalTitle?, errorModalMessage?) {
    console.error("Offer/index.tsx", errors)
    this.setState({
      isCommittingMutation: false,
      isErrorModalOpen: true,
      errorModalTitle,
      errorModalMessage,
    })
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  render() {
    const { order } = this.props
    const { isCommittingMutation } = this.state
    const artwork = get(
      this.props,
      props => order.lineItems.edges[0].node.artwork
    )

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper currentStep="Offer" offerFlow />
            </Col>
          </Row>
        </HorizontalPadding>

        <Responsive>
          {({ xs }) => (
            <HorizontalPadding>
              <TwoColumnLayout
                Content={
                  <Flex
                    flexDirection="column"
                    style={
                      isCommittingMutation ? { pointerEvents: "none" } : {}
                    }
                  >
                    <Flex flexDirection="column">
                      <Input
                        id="OfferForm_offerValue"
                        title="Your offer"
                        type="number"
                        defaultValue={null}
                        onChange={ev =>
                          this.setState({
                            offerValue: Math.floor(
                              Number(ev.currentTarget.value || "0")
                            ),
                          })
                        }
                        block
                      />
                    </Flex>
                    {Boolean(order.itemsTotal) && (
                      <Sans size="2" color="black60">
                        List price: {order.itemsTotal}
                      </Sans>
                    )}
                    <Spacer mb={3} />
                    {!xs && (
                      <Button
                        onClick={this.onContinueButtonPressed}
                        loading={isCommittingMutation}
                        size="large"
                        width="100%"
                      >
                        Continue
                      </Button>
                    )}
                  </Flex>
                }
                Sidebar={
                  <Flex flexDirection="column">
                    <TransactionSummary
                      order={order}
                      mb={[2, 3]}
                      offerOverride={
                        this.state.offerValue &&
                        this.state.offerValue.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                        })
                      }
                    />
                    <Helper artworkId={artwork.id} />
                    {xs && (
                      <>
                        <Spacer mb={3} />
                        <Button
                          onClick={this.onContinueButtonPressed}
                          loading={isCommittingMutation}
                          size="large"
                          width="100%"
                        >
                          Continue
                        </Button>
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
          contactEmail="orders@artsy.net"
          detailText={this.state.errorModalMessage}
          headerText={this.state.errorModalTitle}
        />
      </>
    )
  }
}

const OfferRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => {
      return <OfferRoute {...props} mediator={mediator} />
    }}
  </ContextConsumer>
)

export const OfferFragmentContainer = createFragmentContainer(
  OfferRouteWrapper,
  graphql`
    fragment Offer_order on Order {
      id
      state
      itemsTotal(precision: 2)
      lineItems {
        edges {
          node {
            artwork {
              id
            }
          }
        }
      }
      ...TransactionSummary_order
    }
  `
)
