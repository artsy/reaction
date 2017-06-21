import { storiesOf } from "@storybook/react"
import * as React from "react"

import ModalHeader from "../modal_header"
import Title from "../title"

storiesOf("ModalHeader", ModalHeader)
  .add("Simple login header", () => (
    <ModalHeader>
      <Title>Welcome back, please log in to your account.</Title>
    </ModalHeader>
  ))
