import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { conversationRoutes } from "../Conversation/routes"
import { MockedConversation } from "Apps/__tests__/Fixtures/Conversation"

const mock = {
  me: {
    name: "tester",
    conversationsConnection: {
      edges: [
        {
          to: {
            name: "Artifical Gallery",
          },
        },
        {
          to: {
            name: "Fake it till you make it Gallery",
          },
        },
      ],
    },
  },
}

storiesOf("Apps/Conversation", module)
  .add("Conversations list", () => {
    return (
      <MockRouter
        routes={conversationRoutes}
        initialRoute="/user/conversations"
        mockData={mock}
        context={{
          user: {
            lab_features: ["User Conversations View"],
          },
        }}
      />
    )
  })
  .add("Single Conversation", () => {
    return (
      <MockRouter
        routes={conversationRoutes}
        initialRoute="/user/conversations/123"
        context={{
          user: {
            lab_features: ["User Conversations View"],
          },
        }}
        mockData={MockedConversation}
      />
    )
  })
