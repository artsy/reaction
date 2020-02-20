import { Box, Flex, Image, Serif } from "@artsy/palette"
import { Conversation_conversation } from "__generated__/Conversation_conversation.graphql"
import React from "react"
import { createFragmentContainer, RelayProp } from "react-relay"
import { graphql } from "relay-runtime"
import { MessageFragmentContainer as Message } from "./Message"
import { Reply } from "./Reply"

interface ItemProps {
  item: Conversation_conversation["items"][0]["item"]
}

const Item: React.FC<ItemProps> = props => {
  const { item } = props
  if (item.__typename === "Artwork") {
    return (
      <Flex width="350px">
        <Flex height="auto" alignItems="center" mr={2}>
          <Image src={item.image.url} width="55px" />
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Serif size="2" weight="semibold">
            {item.artistNames}
          </Serif>
          <Serif italic size="2" color="black60" lineHeight={1.3}>
            {item.title}, {item.date}
          </Serif>
        </Flex>
      </Flex>
    )
  } else if (item.__typename === "Show") {
    // it's a partnerShow
    return (
      <Flex width="350px">
        <Flex height="auto" alignItems="center" mr={2}>
          <Image src={item.coverImage.url} width="55px" />
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Serif size="2" weight="semibold">
            {item.fair.name}
          </Serif>
        </Flex>
      </Flex>
    )
  } else {
    return null
  }
}

interface ConversationProps {
  conversation: Conversation_conversation
  relay: RelayProp
}

const Conversation: React.FC<ConversationProps> = props => {
  const { conversation, relay } = props
  return (
    <Box>
      {conversation.items.map((i, idx) => (
        <Item
          item={i.item}
          key={
            i.item.__typename === "Artwork" || i.item.__typename === "Show"
              ? i.item.id
              : idx
          }
        />
      ))}
      {conversation.messages.edges.map((m, idx) => (
        <Message
          message={m.node}
          initialMessage={conversation.initialMessage}
          key={m.node.id}
          isFirst={idx === 0}
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
          count: { type: "Int", defaultValue: 30 }
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
        messages(first: $count, after: $after, sort: ASC)
          @connection(key: "Messages_messages", filters: []) {
          pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
          }
          edges {
            node {
              id
              internalID
              ...Message_message
            }
          }
        }
        items {
          item {
            __typename
            ... on Artwork {
              id
              date
              title
              artistNames
              image {
                url
              }
            }
            ... on Show {
              id
              fair {
                name
              }
              name
              coverImage {
                url
              }
            }
          }
        }
      }
    `,
  }
)
