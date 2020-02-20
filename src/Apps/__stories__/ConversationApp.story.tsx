import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { conversationRoutes } from "../Conversation/routes"

storiesOf("Apps/Conversation", module).add("My Conversation", () => {
  return (
    <MockRouter
      routes={conversationRoutes}
      initialRoute="/user/conversations"
    />
  )
})
