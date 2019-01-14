import { Flex } from "@artsy/palette"
import { ArtworkActionsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkActions.fixture"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { cloneDeep } from "lodash"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { ArtworkActions } from "../ArtworkActions"

const ArtworkActionsAuctionFixture = cloneDeep(ArtworkActionsFixture)
ArtworkActionsAuctionFixture.artwork.sale.is_closed = false

storiesOf("Apps/Artwork Page/Components/ArtworkImageBrowser", module).add(
  "ArtworkActions",
  () => (
    <>
      <Section title="Default Share">
        <Flex justifyContent="center" alignItems="flex-end" height="200px">
          <RelayStubProvider>
            <ArtworkActions {...ArtworkActionsFixture as any} />
          </RelayStubProvider>
        </Flex>
      </Section>
      <Section title="Auction Share">
        <Flex justifyContent="center" alignItems="flex-end" height="200px">
          <RelayStubProvider>
            <ArtworkActions {...ArtworkActionsAuctionFixture as any} />
          </RelayStubProvider>
        </Flex>
      </Section>
    </>
  )
)
