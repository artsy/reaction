import { BorderBox, Flex, Sans, Theme } from "@artsy/palette"
import React from "react"
import { Elements, StripeProvider } from "react-stripe-elements"
import PaymentForm from "./PaymentForm"
import { CreditCardDetails } from "Apps/Order/Components/CreditCardDetails"
import { StepSummaryItem } from "Styleguide/Components/StepSummaryItem"
import styled from "styled-components"
import { commitMutation, graphql, RelayProp } from "react-relay"

interface SavedCreditCardsProps {
  creditCards: Array
}

interface CreditCardProps {
  relay?: RelayProp
}

class CreditCard extends React.Component<CreditCardProps> {
  onRemoveButtonPressed = () => {}

  render() {
    return (
      <BorderBox flexDirection="column" p={2} mb={2}>
        <Flex justifyContent="space-between" alignItems="center">
          <CreditCardDetails {...this.props.creditCard} />
          <Sans size="2" color="purple100">
            <RemoveLink onClick={() => console.log("hi")}>Remove</RemoveLink>
          </Sans>
        </Flex>
      </BorderBox>
    )
  }
}

export const RemoveLink = styled.div`
  text-align: right;
  &:hover {
    cursor: pointer;
  }
`

export class SavedCreditCards extends React.Component<SavedCreditCardsProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Theme>
        <>
          {this.props.creditCards.map((creditCard, i) => (
            <CreditCard creditCard={creditCard} key={i} />
          ))}
        </>
      </Theme>
    )
  }
}
