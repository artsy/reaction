import { Box } from "@artsy/palette"
import { Messages_messages } from "__generated__/Messages_messages.graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { MessageFragmentContainer as Message } from "./Message"
import { Reply } from "./Reply"

interface MessagesProps {
  messages: Messages_messages
  initialMessage: string
}

const Messages = (props: MessagesProps) => {
  const { messages, initialMessage } = props
  return (
    <Box>
      {messages.edges.map((m, idx) =>
        idx === 0 ? (
          <Message message={m.node} initialMessage={initialMessage} />
        ) : (
          <Message message={m.node} />
        )
      )}
      <Reply />
    </Box>
  )
}

export const MessagesFragmentContainer = createFragmentContainer(Messages, {
  messages: graphql`
    fragment Messages_messages on MessageConnection {
      edges {
        node {
          ...Message_message
        }
      }
    }
  `,
})
