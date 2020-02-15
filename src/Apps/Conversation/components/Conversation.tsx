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
  return (
    <Box>
      {conversation.messages.edges.map((m, idx) =>
        idx === 0 ? (
          <Message
            message={m.node}
            initialMessage={conversation.initialMessage}
            key={m.node.id}
          />
        ) : (
          <Message message={m.node} key={m.node.id} />
        )
      )}
      <Reply conversation={conversation} environment={relay.environment} />
    </Box>
  )
}

export const ConversationFragmentContainer = createFragmentContainer(
  Conversation,
  {
    conversation: graphql`
      fragment Conversation_conversation on Conversation {
        id
        internalID
        from {
          name
          email
        }
        initialMessage
        lastMessageID
        messages(first: 10) {
          edges {
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
