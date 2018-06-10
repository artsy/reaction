import React from "react"
import { Section } from "../../Utils/Section"
import { Avatar } from "../Avatar"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Elements", module).add("Avatar", () => {
  return (
    <React.Fragment>
      <Section title="Default Avatar">
        <Avatar src="https://picsum.photos/110/110/?random" />
      </Section>
      <Section title="Small Avatar">
        <Avatar size="small" src="https://picsum.photos/110/110/?random" />
      </Section>
    </React.Fragment>
  )
})
