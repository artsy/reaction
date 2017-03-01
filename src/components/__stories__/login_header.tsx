import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"

import ModalHeader from "../login_header"
import Title from "../title"

storiesOf("ModalHeader", ModalHeader)
  .add("Simple login header", () => (
    <ModalHeader> 
      <Title>Welcome back, please log in to your account.</Title>
    </ModalHeader>
  ))
