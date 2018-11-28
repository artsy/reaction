import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { OtherWorksQueryRenderer as OtherWorks } from "../OtherWorks"

storiesOf("Styleguide/Artwork/OtherWorks", module)
  .add("Auctions", () => {
    return (
      <>
        <Section title="Open Auction">
          <OtherWorks artworkID="yavuz-tanyeli-self-portrait" />
        </Section>
        <Section title="Closed Auction">
          <OtherWorks artworkID="william-wegman-tall" />
        </Section>
      </>
    )
  })
  .add("Artist", () => {
    return (
      <Section title="Artist">
        <OtherWorks artworkID="on-kawara-9-jan-1973" />
      </Section>
    )
  })
  .add("Gallery", () => {
    return (
      <Section title="Gallery">
        <OtherWorks artworkID="on-kawara-i-went-1" />
      </Section>
    )
  })
  .add("Partner Show", () => {
    return (
      <Section title="Partner Show">
        <OtherWorks artworkID="jacky-tsai-kissers-1" />
      </Section>
    )
  })
