import { BorderBox, Box, Flex, Image, Link, Sans, Serif } from "@artsy/palette"
import { Message_message } from "__generated__/Message_message.graphql"
import { DateTime } from "luxon"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface AttachmentProps {
  item: Message_message["attachments"][0]
}

const Attachment: React.FC<AttachmentProps> = props => {
  const { item } = props
  if (item.contentType.startsWith("image")) {
    return (
      <Flex flexDirection="column" m={2}>
        <Image src={item.downloadURL} width="75px" title={item.fileName} />
        <Link href={item.downloadURL}>
          <Serif size="2">{item.fileName}</Serif>
        </Link>
      </Flex>
    )
  } else if (item.contentType === "application/pdf") {
    return (
      <Box>
        <Link href={item.downloadURL}>{item.fileName}</Link>
      </Box>
    )
  } else {
    return null
  }
}
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
      {message.attachments && message.attachments.length > 0 && (
        <Serif size="3" mt={3}>
          Attachments
        </Serif>
      )}
      {message.attachments.map(a => (
        <Attachment item={a} key={a.id} />
      ))}
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
      attachments {
        id
        internalID
        contentType
        fileName
        downloadURL
      }
    }
  `,
})
