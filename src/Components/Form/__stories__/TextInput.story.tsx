import { storiesOf } from "@storybook/react"
import React from "react"

import TextInput from "../TextInput"

storiesOf("Form/TextInput", module)
  .add("TextInput", () => <TextInput />)
  .add("TextInput with error", () => <TextInput isError />)
