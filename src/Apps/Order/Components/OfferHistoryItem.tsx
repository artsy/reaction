import { Button, Flex, FlexProps, Sans, Serif } from "@artsy/palette"
import { OfferHistoryItem_order } from "__generated__/OfferHistoryItem_order.graphql"
import { StaticCollapse } from "Components/StaticCollapse"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Styleguide/Components/StepSummaryItem"

class OfferHistoryItem extends React.Component<
  {
    order: OfferHistoryItem_order
  } & StepSummaryItemProps,
  { showingFullHistory: boolean }
> {
  state = { showingFullHistory: false }
  render() {
    const {
      order: { totalListPrice, lastOffer, offers: _offers, buyer },
      ...others
    } = this.props
    const { showingFullHistory } = this.state
    const offers = _offers.edges.filter(
      ({ node: { id } }) => id !== lastOffer.id
    )
    return (
      <StepSummaryItem {...others}>
        <Row>
          <Serif size={["2", "3"]} color="black60">
            {/* TODO: use new field that says whether the offer was from buyer or seller */}
            {/* then we can re-use this in contexts where the buyer has made the most recent offer */}
            Seller's offer
          </Serif>
          <Serif size={["2", "3"]} color="black100">
            {lastOffer.amount}
          </Serif>
        </Row>
        <Row mb={1}>
          <div />
          <Sans size="2" color="black60">
            List price: {totalListPrice}
          </Sans>
        </Row>
        {offers.length > 0 && (
          <>
            <StaticCollapse open={!showingFullHistory}>
              <Row>
                <div />
                <Button
                  variant="secondaryGray"
                  size="small"
                  onClick={() => {
                    this.setState({ showingFullHistory: true })
                  }}
                >
                  Show offer history
                </Button>
              </Row>
            </StaticCollapse>
            <StaticCollapse open={showingFullHistory}>
              <Flex m={0} flexDirection="column">
                {offers.map(({ node: offer }) => (
                  <Row key={offer.id}>
                    <Serif size={["2", "3"]} color="black60">
                      {/* TODO: use new field that says whether the offer was from buyer or seller */}
                      {"id" in offer.from &&
                        (offer.from.id === buyer.id ? "You" : "Seller")}
                      {` (${offer.createdAt})`}
                    </Serif>
                    <Serif size={["2", "3"]} color="black60">
                      {offer.amount}
                    </Serif>
                  </Row>
                ))}
              </Flex>
            </StaticCollapse>
          </>
        )}
      </StepSummaryItem>
    )
  }
}

const Row: React.SFC<FlexProps> = ({ children, ...others }) => (
  <Flex justifyContent="space-between" alignItems="baseline" {...others}>
    {children}
  </Flex>
)

export const OfferHistoryItemFragmentContainer = createFragmentContainer(
  OfferHistoryItem,
  graphql`
    fragment OfferHistoryItem_order on Order {
      offers {
        edges {
          node {
            id
            from {
              __typename
              ... on Partner {
                id
              }
              ... on User {
                id
              }
            }
            amount(precision: 2)
            createdAt(format: "MMM D")
          }
        }
      }
      lastOffer {
        id
        from {
          __typename
        }
        amount(precision: 2)
        shippingTotal(precision: 2)
        taxTotal(precision: 2)
      }
      totalListPrice(precision: 2)
      buyer {
        ... on User {
          id
        }
        ... on Partner {
          id
        }
      }
    }
  `
)
