import { Sans, Serif } from "@artsy/palette"
import { OfferSummaryItem_order } from "__generated__/OfferSummaryItem_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Styleguide/Components/StepSummaryItem"

const OfferSummaryItem = ({
  order: { totalListPrice, itemsTotal },
  ...others
}: {
  order: OfferSummaryItem_order
} & StepSummaryItemProps) => {
  return (
    <StepSummaryItem title="Your offer" {...others}>
      <Serif size={["2", "3t"]} color="black100">
        {itemsTotal}
      </Serif>
      <Sans size="2" color="black60">
        List price: {totalListPrice}
      </Sans>
    </StepSummaryItem>
  )
}

export const OfferSummaryItemFragmentContainer = createFragmentContainer(
  OfferSummaryItem,
  graphql`
    fragment OfferSummaryItem_order on Order {
      itemsTotal(precision: 2)
      totalListPrice(precision: 2)
    }
  `
)
