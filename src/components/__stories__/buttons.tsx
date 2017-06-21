import { storiesOf } from "@storybook/react"
import * as React from "react"

import Button, { ButtonState } from "../buttons/default"
import FacebookButton from "../buttons/facebook"
import GhostButton from "../buttons/ghost"
import InvertedButton from "../buttons/inverted"
import TwitterButton from "../buttons/twitter"

storiesOf("Buttons", Button)
  .add("Default Button", () => {
    return (
      <div>
        <div>
          <Button>Button</Button>
          <Button disabled>Button</Button>
        </div>
        <div>
          <Button state={ButtonState.Success}>Button</Button>
          <Button state={ButtonState.Success} disabled>Button</Button>
        </div>
        <div>
          <Button state={ButtonState.Failure}>Button</Button>
          <Button state={ButtonState.Failure} disabled>Button</Button>
        </div>
      </div>
    )
  })
  .add("Inverted Button", () => {
    return (
      <div>
        <div>
          <InvertedButton>Inverted Button</InvertedButton>
          <InvertedButton disabled>Button</InvertedButton>
        </div>
      </div>
    )
  })
  .add("Ghost Button", () => {
    return (
      <div>
        <div>
          <GhostButton>Ghost Button</GhostButton>
          <GhostButton disabled>Button</GhostButton>
        </div>
      </div>
    )
  })
  .add("Block Button", () => {
    return (
      <Button block>Block Button</Button>
    )
  })
  .add("Facebook Button", () => {
    return (
      <FacebookButton />
    )
  })
  .add("Twitter Button", () => {
    return (
      <TwitterButton />
    )
  })
