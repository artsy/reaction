import { Review_order } from "__generated__/Review_order.graphql"
import { BuyNowStepper } from "Apps/Order/Components/BuyNowStepper"
import { ItemReviewFragmentContainer as ItemReview } from "Apps/Order/Components/ItemReview"
import { TermsOfServiceCheckbox } from "Apps/Order/Components/TermsOfServiceCheckbox"
import { Router } from "found"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Join } from "Styleguide/Elements/Join"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"
import { Responsive } from "Utils/Responsive"
import { Helper } from "../../Components/Helper"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"
import { TwoColumnLayout } from "../../Components/TwoColumnLayout"

export interface ReviewProps {
  order: Review_order
  router: Router
}

interface ReviewState {
  termsCheckboxSelected?: Boolean
}

export class ReviewRoute extends Component<ReviewProps, ReviewState> {
  constructor(props) {
    super(props)

    this.state = { termsCheckboxSelected: false }
  }

  updateTermsCheckbox() {
    const { termsCheckboxSelected } = this.state
    this.setState({
      termsCheckboxSelected: !termsCheckboxSelected,
    })
  }

  onOrderSubmitted() {
    this.props.router.push(`/order2/${this.props.order.id}/submission`)
  }

  render() {
    const { order } = this.props
    const { termsCheckboxSelected } = this.state

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
                    <Placeholder height="68px" name="Step summary item" />
                    <Placeholder height="68px" name="Step summary item" />

                    {!xs && (
                      <ItemReview
                        artwork={order.lineItems.edges[0].node.artwork}
                      />
                    )}

                    {!xs && (
                      <Flex justifyContent="center">
                        <TermsOfServiceCheckbox
                          onSelect={() => this.updateTermsCheckbox()}
                          selected={termsCheckboxSelected}
                        />
                      </Flex>
                    )}

                    {!xs && (
                      <Button
                        size="large"
                        width="100%"
                        disabled={!termsCheckboxSelected}
                        onClick={() => this.onOrderSubmitted()}
                      >
                        Submit Order
                      </Button>
                    )}
                  </Join>
                  <Spacer mb={3} />
                </>
              }
              Sidebar={
                <Flex flexDirection="column">
                  <TransactionSummary order={order} mb={xs ? 2 : 3} />
                  <Helper
                    artworkId={order.lineItems.edges[0].node.artwork.id}
                  />
                  {xs && (
                    <>
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
                        disabled={!termsCheckboxSelected}
                        onClick={() => this.onOrderSubmitted()}
                      >
                        Submit Order
                      </Button>
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
    }
  `
)
