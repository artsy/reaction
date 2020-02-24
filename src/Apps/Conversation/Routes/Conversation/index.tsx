import { BorderBox, Flex, Title } from "@artsy/palette"
import { Conversation_me } from "__generated__/Conversation_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { ConversationFragmentContainer as Conversation } from "Apps/Conversation/Components/Conversation"
import { SystemContext } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { userIsAdmin } from "Utils/user"

interface ConversationRouteProps {
  me: Conversation_me
  conversationID: string
}

export const ConversationRoute: React.FC<ConversationRouteProps> = props => {
  const { me } = props
  const { user } = useContext(SystemContext)
  const isAdmin = userIsAdmin(user)
  if (isAdmin) {
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
    // not an admin
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
