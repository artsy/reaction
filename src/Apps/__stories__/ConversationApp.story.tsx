import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as conversationRoute } from "../Conversation/routes"

storiesOf("Apps/Conversation", module)
  .add("Default", () => {
    return (
      <MockRouter
        routes={conversationRoute}
        initialRoute="/user/conversations"
      />
    )
  })
  .add("Detail", () => {
    return (
      <MockRouter
        routes={conversationRoute}
        initialRoute="/user/conversations/840"
      />
    )
  })
