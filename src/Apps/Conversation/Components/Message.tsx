import { BorderBox, Sans } from "@artsy/palette"
import { Message_message } from "__generated__/Message_message.graphql"
import { DateTime } from "luxon"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface MessageProps {
  message: Message_message
  initialMessage?: string
  isFirst: boolean
}
const Message: React.FC<MessageProps> = props => {
  const { message, initialMessage, isFirst } = props
  const createdAt = DateTime.fromISO(message.createdAt).toRelative()
  return (
    <BorderBox m={2} flexDirection={"column"}>
      <Sans size="2">
        From: {message.from.name} - {createdAt}
      </Sans>
      <Sans size="2">{isFirst ? initialMessage : message.body}</Sans>
    </BorderBox>
  )
}

export const MessageFragmentContainer = createFragmentContainer(Message, {
  message: graphql`
    fragment Message_message on Message {
      internalID
      body
      createdAt
      isFromUser
      from {
        name
        email
      }
    }
  `,
})
