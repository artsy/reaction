import { Button, Flex, Sans, Spacer } from "@artsy/palette"
import { Reject_order } from "__generated__/Reject_order.graphql"
import { RejectOfferMutation } from "__generated__/RejectOfferMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { Helper } from "Apps/Order/Components/Helper"
import {
  counterofferFlowSteps,
  OrderStepper,
} from "Apps/Order/Components/OrderStepper"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { ContextConsumer, Mediator } from "Artsy/SystemContext"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { Router } from "found"
import React, { Component } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { StepSummaryItem } from "Styleguide/Components"
import { CountdownTimer } from "Styleguide/Components/CountdownTimer"
import { Col, Row } from "Styleguide/Elements"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { ErrorWithMetadata } from "Utils/errors"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"
import { logger } from "../Respond"

interface RejectProps {
  mediator: Mediator
  order: Reject_order
  relay?: RelayProp
  router: Router
}

interface RejectState {
  isCommittingMutation: boolean
  isErrorModalOpen: boolean
  errorModalTitle: string
  errorModalMessage: string
}

export class Reject extends Component<RejectProps, RejectState> {
  state = {
    isCommittingMutation: false,
    isErrorModalOpen: false,
    errorModalTitle: null,
    errorModalMessage: null,
  }

  onSubmit: () => void = () => {
    this.setState({ isCommittingMutation: true }, () => {
      if (this.props.relay && this.props.relay.environment) {
        commitMutation<RejectOfferMutation>(this.props.relay.environment, {
          mutation: graphql`
            mutation RejectOfferMutation($input: buyerRejectOfferInput!) {
              ecommerceBuyerRejectOffer(input: $input) {
                orderOrError {
                  ... on OrderWithMutationSuccess {
                    __typename
                    order {
                      id
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
          variables: {
            input: {
              offerId: this.props.order.lastOffer.id,
            },
          },
          onCompleted: data => {
            this.setState({ isCommittingMutation: false })
            const {
              ecommerceBuyerRejectOffer: { orderOrError },
            } = data

            if (orderOrError.error) {
              this.onMutationError(
                new ErrorWithMetadata(
                  orderOrError.error.code,
                  orderOrError.error
                )
              )
            } else {
              this.props.router.push(`/orders/${this.props.order.id}/status`)
            }
          },
          onError: this.onMutationError.bind(this),
        })
      }
    })
  }

  onMutationError(error, errorModalTitle?, errorModalMessage?) {
    logger.error(error)
    this.setState({
      isCommittingMutation: false,
      isErrorModalOpen: true,
      errorModalTitle,
      errorModalMessage,
    })
  }

  onChangeResponse = () => {
    const { order } = this.props
    this.props.router.push(`/orders/${order.id}/respond`)
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
              <OrderStepper
                currentStep="Review"
                steps={counterofferFlowSteps}
              />
            </Col>
          </Row>
        </HorizontalPadding>
        <HorizontalPadding>
          <TwoColumnLayout
            Content={
              <Flex
                flexDirection="column"
                style={isCommittingMutation ? { pointerEvents: "none" } : {}}
              >
                <Media at="xs">
                  <Flex flexDirection="column">
                    <ArtworkSummaryItem order={order} />
                  </Flex>
                  <Spacer mb={2} />
                </Media>
                <Flex flexDirection="column">
                  <CountdownTimer
                    action="Respond"
                    note="Expired offers end the negotiation process permanently."
                    countdownStart={order.lastOffer.createdAt}
                    countdownEnd={order.stateExpiresAt}
                  />
                  <StepSummaryItem
                    title="Decline seller's offer"
                    onChange={this.onChangeResponse}
                  >
                    <Sans size="2" color="black60">
                      Declining an offer permanently ends the negotiation
                      process. The seller will not be able to make a
                      counteroffer.
                    </Sans>
                  </StepSummaryItem>
                </Flex>
                <Spacer mb={[2, 3]} />
                <Media greaterThan="xs">
                  <Button
                    onClick={this.onSubmit}
                    loading={isCommittingMutation}
                    size="large"
                    width="100%"
                  >
                    Submit
                  </Button>
                  <Spacer mb={2} />
                  <ConditionsOfSaleDisclaimer textAlign="center" />
                </Media>
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Media greaterThan="xs">
                  <Flex flexDirection="column">
                    <ArtworkSummaryItem order={order} />
                  </Flex>
                  <Spacer mb={3} />
                  <Helper artworkId={artwork.id} />
                </Media>
                <Media at="xs">
                  <>
                    <Button
                      onClick={this.onSubmit}
                      loading={isCommittingMutation}
                      size="large"
                      width="100%"
                    >
                      Submit
                    </Button>
                    <Spacer mb={2} />
                    <ConditionsOfSaleDisclaimer />
                    <Spacer mb={2} />
                    <Helper artworkId={artwork.id} />
                  </>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>
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

const RejectRouteWrapper = props => (
  <ContextConsumer>
    {({ mediator }) => {
      return <Reject {...props} mediator={mediator} />
    }}
  </ContextConsumer>
)

export const RejectFragmentContainer = createFragmentContainer(
  RejectRouteWrapper,
  graphql`
    fragment Reject_order on Order {
      id
      stateExpiresAt
      lastOffer {
        id
        createdAt
      }
      lineItems {
        edges {
          node {
            artwork {
              id
            }
          }
        }
      }
      ...ArtworkSummaryItem_order
    }
  `
)
