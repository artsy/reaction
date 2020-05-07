import { ConversationApp_me } from "__generated__/ConversationApp_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { ConversationsFragmentContainer as Conversations } from "Apps/Conversation/Components/Conversations"
import { SystemContext } from "Artsy"
import { findCurrentRoute } from "Artsy/Router/Utils/findCurrentRoute"
import { ErrorPage } from "Components/ErrorPage"
import { Match } from "found"
import React, { useContext } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { userHasLabFeature } from "Utils/user"

interface ConversationAppProps {
  me: ConversationApp_me
  match: Match
}

export const ConversationApp: React.FC<ConversationAppProps> = props => {
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
        <Title>My Inquiries | Artsy</Title>
        <Conversations me={me} />
      </AppContainer>
    )
  } else {
    // not allowed to see this view
    return <ErrorPage code={404} />
  }
}

export const ConversationAppFragmentContainer = createFragmentContainer(
  ConversationApp,
  {
    me: graphql`
      fragment ConversationApp_me on Me {
        ...Conversations_me
      }
    `,
  }
)

export default ConversationAppFragmentContainer
