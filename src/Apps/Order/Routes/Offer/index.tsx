import { Button, Flex, Sans, Spacer } from "@artsy/palette"
import { Offer_order } from "__generated__/Offer_order.graphql"
import { Helper } from "Apps/Order/Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "Apps/Order/Components/TransactionSummary"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { track } from "Artsy/Analytics"
import { ContextConsumer, Mediator } from "Artsy/SystemContext"
import { Input } from "Components/Input"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
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
@track()
export class OfferRoute extends Component<OfferProps, OfferState> {
  state = {
    offerValue: null,
    isCommittingMutation: false,
    isErrorModalOpen: false,
    errorModalTitle: null,
    errorModalMessage: null,
  }

  componentDidMount() {
    this.props.mediator.trigger("order:offer")
  }

  onContinueButtonPressed: () => void = () => {
    this.setState({ isCommittingMutation: true }, () => {
      if (this.props.relay && this.props.relay.environment) {
        // TODO: commit mutation
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
          this.setState({ isCommittingMutation: false })
          this.setState({
            isErrorModalOpen: true,
            errorModalTitle: "Congratulations",
            errorModalMessage: "You clicked the button. Well done!",
          })
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
              <OrderStepper currentStep="Offer" makeOfferFlow />
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
                    <Sans size="2" color="black60">
                      List price: $15,000
                    </Sans>
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
                    <TransactionSummary order={order} mb={xs ? 2 : 3} />
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
