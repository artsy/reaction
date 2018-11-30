import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { OtherWorksQueryRenderer as OtherWorks } from "../OtherWorks"

storiesOf("Styleguide/Artwork/OtherWorks", module)
  .add("Auctions", () => {
    return (
      <>
        <Section title="Open Auction">
          <OtherWorks artworkID="david-hockney-diptychon-3" />
        </Section>
        <Section title="Closed Auction">
          <OtherWorks artworkID="patrick-hughes-poppy-1" />
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
  .add("Fair", () => {
    return (
      <Section title="Fair">
        <OtherWorks artworkID="lucio-fontana-concetto-spaziale-attese-139" />
      </Section>
    )
  })
  .add("Partner Show (Gallery)", () => {
    return (
      <Section title="Gallery">
        <OtherWorks artworkID="david-hockney-early-morning-4" />
      </Section>
    )
  })
