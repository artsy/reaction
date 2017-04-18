import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"
import * as Relay from "react-relay"

import SaveButton from "../save"

import * as fonts from "../../assets/fonts"

storiesOf("Save Button", SaveButton)
  .add("Save Button", () => {
    return (
      <div>
        <SaveButton />
      </div>
    )
  })