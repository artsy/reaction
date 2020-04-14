import {
  Box,
  Col,
  Flex,
  Image,
  Link,
  Row,
  Sans,
  Separator,
  Serif,
  StackableBorderBox,
} from "@artsy/palette"
import { ConversationSnippet_conversation } from "__generated__/ConversationSnippet_conversation.graphql"
import {
  ImageWithFallback,
  renderFallbackImage,
} from "Apps/Artist/Routes/AuctionResults/Components/ImageWithFallback"
import { Truncator } from "Components/Truncator"
import { DateTime } from "luxon"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import styled from "styled-components"
import truncate from "trunc-html"

const StyledImage = styled(ImageWithFallback)`
  max-height: 100%;
  max-width: 100%;
`

interface ConversationSnippetProps {
  conversation: ConversationSnippet_conversation
}

const ConversationSnippet: React.FC<ConversationSnippetProps> = props => {
  const conversation = props.conversation
  // If we cannot resolve items in the conversation, such as deleted fair booths
  // prior to snapshotting them at time of inquiry (generally older conversations),
  // just skip over the entire conversation.
  if (conversation.items.length === 0) {
    console.warn(
      `Unable to load items for conversation with ID ${conversation.internalID}`
    )
    return null
  }

  const item = conversation.items[0].item

  let imageURL
  let title
  if (item.__typename === "Artwork") {
    imageURL = item.image && item.image.url
    title = item.title
  } else if (item.__typename === "Show") {
    imageURL = item.coverImage && item.coverImage.url
    title = item.name
  }
  const date = DateTime.fromISO(conversation.lastMessageAt).toRelative()

  const partnerName = conversation.to.name

  const conversationText =
    conversation.lastMessage && conversation.lastMessage.replace(/\n/g, " ")

  const truncatedText = truncate(conversationText, 100).html
  console.log("CONVERSATION", conversation)
  console.log("truncatedText", truncatedText)

  return (
    <Box>
      <Link
        href={`/user/conversations/${conversation.internalID}`}
        underlineBehavior="none"
      >
        <Row height="120px" px={2} pt={2}>
          <Col xs="3">
            <Flex
              alignItems="center"
              justifyContent="center"
              height="80px"
              width="80px"
            >
              {imageURL ? (
                <StyledImage
                  src={imageURL}
                  Fallback={() => renderFallbackImage()}
                />
              ) : (
                renderFallbackImage()
              )}
            </Flex>
          </Col>
          <Col xs="9">
            <Flex alignItems="center" width="100%" height="100%">
              <Box>
                <Row>
                  <Sans
                    size="3"
                    weight="medium"
                    mr="5px"
                    color={conversation.unread ? "black" : "black60"}
                  >
                    {partnerName}
                  </Sans>
                  <Sans size="3" weight="medium" color={"black60"}>
                    {conversation.items.length}
                  </Sans>
                </Row>
                <Row>
                  <Sans
                    size="3"
                    weight="medium"
                    color={conversation.unread ? "black" : "black60"}
                  >
                    {truncatedText}
                  </Sans>
                </Row>
              </Box>
            </Flex>
          </Col>
          <Separator mt={2} />
        </Row>
      </Link>
    </Box>
  )
}

export const ConversationSnippetFragmentContainer = createFragmentContainer(
  ConversationSnippet,
  {
    conversation: graphql`
      fragment ConversationSnippet_conversation on Conversation {
        internalID
        to {
          name
        }
        lastMessage
        lastMessageAt
        unread
        items {
          item {
            __typename
            ... on Artwork {
              date
              title
              artistNames
              image {
                url
              }
            }
            ... on Show {
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
