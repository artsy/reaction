import { Title } from "@artsy/palette"
import { Conversation_me } from "__generated__/Conversation_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { ConversationFragmentContainer as Conversation } from "Apps/Conversation/Components/Conversation"
import { SystemContext } from "Artsy"
import { findCurrentRoute } from "Artsy/Router/Utils/findCurrentRoute"
import { ErrorPage } from "Components/ErrorPage"
import { Match } from "found"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { userHasLabFeature } from "Utils/user"

interface ConversationRouteProps {
  me: Conversation_me
  conversationID: string
  match: Match
}

export const ConversationRoute: React.FC<ConversationRouteProps> = props => {
  const { me } = props
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
        <Conversation conversation={me.conversation} />
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
        conversation(id: $conversationID) {
          ...Conversation_conversation
        }
      }
    `,
  }
)

export default ConversationFragmentContainer
