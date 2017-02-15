import * as React from "react"
import * as Relay from "react-relay"
import { storiesOf, action } from "@kadira/storybook"

import Counter from "../counter"

storiesOf("Counter", Counter)
  .add("it works", () => (
    <Counter counter={42} things={"artworks"} />
  ))
