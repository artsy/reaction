import React from "react"
import Events from "../Utils/Events"
import { configure, addParameters, addDecorator } from "@storybook/react"
import { createMediaStyle } from "Utils/Responsive"
import { Theme } from "@artsy/palette"

const req = require.context("../", true, /\.story\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => {
    return req(filename)
  })
}

// Add RRM styles to Storybooks head
const rrmStyle = document.createElement("style")
rrmStyle.innerHTML = createMediaStyle()
document.head.appendChild(rrmStyle)

addParameters({
  inline: true,
  brandTitle: "Reaction",
  showAddonPanel: false,
  sortStoriesByKind: true,
})

addDecorator(storyFn => <Theme>{storyFn()}</Theme>)

setTimeout(() => {
  configure(loadStories, module)
})

Events.onEvent(data => {
  console.log("Tracked event", data)
})

if (!window.sd || !(typeof window.sd === "object")) {
  window.sd = {}
}
