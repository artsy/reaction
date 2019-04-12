import { Box, Serif, Theme } from "@artsy/palette"
import { UserSettingsPayments_me } from "__generated__/UserSettingsPayments_me.graphql"
import { UserSettingsPaymentsQuery } from "__generated__/UserSettingsPaymentsQuery.graphql"
import { ContextProps, SystemContext } from "Artsy"
import { get } from "Utils/get"

import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { useContext } from "react"
import {
  createFragmentContainer,
  graphql,
  QueryRenderer,
  RelayProp,
} from "react-relay"
import { PaymentFormWrapper } from "./PaymentFormWrapper"
import { SavedCreditCards } from "./SavedCreditCards"

interface UserSettingsPaymentsProps extends ContextProps {
  relay?: RelayProp
  me: UserSettingsPayments_me
}

export class UserSettingsPayments extends React.Component<
  UserSettingsPaymentsProps
> {
  render() {
    const creditCardEdges = get(this.props, props => props.me.creditCards.edges)
    const creditCards = creditCardEdges.map(({ node: creditCard }) => {
      return creditCard
    })

    return (
      <Theme>
        <>
          {creditCards && creditCards.length ? (
            <Box maxWidth={542}>
              <SavedCreditCards
                creditCards={creditCards as any}
                relay={this.props.relay}
                me={this.props.me}
              />
              <Serif size="6" pb={3} pt={2}>
                Add new card
              </Serif>
            </Box>
          ) : null}
          <PaymentFormWrapper relay={this.props.relay} me={this.props.me} />
        </>
      </Theme>
    )
  }
}

export interface CreditCardType {
  __id: string
  id: string
  brand: string
  last_digits: string
  expiration_month: number
  expiration_year: number
  __typename: string
}

graphql`
  fragment UserSettingsPaymentsCreditCard on CreditCard {
    __id
    id
    brand
    last_digits
    expiration_year
    expiration_month
    __typename
  }
`

export const UserSettingsPaymentsFragmentContainer = createFragmentContainer(
  UserSettingsPayments,
  {
    me: graphql`
      fragment UserSettingsPayments_me on Me {
        __id
        id
        creditCards(first: 100)
          @connection(key: "UserSettingsPayments_creditCards", filters: []) {
          edges {
            node {
              ...UserSettingsPaymentsCreditCard @relay(mask: false)
            }
          }
        }
      }
    `,
  }
)

export const UserSettingsPaymentsQueryRenderer = () => {
  const { user, relayEnvironment } = useContext(SystemContext)
  if (!user) {
    return null
  }

  return (
    <QueryRenderer<UserSettingsPaymentsQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query UserSettingsPaymentsQuery {
          me {
            ...UserSettingsPayments_me
          }
        }
      `}
      render={renderWithLoadProgress(
        UserSettingsPaymentsFragmentContainer as any
      )}
    />
  )
}
