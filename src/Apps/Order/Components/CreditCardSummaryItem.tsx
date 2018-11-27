import { CreditCardSummaryItem_order } from "__generated__/CreditCardSummaryItem_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Styleguide/Components/StepSummaryItem"
import { CreditCardDetails } from "./CreditCardDetails"

const CreditCardSummaryItem = ({
  order: { creditCard },
  ...others
}: {
  order: CreditCardSummaryItem_order
} & StepSummaryItemProps) => {
  return (
    <StepSummaryItem {...others}>
      <CreditCardDetails {...creditCard} />
    </StepSummaryItem>
  )
}

export const CreditCardSummaryItemFragmentContainer = createFragmentContainer(
  CreditCardSummaryItem,
  graphql`
    fragment CreditCardSummaryItem_order on Order {
      creditCard {
        brand
        last_digits
        expiration_year
        expiration_month
      }
    }
  `
)
