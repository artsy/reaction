import { routes as auctionRoutes } from "Apps/Auction/routes"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

/**
 * These stories need updating (in their initialRoute props) each week as they are tied to staging data.
 * Required: /auction/:auctionId/bid2/:artworkid
 * The `bid` query param, if present, must match the cents in an available increment on the artwork.
 */

const auctionId = "phillips-editions-and-works-on-paper-5"
const artworkId = "jean-dubuffet-lenfle-chic-i-the-inflated-snob-i"
const confirmBidRoute = `/auction/${auctionId}/bid2/${artworkId}`

storiesOf("Apps/Auction/Routes/Confirm Bid", module)
  .add("Plain", () => {
    return <MockRouter routes={auctionRoutes} initialRoute={confirmBidRoute} />
  })
  .add("Selected bid in query string", () => {
    return (
      <MockRouter
        routes={auctionRoutes}
        initialRoute={confirmBidRoute + "?bid=110000000000"}
      />
    )
  })
