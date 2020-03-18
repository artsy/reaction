import { Box } from "@artsy/palette"
import { Match, Router } from "found"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { Consign_artist } from "__generated__/Consign_artist.graphql"
import { routes_ArtistConsignQueryResponse } from "__generated__/routes_ArtistConsignQuery.graphql"

import { useSystemContext } from "Artsy"
import { userIsAdmin } from "Utils/user"
import { ArtistConsignFAQ } from "./Components/ArtistConsignFAQ"
import { ArtistConsignHeader } from "./Components/ArtistConsignHeader"
import { ArtistConsignHowtoSell } from "./Components/ArtistConsignHowToSell"
import { ArtistConsignMarketTrends } from "./Components/ArtistConsignMarketTrends"
import { ArtistConsignPageViews } from "./Components/ArtistConsignPageViews"
import { ArtistConsignRecentlySold } from "./Components/ArtistConsignRecentlySold"
import { ArtistConsignSellArt } from "./Components/ArtistConsignSellArt"

import { getConsignmentData } from "./Utils/getConsignmentData"

interface ConsignRouteProps {
  artist: Consign_artist
  artworksByInternalID: routes_ArtistConsignQueryResponse["artworksByInternalID"]
  match: Match
  router: Router
}

export const ConsignRoute: React.FC<ConsignRouteProps> = props => {
  const { artist } = props
  const { user } = useSystemContext()
  const pathname = props.match.location.pathname.replace("/consign", "")
  const artistConsignment = getConsignmentData(pathname)

  // Redirect back to artist overview if artist not found within hand-picked data
  // FIXME: Move this check to the router level when we're ready launch
  useEffect(() => {
    // FIXME: Ungate admin-only feature when ready to launch
    const isAuthorizedToView = Boolean(userIsAdmin(user) && artistConsignment)

    if (!isAuthorizedToView) {
      props.router.replace(pathname)
    }
  }, [])

  return (
    <Box>
      <ArtistConsignHeader artistName={artist.name} />
      <ArtistConsignRecentlySold
        artistConsignment={artistConsignment}
        artistName={artist.name}
        artworksByInternalID={props.artworksByInternalID}
      />
      <ArtistConsignPageViews
        artistConsignment={artistConsignment}
        artistName={artist.name}
      />
      <ArtistConsignMarketTrends artistConsignment={artistConsignment} />
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
        name
      }
    `,
  }
)

// Export default for bundle splitting at route
export default ConsignRouteFragmentContainer
