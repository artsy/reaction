import { Button, Col, Flex, Row, Spacer } from "@artsy/palette"
import { Accept_order } from "__generated__/Accept_order.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { track } from "Artsy/Analytics"
import { RouteConfig, Router } from "found"
import React, { Component } from "react"
import { Media } from "Utils/Responsive"
import {
  counterofferFlowSteps,
  OrderStepper,
} from "../../Components/OrderStepper"

import { createFragmentContainer, graphql, RelayProp } from "react-relay"

import { AcceptOfferMutation } from "__generated__/AcceptOfferMutation.graphql"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"

interface AcceptProps {
  order: Accept_order
  relay?: RelayProp
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

const logger = createLogger("Order/Routes/Offer/index.tsx")

@track()
export class Accept extends Component<AcceptProps> {
  acceptOffer() {
    return this.props.commitMutation<AcceptOfferMutation>({
      variables: {
        input: { offerId: this.props.order.lastOffer.id },
      },
      mutation: graphql`
        mutation AcceptOfferMutation($input: buyerAcceptOfferInput!) {
          ecommerceBuyerAcceptOffer(input: $input) {
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
    })
  }

  onSubmit = async () => {
    try {
      const orderOrError = (await this.acceptOffer()).ecommerceBuyerAcceptOffer
        .orderOrError

      if (orderOrError.error) {
        this.handleAcceptError(orderOrError.error)
        return
      }

      this.props.router.push(`/orders/${this.props.order.id}/status`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  async handleAcceptError(error: { code: string; data: string }) {
    logger.error(error)
    switch (error.code) {
      case "capture_failed": {
        const parsedData = get(error, e => JSON.parse(e.data), {})

        // https://stripe.com/docs/declines/codes
        if (parsedData.failure_code === "insufficient_funds") {
          this.showCardFailureDialog({
            title: "Insufficient funds",
            message:
              "There aren’t enough funds available on the card you provided. Please use a new card. Alternatively, contact your card provider, then press “Submit” again.",
          })
        } else {
          this.showCardFailureDialog({
            title: "Charge failed",
            message:
              "Payment authorization has been declined. Please contact your card provider, then press “Submit” again. Alternatively, use a new card.",
          })
        }
        break
      }
      case "insufficient_inventory": {
        await this.props.dialog.showErrorDialog({
          title: "Not available",
          message: "Sorry, the work is no longer available",
        })
        this.routeToArtistPage()
        break
      }
      default:
        this.props.dialog.showErrorDialog()
    }
  }

  async showCardFailureDialog(props: { title: string; message: string }) {
    const { confirmed } = await this.props.dialog.showConfirmDialog({
      ...props,
      cancelButtonText: "OK",
      confirmButtonText: "Use new card",
    })
    if (confirmed) {
      this.props.router.push(`/orders/${this.props.order.id}/payment/new`)
    }
  }

  onChangeResponse = () => {
    const { order } = this.props
    this.props.router.push(`/orders/${order.id}/respond`)
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

  render() {
    const { order, isCommittingMutation } = this.props

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
                  <TransactionDetailsSummaryItem
                    order={order}
                    title="Accept seller's offer"
                    useLastSubmittedOffer={true}
                    onChange={this.onChangeResponse}
                  />
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
                <Flex flexDirection="column">
                  <Media greaterThan="xs">
                    {className => (
                      <ArtworkSummaryItem className={className} order={order} />
                    )}
                  </Media>
                  <ShippingSummaryItem order={order} locked />
                  <CreditCardSummaryItem order={order} locked />
                </Flex>
                <Media greaterThan="xs">
                  <Spacer mb={2} />
                </Media>
                <Media at="xs">
                  <>
                    <Spacer mb={2} />
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
                  </>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>
      </>
    )
  }
}

export const AcceptFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(trackPageViewWrapper(Accept))),
  graphql`
    fragment Accept_order on Order {
      id
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
          id
          createdAt
        }
      }
      ...TransactionDetailsSummaryItem_order
      ...ArtworkSummaryItem_order
      ...ShippingSummaryItem_order
      ...CreditCardSummaryItem_order
    }
  `
)
