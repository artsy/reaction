import { BorderBox, Flex, Sans, Theme } from "@artsy/palette"
import { SavedCreditCardsDeleteCreditCardMutation } from "__generated__/SavedCreditCardsDeleteCreditCardMutation.graphql"
import { CreditCardDetails } from "Apps/Order/Components/CreditCardDetails"
import { ErrorModal } from "Components/Modal/ErrorModal"
import React from "react"
import { commitMutation, graphql, RelayProp } from "react-relay"
import styled from "styled-components"

interface SavedCreditCardsProps {
  creditCards: any
  me: any
  relay?: RelayProp
}

interface CreditCardsState {
  isErrorModalOpen: boolean
}

interface CreditCardProps {
  creditCard?: any
  me: any
  relay?: RelayProp
}

export class CreditCard extends React.Component<
  CreditCardProps,
  CreditCardsState
> {
  state = { isErrorModalOpen: false }

  render() {
    return (
      <>
        <BorderBox flexDirection="column" p={2} mb={2}>
          <Flex justifyContent="space-between" alignItems="center">
            <CreditCardDetails {...this.props.creditCard} />
            <Sans size="2" color="purple100">
              <RemoveLink
                onClick={() =>
                  this.deleteCreditCard(this.props.me, this.props.creditCard.id)
                }
              >
                Remove
              </RemoveLink>
            </Sans>
          </Flex>
        </BorderBox>
        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
          contactEmail="support@artsy.net"
        />
      </>
    )
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  private deleteCreditCard(me, id) {
    commitMutation<SavedCreditCardsDeleteCreditCardMutation>(
      this.props.relay.environment,
      {
        onCompleted: (data, errors) => {
          const {
            deleteCreditCard: { creditCardOrError },
          } = data

          if (!creditCardOrError.creditCard) {
            this.onMutationError(errors)
          }
        },
        onError: this.onMutationError.bind(this),
        mutation: graphql`
          mutation SavedCreditCardsDeleteCreditCardMutation(
            $input: DeleteCreditCardInput!
          ) {
            deleteCreditCard(input: $input) {
              creditCardOrError {
                ... on CreditCardMutationSuccess {
                  creditCard {
                    id
                  }
                }
                ... on CreditCardMutationFailure {
                  mutationError {
                    type
                    message
                    detail
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: { id },
        },
        // updater: (store, data) => this.onCreditCardAdded(me, store, data),
      }
    )
  }

  private onMutationError(errors) {
    console.error("SavedCreditCards.tsx", errors)
    this.setState({ isErrorModalOpen: true })
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
            <CreditCard
              creditCard={creditCard}
              key={i}
              relay={this.props.relay}
              me={this.props.me}
            />
          ))}
        </>
      </Theme>
    )
  }
}
