import { Box } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtistConsignFAQ } from "./Components/ArtistConsignFAQ"
import { ArtistConsignHeader } from "./Components/ArtistConsignHeader"
import { ArtistConsignHowtoSell } from "./Components/ArtistConsignHowToSell"
import { ArtistConsignMarketTrends } from "./Components/ArtistConsignMarketTrends"
import { ArtistConsignPageViews } from "./Components/ArtistConsignPageViews"
import { ArtistConsignRecentlySold } from "./Components/ArtistConsignRecentlySold"
import { ArtistConsignSellArt } from "./Components/ArtistConsignSellArt"

const ConsignRoute = props => {
  return (
    <Box>
      <ArtistConsignHeader />
      <ArtistConsignRecentlySold />
      <ArtistConsignPageViews />
      <ArtistConsignMarketTrends />
      <ArtistConsignHowtoSell />
      <ArtistConsignFAQ />
      <ArtistConsignSellArt />
    </Box>
  )
}

export const ConsignRouteFragmentContainer = createFragmentContainer(
  ConsignRoute,
  {
    artist: graphql`
      fragment Consign_artist on Artist {
        id
      }
    `,
  }
)

// Export default for bundle splitting at route
export default ConsignRouteFragmentContainer
