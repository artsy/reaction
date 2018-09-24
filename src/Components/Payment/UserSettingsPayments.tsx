import { Theme } from "@artsy/palette"
import { ContextConsumer, ContextProps } from "Artsy"
import React from "react"
import { SavedCreditCards } from "./SavedCreditCards"
import styled from "styled-components"
import { graphql, RelayProp, createFragmentContainer } from "react-relay"

interface UserSettingsPaymentsProps extends ContextProps {}

class UserSettingsPayments extends React.Component<UserSettingsPaymentsProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ContextConsumer>
        {({ relayEnvironment }) => {
          return (
            <Theme>
              <>
                <SavedCreditCards creditCards={[{ brand: "Visa" }]} />
                <PaymentFormWrapper relayEnvironment={relayEnvironment}
              </>
            </Theme>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const UserSettingsPaymentsFragmentContainer = createFragmentContainer(
  UserSettingsPayments,
  graphql`
    fragment UserSettingsPayments_order on Order {
      id
      requestedFulfillment {
        __typename
        ... on Ship {
          name
          addressLine1
          addressLine2
          city
          region
          country
          postalCode
        }
        ... on Pickup {
          fulfillmentType
        }
      }
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
