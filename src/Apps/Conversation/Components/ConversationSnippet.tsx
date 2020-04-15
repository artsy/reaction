import { Box, Flex, Link, Row, Sans, Separator } from "@artsy/palette"
import { ConversationSnippet_conversation } from "__generated__/ConversationSnippet_conversation.graphql"
import {
  ImageWithFallback,
  renderFallbackImage,
} from "Apps/Artist/Routes/AuctionResults/Components/ImageWithFallback"
import { DateTime } from "luxon"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import styled from "styled-components"
import truncate from "trunc-html"

const StyledImage = styled(ImageWithFallback)`
  object-fit: cover;
  height: 80px;
  width: 80px;
`
const StyledFlex = styled(Flex)`
  float: left;
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
        <Flex alignItems="center" px="10px" width="100%" height="120px">
          <StyledFlex alignItems="center" height="80px" width="80px">
            {imageURL ? (
              <StyledImage
                src={imageURL}
                Fallback={() => renderFallbackImage()}
              />
            ) : (
              renderFallbackImage()
            )}
          </StyledFlex>
          <Flex pt="20px" pl="10px" width="100%" height="100%">
            <Box width="100%">
              <Row mb="2px">
                <Flex width="100%" justifyContent="space-between">
                  <Flex>
                    <Sans
                      size="3"
                      weight="medium"
                      mr="5px"
                      color={conversation.unread ? "black" : "black60"}
                    >
                      {partnerName}
                    </Sans>
                    <Sans size="3" color={"black30"}>
                      (message count)
                    </Sans>
                  </Flex>
                  <Flex>
                    <Sans size="3" mr="5px" color={"black30"}>
                      2 hours ago
                    </Sans>
                  </Flex>
                </Flex>
              </Row>
              <Row>
                <Sans
                  size="3t"
                  color={conversation.unread ? "black" : "black60"}
                >
                  {truncatedText}
                </Sans>
              </Row>
            </Box>
          </Flex>
        </Flex>
      </Link>
      <Separator mx="10px" width="auto" />
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
