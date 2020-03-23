import { BorderBox, Flex, Title } from "@artsy/palette"
import { Conversation_me } from "__generated__/Conversation_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { ConversationFragmentContainer as Conversation } from "Apps/Conversation/Components/Conversation"
import { SystemContext } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { userHasLabFeature } from "Utils/user"

interface ConversationRouteProps {
  me: Conversation_me
  conversationID: string
}

export const ConversationRoute: React.FC<ConversationRouteProps> = props => {
  const { me } = props
  const { user } = useContext(SystemContext)
  const isEnabled = userHasLabFeature(user, "User Conversations View")
  if (isEnabled) {
    return (
      <AppContainer>
        <Title>My Inquiries | Artsy</Title>
        <BorderBox>
          <Flex flexDirection="column">
            <Conversation conversation={me.conversation} />
          </Flex>
        </BorderBox>
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
