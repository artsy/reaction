import { storiesOf } from "@storybook/react"
import { UserSettingsPaymentsFragmentContainer } from "Components/Payment/UserSettingsPayments"
import { MockRelayRenderer } from "DevTools"
import React from "react"
import { graphql } from "react-relay"

export function UserSettingsPaymentExample() {
  return (
    <MockRelayRenderer
      Component={UserSettingsPaymentsFragmentContainer}
      mockResolvers={{
        Me: () => ({
          id: "1234",
          creditCards: {
            edges: [],
          },
        }),
      }}
      query={graphql`
        query UserSettingsPaymentsQuery {
          me {
            ...UserSettingsPayments_me
          }
        }
      `}
    />
  )
}

storiesOf("Components/Payment", module)
  .add("Payment Form - no credit cards", () => {
    return (
      <MockRelayRenderer
        Component={UserSettingsPaymentsFragmentContainer}
        mockResolvers={{
          Me: () => ({
            id: "1234",
            creditCards: {
              edges: [],
            },
          }),
        }}
        query={graphql`
          query UserSettingsPaymentsQuery {
            me {
              ...UserSettingsPayments_me
            }
          }
        `}
      />
    )
  })
  .add("Payment Form - multiple credit cards", () => {
    return (
      <MockRelayRenderer
        Component={UserSettingsPaymentsFragmentContainer}
        mockResolvers={{
          Me: () => ({
            id: "1234",
            creditCards: {
              edges: [
                {
                  brand: "Visa",
                  last_four_digits: "1234",
                  expiration_year: "2020",
                  expiration_month: "07",
                },
                {
                  brand: "Visa",
                  last_four_digits: "4444",
                  expiration_year: "2022",
                  expiration_month: "10",
                },
              ],
            },
          }),
        }}
        query={graphql`
          query UserSettingsPaymentsQuery {
            me {
              ...UserSettingsPayments_me
            }
          }
        `}
      />
    )
  })
