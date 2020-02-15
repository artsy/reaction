import { Box, Button, TextArea } from "@artsy/palette"
import { Conversation_conversation } from "__generated__/Conversation_conversation.graphql"
import { CommitMutation } from "Apps/Order/Utils/commitMutation"
import { SystemContext } from "Artsy"
import React, { useContext, useState } from "react"
import { RelayProp } from "react-relay"
import { SendConversationMessage } from "../Mutation/SendConversationMessage"

interface ReplyProps {
  conversation: Conversation_conversation
  replyToMessageId: string
  relay?: RelayProp
  commitMutation: CommitMutation
}

export const Reply = (props: ReplyProps) => {
  const { commitMutation, conversation, replyToMessageId } = props
  const [bodyText, setBodyText] = useState("")
  const { user } = useContext(SystemContext)
  return (
    <Box m={1}>
      <TextArea
        description="For your security do not share personal information."
        onChange={event => setBodyText(event.value)}
      />
      <Button
        onClick={() =>
          SendConversationMessage(commitMutation, {
            input: {
              id: conversation.internalID,
              bodyText,
              from: user.email || "ashkan.nasseri@gmail.com",
              replyToMessageID: replyToMessageId,
            },
          })
        }
      >
        Reply
      </Button>
    </Box>
  )
}
