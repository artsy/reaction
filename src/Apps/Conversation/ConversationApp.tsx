import { ConversationApp_me } from "__generated__/ConversationApp_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { SystemContext } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import React, { useContext } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { userIsAdmin } from "Utils/user"
import { ConversationsFragmentContainer as Conversations } from "./Components/Conversations"

interface ConversationAppProps {
  me: ConversationApp_me
}

export const ConversationApp = (props: ConversationAppProps) => {
  const { me } = props
  const { user } = useContext(SystemContext)
  const isAdmin = userIsAdmin(user)
  console.log("--->", isAdmin)
  if (isAdmin) {
    return (
      <AppContainer>
        <Title>My Inquiries | Artsy</Title>
        <Conversations me={me} />
      </AppContainer>
    )
  } else {
    // not an admin
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
