// @ts-check

import React from "react"
import { storiesOf as _storiesOf } from "@storybook/react"
import { Boot } from "../Router/Boot"
import { AppState } from "../Router/state"

/**
 * @type {any}
 */
const system = {}

export function storiesOf(desc, mod) {
  return _storiesOf(desc, mod).addDecorator(storyFn => {
    return (
      <Boot
        system={system}
        initialState={[
          new AppState({
            system,
            mediator: x => x,
          }),
        ]}
      >
        {storyFn()}
      </Boot>
    )
  })
}
