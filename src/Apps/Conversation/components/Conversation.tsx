import { Box } from "@artsy/palette"
import { Conversation_conversation } from "__generated__/Conversation_conversation.graphql"
import React from "react"
import { createFragmentContainer, RelayProp } from "react-relay"
import { graphql } from "relay-runtime"
import { MessageFragmentContainer as Message } from "./Message"
import { Reply } from "./Reply"

interface ConversationProps {
  conversation: Conversation_conversation
  relay: RelayProp
}

const Conversation = (props: ConversationProps) => {
  const { conversation, relay } = props
  const messageCount = conversation.messages.edges.length
  return (
    <Box>
      {conversation.messages.edges.map((m, idx) => (
        <Message
          message={m.node}
          initialMessage={conversation.initialMessage}
          key={m.cursor}
          isFirst={idx === messageCount - 1}
        />
      ))}
      <Reply conversation={conversation} environment={relay.environment} />
    </Box>
  )
}

export const ConversationFragmentContainer = createFragmentContainer(
  Conversation,
  {
    conversation: graphql`
      fragment Conversation_conversation on Conversation
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        ) {
        id
        internalID
        from {
          name
          email
        }
        to {
          name
          initials
        }
        initialMessage
        lastMessageID
        unread
        messages(first: $count, after: $after, sort: DESC)
          @connection(key: "Messages_messages", filters: []) {
          pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              internalID
              ...Message_message
            }
          }
        }
      }
    `,
  }
)
