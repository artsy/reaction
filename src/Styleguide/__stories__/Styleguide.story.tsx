import { storiesOf } from "@storybook/react"
import React from "react"
import { Artwork, Artist } from "../"
import { Theme } from "../theme"
import { withInfo } from "@storybook/addon-info"
import { Display, Sans, Serif } from "../Elements/Typography"
import { Tabs } from "../Components/Tabs"

const stories = storiesOf("Styleguide", module)

stories
  .add(
    "Sans",
    withInfo(`

    https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221

  `)(() => {
      return (
        <Theme>
          <div>
            <Sans size="1">Donald Judd</Sans>
            <Sans size="2">Donald Judd</Sans>
            <Sans size="3">Donald Judd</Sans>
            <Sans size="3t">Donald Judd</Sans>
            <Sans size="4">Donald Judd</Sans>
            <Sans size="4t">Donald Judd</Sans>
            <Sans size="5">Donald Judd</Sans>
            <Sans size="5t">Donald Judd</Sans>
            <Sans size="6">Donald Judd</Sans>
            <Sans size="8">Donald Judd</Sans>
            <Sans size="10">Donald Judd</Sans>
            <Sans size="12">Donald Judd</Sans>
            <Sans size="14">Donald Judd</Sans>
            <Sans size="16">Donald Judd</Sans>
          </div>
        </Theme>
      )
    })
  )
  .add(
    "Serif",
    withInfo(`

    https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221

  `)(() => {
      return (
        <Theme>
          <div>
            <Serif size="1">Donald Judd</Serif>
            <Serif size="2">Donald Judd</Serif>
            <Serif size="3">Donald Judd</Serif>
            <Serif size="3t">Donald Judd</Serif>
            <Serif size="4">Donald Judd</Serif>
            <Serif size="4t">Donald Judd</Serif>
            <Serif size="5">Donald Judd</Serif>
            <Serif size="5t">Donald Judd</Serif>
            <Serif size="6">Donald Judd</Serif>
            <Serif size="8">Donald Judd</Serif>
            <Serif size="10">Donald Judd</Serif>
            <Serif size="12">Donald Judd</Serif>
          </div>
        </Theme>
      )
    })
  )
  .add(
    "Display",
    withInfo(`

    https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221

  `)(() => {
      return (
        <Theme>
          <div>
            <Display size="2">Donald Judd</Display>
            <Display size="3t">Donald Judd</Display>
            <Display size="4t">Donald Judd</Display>
            <Display size="5t">Donald Judd</Display>
            <Display size="6">Donald Judd</Display>
          </div>
        </Theme>
      )
    })
  )
  .add(
    "Tabs",
    withInfo(`

    Tabs

  `)(() => {
      return (
        <Theme>
          <Tabs labels={["Hello", "World"]} />
        </Theme>
      )
    })
  )

stories
  .add("Static Artwork Page", () => {
    return (
      <Theme>
        <Artwork />
      </Theme>
    )
  })
  .add("Static Artist Page", () => {
    return (
      <Theme>
        <Artist />
      </Theme>
    )
  })
