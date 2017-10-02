import { storiesOf } from "@storybook/react"
import * as React from "react"

import EmailSignup from "../email_signup"
import { Authors, Embeds } from "../fixtures/components"
import AuthorInfo from "../sections/authors"
import Embed from "../sections/embed"

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
