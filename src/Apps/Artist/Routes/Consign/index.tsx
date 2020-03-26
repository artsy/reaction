import { Box } from "@artsy/palette"
import { Match, Router } from "found"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { Consign_artist } from "__generated__/Consign_artist.graphql"
import { Consign_artworksByInternalID } from "__generated__/Consign_artworksByInternalID.graphql"

import { ArtistConsignFAQ } from "./Components/ArtistConsignFAQ"
import { ArtistConsignHeader } from "./Components/ArtistConsignHeader"
import { ArtistConsignHowtoSell } from "./Components/ArtistConsignHowToSell"
import { ArtistConsignMarketTrends } from "./Components/ArtistConsignMarketTrends"
import { ArtistConsignMeta } from "./Components/ArtistConsignMeta"
import { ArtistConsignPageViews } from "./Components/ArtistConsignPageViews"
import { ArtistConsignRecentlySold } from "./Components/ArtistConsignRecentlySold"
import { ArtistConsignSellArt } from "./Components/ArtistConsignSellArt"

import { track } from "Artsy"
import { ArtistConsignment } from "./Utils/getConsignmentData"

interface ConsignRouteProps {
  artist: Consign_artist
  artworksByInternalID: Consign_artworksByInternalID
  artistConsignment: ArtistConsignment
  match: Match
  router: Router
}

export const ConsignRoute: React.FC<ConsignRouteProps> = props => {
  const { artist, artistConsignment, artworksByInternalID, match } = props
  const imageURL = artworksByInternalID[0]?.image.imageURL

  return (
    <Box>
      {/*
        Header tags
      */}
      <ArtistConsignMeta
        artistName={artist.name}
        artistHref={artist.href}
        imageURL={imageURL}
      />

      {/*
        Content
      */}
      <ArtistConsignHeader artistName={artist.name} />
      <ArtistConsignRecentlySold
        artistConsignment={artistConsignment}
        artistName={artist.name}
        artworksByInternalID={artworksByInternalID}
      />
      <ArtistConsignPageViews
        artistConsignment={artistConsignment}
        artistName={artist.name}
      />
      <ArtistConsignMarketTrends
        artistConsignment={artistConsignment}
        artistID={match.params.artistID}
      />
      <ArtistConsignHowtoSell />
      <ArtistConsignFAQ />
      <ArtistConsignSellArt />
    </Box>
  )
}

const TrackedConsignRoute = track()((props: ConsignRouteProps) => {
  return <ConsignRoute {...props} />
})

export const ConsignRouteFragmentContainer = createFragmentContainer(
  TrackedConsignRoute,
  {
    artist: graphql`
      fragment Consign_artist on Artist {
        name
        href
      }
    `,
    artworksByInternalID: graphql`
      fragment Consign_artworksByInternalID on Artwork @relay(plural: true) {
        internalID
        image {
          aspectRatio
          imageURL
        }
        ...FillwidthItem_artwork
      }
    `,
  }
)

// Export default for bundle splitting at route
export default ConsignRouteFragmentContainer
