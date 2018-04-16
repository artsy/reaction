import { storiesOf } from "@storybook/react"
import React from "react"

import TextInput, {
  InitiallyFocusedTextInput,
  TextInputWithInlineMessage,
} from "../TextInput"

storiesOf("Form/TextInput", module)
  .add("TextInput", () => <TextInput />)
  .add("TextInput with error", () => <TextInput isError />)
  .add("InitiallyFocusedTextInput", () => <InitiallyFocusedTextInput />)
  .add("TextInputWithInlineMessage", () => (
    <TextInputWithInlineMessage message="Hello World" flexBasis="100" />
  ))
