import { Flex, FlexProps, Sans, Serif, Spacer } from "@artsy/palette"
import { OfferHistoryItem_order } from "__generated__/OfferHistoryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Components/v2/StepSummaryItem"
import React, { HTMLProps } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RevealButton } from "./RevealButton"

const OfferHistoryItem: React.SFC<
  {
    order: OfferHistoryItem_order
  } & StepSummaryItemProps
> = ({ order: { totalListPrice, lastOffer, offers }, ...others }) => {
  const previousOffers = offers.edges.filter(
    ({ node: { id } }) => id !== lastOffer.id
  )

  return (
    <StepSummaryItem {...others}>
      <Row>
        <Serif size={["2", "3"]} color="black100" weight="semibold">
          {lastOffer.fromParticipant === "SELLER"
            ? "Seller's offer"
            : "Your offer"}
        </Serif>
        <Serif size={["2", "3"]} color="black100">
          {lastOffer.amount}
        </Serif>
      </Row>
      <Row>
        <div />
        <Sans size="2" color="black60">
          List price: {totalListPrice}
        </Sans>
      </Row>
      {lastOffer.note && (
        <>
          <Spacer mb={2} />
          <Serif size={["2", "3"]} color="black100" weight="semibold">
            {lastOffer.fromParticipant === "SELLER"
              ? "Seller's note"
              : "Your note"}
          </Serif>
          <Serif size="2" color="black60">
            {lastOffer.note}
          </Serif>
          <Spacer mb={1} />
        </>
      )}
      {previousOffers.length > 0 && (
        <>
          <Spacer mb={2} />
          <RevealButton buttonLabel="Show offer history">
            <Flex m={0} flexDirection="column">
              <Serif size={["2", "3"]} color="black100" weight="semibold">
                Offer history
              </Serif>
              {previousOffers.map(({ node: offer }) => (
                <Row key={offer.id}>
                  <Serif size={["2", "3"]} color="black60">
                    {offer.fromParticipant === "BUYER" ? "You" : "Seller"}
                    {` (${offer.createdAt})`}
                  </Serif>
                  <Serif size={["2", "3"]} color="black60">
                    {offer.amount}
                  </Serif>
                </Row>
              ))}
            </Flex>
          </RevealButton>
        </>
      )}
    </StepSummaryItem>
  )
}

const Row: React.SFC<
  // TODO: look into why a separate style prop is necessary here
  FlexProps & { style?: HTMLProps<HTMLDivElement>["style"] }
> = ({ children, ...others }) => (
  <Flex justifyContent="space-between" alignItems="baseline" {...others}>
    {children}
  </Flex>
)

export const OfferHistoryItemFragmentContainer = createFragmentContainer(
  OfferHistoryItem,
  graphql`
    fragment OfferHistoryItem_order on Order {
      ... on OfferOrder {
        offers {
          edges {
            node {
              id
              amount(precision: 2)
              createdAt(format: "MMM D")
              fromParticipant
            }
          }
        }
        lastOffer {
          id
          fromParticipant
          amount(precision: 2)
          shippingTotal(precision: 2)
          taxTotal(precision: 2)
          note
        }
      }
      totalListPrice(precision: 2)
    }
  `
)
