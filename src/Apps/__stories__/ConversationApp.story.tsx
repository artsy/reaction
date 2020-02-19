import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { conversationRoutes } from "../Conversation/routes"

storiesOf("Apps/Conversation", module)
  .add("Default", () => {
    return (
      <MockRouter
        routes={conversationRoutes}
        initialRoute="/user/conversations"
      />
    )
  })
  .add("Detail", () => {
    return (
      <MockRouter
        routes={conversationRoutes}
        initialRoute="/user/conversations/842"
      />
    )
  })
