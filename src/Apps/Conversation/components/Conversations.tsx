import { Box, Sans, Serif } from "@artsy/palette"
import { Conversations_me } from "__generated__/Conversations_me.graphql"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import ConversationSnippet from "./ConversationSnippet"

interface ConversationsProps {
  me: Conversations_me
  relay: RelayRefetchProp
}

const Conversations: React.FC<ConversationsProps> = (
  props: ConversationsProps
) => {
  const { me } = props
  const conversations =
    me.conversationsConnection.edges &&
    me.conversationsConnection.edges.map(x => x.node)
  return (
    <Box px={1}>
      <Serif size="5">Purchases</Serif>
      {conversations.length ? (
        conversations.map(conversation => (
          <ConversationSnippet
            key={conversation.internalID}
            conversation={conversation}
          />
        ))
      ) : (
        <Sans size="2">No Orders</Sans>
      )}
    </Box>
  )
}

export const ConversationsFragmentContainer = createRefetchContainer(
  Conversations as React.ComponentType<ConversationsProps>,
  {
    me: graphql`
      fragment Conversations_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        conversationsConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          edges {
            node {
              internalID
              lastMessage
              ...ConversationSnippet_conversation
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
  },
  graphql`
    query ConversationsQuery(
      $first: Int!
      $last: Int
      $after: String
      $before: String
    ) {
      me {
        ...Conversations_me
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)
