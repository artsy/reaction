import { Title, Flex } from "@artsy/palette"
import { Conversation_me } from "__generated__/Conversation_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { ConversationFragmentContainer as Conversation } from "Apps/Conversation/Components/Conversation"
import { ConversationsFragmentContainer as Conversations } from "Apps/Conversation/Components/Conversations"
import { SystemContext } from "Artsy"
import { findCurrentRoute } from "Artsy/Router/Utils/findCurrentRoute"
import { ErrorPage } from "Components/ErrorPage"
import { Match, Router } from "found"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { userHasLabFeature } from "Utils/user"
import { Media } from "Utils/Responsive"
import { Conversations_me } from "__generated__/Conversations_me.graphql"
import {
  FullHeader,
  ConversationHeader,
} from "Apps/Conversation/Components/InboxHeaders"
import { Details } from "../../Components/Details"
interface ConversationRouteProps {
  me: Conversations_me & Conversation_me
  conversationID: string
  match: Match
  router: Router
}

export const ConversationRoute: React.FC<ConversationRouteProps> = props => {
  const { me, router } = props
  const { user } = useContext(SystemContext)
  const isEnabled = userHasLabFeature(user, "User Conversations View")
  if (isEnabled) {
    const route = findCurrentRoute(props.match)
    let maxWidth

    if (route.displayFullPage) {
      maxWidth = "100%"
    }
    return (
      <AppContainer maxWidth={maxWidth}>
        <Title>Inbox | Artsy</Title>

        <Media at="xs">
          <ConversationHeader partnerName={me.conversation.to.name} />
        </Media>
        <Media greaterThan="xs">
          <FullHeader partnerName={me.conversation.to.name} />
        </Media>
        <Flex>
          <Media greaterThan="xs">
            <Conversations me={me as any} />
          </Media>
          <Conversation conversation={me.conversation} />
          <Details
            display={["none", null, null, null, "flex"]}
            width={["100%", "376px"]}
          />
        </Flex>
      </AppContainer>
    )
  } else {
    // not allowed to see this view
    return <ErrorPage code={404} />
  }
}

export const ConversationFragmentContainer = createFragmentContainer(
  ConversationRoute,
  {
    me: graphql`
      fragment Conversation_me on Me
        @argumentDefinitions(conversationID: { type: "String!" }) {
        ...Conversations_me
        conversation(id: $conversationID) {
          to {
            name
          }
          ...Conversation_conversation
        }
      }
    `,
  }
)

export default ConversationFragmentContainer
