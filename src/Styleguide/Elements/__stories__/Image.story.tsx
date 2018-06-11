import React from "react"
import { Section } from "../../Utils/Section"
import { Image } from "../Image"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Elements", module).add("Image", () => {
  return (
    <React.Fragment>
      <Section title="Default Image">
        <Image src="https://picsum.photos/110/110/?random" />
      </Section>
      <Section title="Custom size">
        <Image
          width="300px"
          height="200px"
          src="https://picsum.photos/300/300/?random"
        />
      </Section>
    </React.Fragment>
  )
})
