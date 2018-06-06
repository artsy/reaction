import { storiesOf } from "@storybook/react"
import React, { Component } from "react"
import { Styleguide } from "../"
import { graphql } from "react-relay"

const stories = storiesOf("Styleguide", module)

stories
  .add("Static Artwork Page", () => {
    return <Styleguide />
  })
  .add("Static Artist Page", () => {
    return <Styleguide />
  })
