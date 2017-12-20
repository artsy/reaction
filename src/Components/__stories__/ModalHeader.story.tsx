import { storiesOf } from "@storybook/react"
import React from "react"

import ModalHeader from "../ModalHeader"
import Title from "../Title"

storiesOf("Components/Modal/Header", module).add("Simple login header", () =>
  <ModalHeader>
    <Title>Welcome back, please log in to your account.</Title>
  </ModalHeader>
)
