import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { ArtworkDetails, ArtworkDetailsQueryRenderer } from "../ArtworkDetails"

import { AllAdditionalDetailsPresent } from "Apps/__tests__/Fixtures/Artworks"
import { RelayStubProvider } from "DevTools/RelayStubProvider"

storiesOf("Styleguide/Artwork", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("ArtworkDetails", () => {
    return (
      <React.Fragment>
        <Section title="Fixture artwork with every additional details available">
          <ArtworkDetails artwork={AllAdditionalDetailsPresent as any} />
        </Section>
        <Section title="ArtworkDetailsQueryRenderer containing Provanance tab">
          <ArtworkDetailsQueryRenderer artworkID="charles-negre-model-reclining-in-the-artists-studio" />
        </Section>
        <Section title="ArtworkDetailsQueryRenderer for andy-warhol-s-and-h-green-stamps-feldman-and-schellman-11-dot-9">
          <ArtworkDetailsQueryRenderer artworkID="andy-warhol-s-and-h-green-stamps-feldman-and-schellman-11-dot-9" />
        </Section>
        <Section title="ArtworkDetailsQueryRenderer for one tab">
          <ArtworkDetailsQueryRenderer artworkID="ai-weiwei-arch" />
        </Section>
        <Section title="ArtworkDetailsQueryRenderer for 2 tabs">
          <ArtworkDetailsQueryRenderer artworkID="richard-prince-untitled-fashion" />
        </Section>
        <Section title="ArtworkDetailsQueryRenderer for 3 tabs">
          <ArtworkDetailsQueryRenderer artworkID="5af314b99c18db38cb942df1" />
        </Section>
        <Section title="Info from partner only">
          <ArtworkDetailsQueryRenderer artworkID="eduardo-arroyo-card-game-slash-poker-brelan" />
        </Section>
        <Section title="Info from partner plus one additional box">
          <ArtworkDetailsQueryRenderer artworkID="invader-rubik-ohh-dot-dot-dot-alright-dot-dot-dot-1" />
        </Section>
        <Section title="Info from partner plus other 2 types of data">
          <ArtworkDetailsQueryRenderer artworkID="allan-bruce-zee-lily-pads-balboa-park-san-diego-california-two-photographs-1" />
        </Section>
        <Section title="Articles tab only with news article">
          <ArtworkDetailsQueryRenderer artworkID="kevin-beasley-untitled-stub" />
        </Section>
      </React.Fragment>
    )
  })
