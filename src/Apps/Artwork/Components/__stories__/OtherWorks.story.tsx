import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { OtherWorksByArtistQueryRenderer as OtherWorksByArtist } from "../OtherWorks/OtherWorksByArtist"
import { OtherWorksFromAuctionQueryRenderer as OtherWorksFromAuction } from "../OtherWorks/OtherWorksFromAuction"
import { OtherWorksFromFairQueryRenderer as OtherWorksFromFair } from "../OtherWorks/OtherWorksFromFair"
import { OtherWorksFromGalleryQueryRenderer as OtherWorksFromGallery } from "../OtherWorks/OtherWorksFromGallery"
// import { RelatedWorksQueryRenderer as RelatedWorks } from "../OtherWorks/RelatedWorks"

storiesOf("Styleguide/Artwork/OtherWorks", module)
  .add("By artist", () => {
    return (
      <>
        <Section title="Other works by artist">
          <OtherWorksByArtist artworkID="pablo-picasso-femme-assise-dans-un-fauteuil-tresse" />
        </Section>
        <Section title="Other works from auction">
          <OtherWorksFromAuction artworkID="pablo-picasso-femme-assise-dans-un-fauteuil-tresse" />
        </Section>
      </>
    )
  })
  .add("From auction", () => {
    return (
      <>
        <Section title="Other works from auction">
          <OtherWorksFromAuction artworkID="pablo-picasso-femme-assise-dans-un-fauteuil-tresse" />
        </Section>
      </>
    )
  })
  .add("From fair", () => {
    return (
      <>
        <Section title="Other works from fair">
          <OtherWorksFromFair artworkID="pablo-picasso-femme-assise-dans-un-fauteuil-tresse" />
        </Section>
      </>
    )
  })
  .add("From gallery", () => {
    return (
      <>
        <Section title="Other works from gallery">
          <OtherWorksFromGallery artworkID="pablo-picasso-femme-assise-dans-un-fauteuil-tresse" />
        </Section>
      </>
    )
  })
  .add("Related works", () => {
    return (
      <>
        <Section title="Related works">
          <OtherWorksFromAuction artworkID="pablo-picasso-femme-assise-dans-un-fauteuil-tresse" />
        </Section>
      </>
    )
  })
