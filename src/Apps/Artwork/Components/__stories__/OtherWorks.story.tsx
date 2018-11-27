import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { OtherWorksQueryRenderer as OtherWorks } from "../OtherWorks"

storiesOf("Styleguide/Artwork/OtherWorks", module).add("<OtherWorks />", () => {
  return (
    <>
      {/*
      <Section title="Auction">
        <OtherWorks artworkID="achille-perilli-phantom" />
      </Section>
      <Section title="Gallery">
        <OtherWorks artworkID="on-kawara-i-went-1" />
      </Section>
      <Section title="Partner Show">
        <OtherWorks artworkID="jacky-tsai-kissers-1" />
      </Section>
    */}
      <Section title="Artist">
        <OtherWorks artworkID="on-kawara-9-jan-1973" />
      </Section>
    </>
  )
})
