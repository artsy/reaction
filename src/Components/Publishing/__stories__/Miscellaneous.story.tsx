import { storiesOf } from "@storybook/react"
import * as React from "react"

import EmailSignup from "../EmailSignup"
import { Authors, Embeds } from "../Fixtures/Components"
import AuthorInfo from "../Sections/Authors"
import Embed from "../Sections/Embed"

storiesOf("Publishing/Miscellaneous", module)
  .add("Embed", () => {
    return (
      <div style={{ width: "100%" }}>
        <Embed section={Embeds[0]} />
      </div>
    )
  })
  .add("Author Info", () => {
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <AuthorInfo authors={Authors} />
      </div>
    )
  })
  .add("Email Signup", () => {
    return <EmailSignup signupUrl="#" />
  })
