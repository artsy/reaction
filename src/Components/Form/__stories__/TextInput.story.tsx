import { storiesOf } from "@storybook/react"
import React from "react"

import TextInput, { InitiallyFocusedTextInput } from "../TextInput"

storiesOf("Form/TextInput", module)
  .add("TextInput", () => <TextInput />)
  .add("TextInput with error", () => <TextInput isError />)
  .add("InitiallyFocusedTextInput", () => <InitiallyFocusedTextInput />)
