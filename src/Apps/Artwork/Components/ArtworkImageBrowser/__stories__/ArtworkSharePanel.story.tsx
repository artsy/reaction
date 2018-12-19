import { Flex } from "@artsy/palette"
import { ArtworkSharePanelFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkImageBrowser/ArtworkSharePanel.fixture"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils"
import { ArtworkSharePanel } from "../ArtworkSharePanel"

storiesOf("Apps/Artwork Page/Components/ArtworkImageBrowser", module).add(
  "ArtworkSharePanel",
  () => (
    <>
      <Section title="ArtworkActions">
        <Flex justifyContent="center" alignItems="flex-end" height="500px">
          <ArtworkSharePanel
            artwork={ArtworkSharePanelFixture.artwork as any}
            onClose={() => false}
          />
        </Flex>
      </Section>
    </>
  )
)
