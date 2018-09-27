import { Box } from "@artsy/palette"
import { bio, biography_blurb } from "Apps/__test__/Fixtures/ArtistBio"
import { artistResponse } from "Apps/__test__/Fixtures/MarketInsights"
import { exhibitions } from "Apps/__test__/Fixtures/SelectedExhibitions"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { RelayStubProvider } from "Utils/RelayStubProvider"
import { ArtistInfo } from "../ArtistInfo"

storiesOf("Styleguide/Artwork", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("ArtistInfo", () => {
    return (
      <React.Fragment>
        <Section title="Artist Info">
          <Box width="100%">
            <ArtistInfo
              name="Francesca DiMattio"
              artist={artistResponse as any}
              exhibitions={exhibitions as any}
              bio={bio}
              credit={biography_blurb.credit as any}
            />
          </Box>
        </Section>
      </React.Fragment>
    )
  })
