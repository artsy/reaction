import { storiesOf } from "@kadira/storybook"
import * as React from "react"

import Spinner from "../spinner"

storiesOf("Spinner", Spinner)
  .add("Default Spinner", () => {
    return (
      <div>
        <Spinner />
      </div>
    )
  })
  .add("Big spinner", () => {
    return (
      <div>
        <Spinner height={30} width={100} />
      </div>
    )
  })
