import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ArtworkDetails, ArtworkDetailsQueryRenderer } from "../ArtworkDetails"

import { WithBothAboutConditionsAndAdditionalInfo } from "Apps/__test__/Fixtures/Artworks"
import { RelayStubProvider } from "Utils/RelayStubProvider"

storiesOf("Styleguide/Artwork/", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("ArtworkDetails", () => {
    return (
      <React.Fragment>
        <Section title="Artwork with every additional details available">
          <ArtworkDetails
            artwork={WithBothAboutConditionsAndAdditionalInfo as any}
          />
        </Section>
        <Section title="ArtworkDetailsQueryRenderer for andy-warhol-s-and-h-green-stamps-feldman-and-schellman-11-dot-9">
          <ArtworkDetailsQueryRenderer artworkID="andy-warhol-s-and-h-green-stamps-feldman-and-schellman-11-dot-9" />
        </Section>
        <Section title="ArtworkDetailsQueryRenderer for one tab">
          <ArtworkDetailsQueryRenderer artworkID="ai-weiwei-arch" />
        </Section>
        <Section title="ArtworkDetailsQueryRenderer for 2 tabs">
          <ArtworkDetailsQueryRenderer artworkID="daniel-mendel-black-untitled" />
        </Section>
        <Section title="ArtworkDetailsQueryRenderer for 3 tabs">
          <ArtworkDetailsQueryRenderer artworkID="eugene-delacroix-lion-hunt" />
        </Section>
      </React.Fragment>
    )
  })
