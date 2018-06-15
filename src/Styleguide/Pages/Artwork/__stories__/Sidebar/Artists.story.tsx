import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Artists } from "../../Sidebar/Artists"

const SingleFollowedArtist = [
  {
    __id: "francesca-dimattio",
    id: "francesca-dimattio",
    name: "Francesca DiMattio",
    is_followed: true,
    href: "https://www.artsy.net/artist/francesca-dimattio",
  },
]

const SingleNonFollowedArtist = [
  {
    __id: "francesca-dimattio",
    id: "francesca-dimattio",
    name: "Francesca DiMattio",
    is_followed: false,
  },
]

const MultipleArtists = [
  {
    __id: "francesca-dimattio",
    id: "francesca-dimattio",
    name: "Francesca DiMattio",
    is_followed: false,
  },
  {
    __id: "sol-lewitt-piramidi-c",
    id: "sol-lewitt-piramidi-c",
    name: "Sol LeWitt",
    href: "https://www.artsy.net/artwork/sol-lewitt-piramidi-c",
    is_followed: false,
  },
]

storiesOf("Styleguide/Artwork/Sidebar", module).add("Artists", () => {
  return (
    <React.Fragment>
      <Section title="Single Followed Artist">
        <Artists artists={SingleFollowedArtist} />
      </Section>
      <Section title="Single Not Followed Artist">
        <Artists artists={SingleNonFollowedArtist} />
      </Section>
      <Section title="Multipe Artists">
        <Artists artists={MultipleArtists} />
      </Section>
    </React.Fragment>
  )
})
