import { BorderBox, Flex } from "@artsy/palette"
import { Detail_me } from "__generated__/Detail_me.graphql"
import { ConversationFragmentContainer as Conversation } from "Apps/Conversation/Components/Conversation"
import { SystemContext } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { userIsAdmin } from "Utils/user"

interface DetailRouteProps {
  me: Detail_me
  conversationID: string
}

export const DetailRoute = (props: DetailRouteProps) => {
  const { me } = props
  const { user } = useContext(SystemContext)
  const isAdmin = userIsAdmin(user)
  if (isAdmin) {
    return (
      <BorderBox>
        <Flex flexDirection="column">
          <Conversation conversation={me.conversation} />
        </Flex>
      </BorderBox>
    )
  } else {
    // not an admin
    return <ErrorPage code={404} />
  }
}

export const DetailFragmentContainer = createFragmentContainer(DetailRoute, {
  me: graphql`
    fragment Detail_me on Me
      @argumentDefinitions(conversationID: { type: "String!" }) {
      conversation(id: $conversationID) {
        ...Conversation_conversation
      }
    }
  `,
})
