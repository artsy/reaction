import { CreditCardSummaryItem_order } from "__generated__/CreditCardSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Components/v2/StepSummaryItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
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
  {
    order: graphql`
      fragment CreditCardSummaryItem_order on Order {
        creditCard {
          brand
          last_digits
          expiration_year
          expiration_month
        }
      }
    `,
  }
)
