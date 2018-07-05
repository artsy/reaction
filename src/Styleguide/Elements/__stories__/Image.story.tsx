import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { BorderBox } from "../Box"
import { Image, ResponsiveImage } from "../Image"

storiesOf("Styleguide/Elements", module).add("Image", () => {
  return (
    <React.Fragment>
      <Section title="Default Image">
        <Image src="http://via.placeholder.com/110x110?text=+" />
      </Section>
      <Section title="Custom size">
        <Image
          width="300px"
          height="200px"
          src="http://via.placeholder.com/300x200?text=+"
        />
      </Section>
      <Section title="Responsive Image">
        <BorderBox maxWidth="400px" width="100%" height="auto" p={0}>
          <ResponsiveImage src="http://via.placeholder.com/400x250?text=+" />
        </BorderBox>
      </Section>
    </React.Fragment>
  )
})
