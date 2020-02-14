import { BorderBox, Flex } from "@artsy/palette"
import { Detail_me } from "__generated__/Detail_me.graphql"
import { MessagesFragmentContainer as Messages } from "Apps/Conversation/Components/Messages"
import { SystemContext } from "Artsy"
import { ErrorPage } from "Components/ErrorPage"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { userIsAdmin } from "Utils/user"

interface DetailRouteProps {
  me: Detail_me
}

export const DetailRoute = (props: DetailRouteProps) => {
  const { me } = props
  const { user } = useContext(SystemContext)
  const isAdmin = userIsAdmin(user)
  if (isAdmin) {
    return (
      <BorderBox>
        <Flex flexDirection="column">
          <Messages
            messages={me.conversation.messages}
            initialMessage={me.conversation.initialMessage}
          />
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
    fragment Detail_me on Me {
      conversation(id: "840") {
        internalID
        from {
          name
        }
        initialMessage
        messages(first: 10) {
          ...Messages_messages
        }
      }
    }
  `,
})
