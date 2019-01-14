import { Sans, Serif } from "@artsy/palette"
import { OfferSummaryItem_order } from "__generated__/OfferSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Components/v2/StepSummaryItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

const OfferSummaryItem = ({
  order,
  ...others
}: {
  order: OfferSummaryItem_order
} & StepSummaryItemProps) => {
  return (
    <StepSummaryItem title="Your offer" {...others}>
      <Serif size={["2", "3t"]} color="black100">
        {order.myLastOffer.amount}
      </Serif>
      <Sans size="2" color="black60">
        List price: {order.totalListPrice}
      </Sans>
    </StepSummaryItem>
  )
}

export const OfferSummaryItemFragmentContainer = createFragmentContainer(
  OfferSummaryItem,
  graphql`
    fragment OfferSummaryItem_order on Order {
      totalListPrice(precision: 2)
      ... on OfferOrder {
        myLastOffer {
          amount(precision: 2)
        }
      }
    }
  `
)
