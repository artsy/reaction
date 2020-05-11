import { ConversationApp_me } from "__generated__/ConversationApp_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { ConversationsFragmentContainer as Conversations } from "Apps/Conversation/Components/Conversations"
import { findCurrentRoute } from "Artsy/Router/Utils/findCurrentRoute"
import { Match, Router } from "found"
import React, { useEffect, useState, useContext } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { Flex, Spinner, breakpoints } from "@artsy/palette"
import { debounce } from "lodash"
import { SystemContext } from "Artsy"
import { userHasLabFeature } from "Utils/user"
import { ErrorPage } from "Components/ErrorPage"
import { Media } from "Utils/Responsive"
import { FullHeader, MobileInboxHeader } from "./Components/InboxHeaders"

interface ConversationAppProps {
  me: ConversationApp_me
  match: Match
  router: Router
}

const getViewWidth = () => {
  return Math.max(
    window.document.documentElement.clientWidth,
    window.innerWidth || 0
  )
}

export const ConversationApp: React.FC<ConversationAppProps> = props => {
  const { me, router } = props
  const { user } = useContext(SystemContext)
  const isEnabled = userHasLabFeature(user, "User Conversations View")
  const [width, setWidth] = useState(0)
  const route = findCurrentRoute(props.match)
  let maxWidth

  const conversation = me.conversationsConnection.edges[0]?.node

  useEffect(() => {
    setWidth(getViewWidth())
    const listenForResize = debounce(() => {
      setWidth(getViewWidth())
    })
    window.addEventListener("resize", listenForResize)
    return () => window.removeEventListener("resize", listenForResize)
  }, [])

  useEffect(() => {
    if (isEnabled && width > breakpoints.xs && conversation && router) {
      router.replace(`/user/conversations/${conversation.internalID}`)
    }
  }, [isEnabled, router, conversation, width])

  if (!isEnabled) {
    return <ErrorPage code={404} />
  }

  if (route.displayFullPage) {
    maxWidth = "100%"
  }
  return (
    <AppContainer maxWidth={maxWidth}>
      <Title>Conversations | Artsy</Title>
      <Media at="xs">
        <MobileInboxHeader />
      </Media>
      <Media greaterThan="xs">
        <FullHeader partnerName={conversation.to.name} />
      </Media>
      <Conversations me={me} />
      <Flex
        display={["none", "flex"]}
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    </AppContainer>
  )
}

export const ConversationAppFragmentContainer = createFragmentContainer(
  ConversationApp,
  {
    me: graphql`
      fragment ConversationApp_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        conversationsConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          edges {
            node {
              internalID
              to {
                name
              }
            }
          }
        }
        ...Conversations_me
      }
    `,
  }
)

export default ConversationAppFragmentContainer
