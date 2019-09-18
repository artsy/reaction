import { Spacer } from "@artsy/palette"
import { Shows_viewer } from "__generated__/Shows_viewer.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistShowsRefetchContainer as Shows } from "./ArtistShows"

export interface ArtistShowsProps {
  viewer: Shows_viewer
}
export const ShowsRoute: SFC<ArtistShowsProps> = props => {
  const { viewer } = props

  return (
    <>
      <Spacer mb={-1} />

      <Shows
        sort="end_at_asc"
        status="running"
        artist={viewer.artist_currentShows}
        scrollTo="#jumpto-ArtistHeader"
        heading="Currently on view"
        my={4}
      />

      <span id="jumpto-Shows-Upcoming" />

      <Shows
        sort="start_at_asc"
        status="upcoming"
        artist={viewer.artist_upcomingShows}
        scrollTo="#jumpto-Shows-Upcoming"
        heading="Upcoming"
        my={4}
      />

      <span id="jumpto-Shows-Past" />

      <Shows
        sort="end_at_desc"
        status="closed"
        artist={viewer.artist_pastShows}
        scrollTo="#jumpto-Shows-Past"
        heading="Past"
      />
    </>
  )
}

export const ShowsRouteFragmentContainer = createFragmentContainer(ShowsRoute, {
  viewer: graphql`
    fragment Shows_viewer on Viewer
      @argumentDefinitions(
        currentShowsStatus: { type: "String", defaultValue: "running" }
        currentShowsSort: { type: "PartnerShowSorts", defaultValue: END_AT_ASC }
        upcomingShowsStatus: { type: "String", defaultValue: "upcoming" }
        upcomingShowsSort: {
          type: "PartnerShowSorts"
          defaultValue: START_AT_ASC
        }
        pastShowsStatus: { type: "String", defaultValue: "closed" }
        pastShowsSort: { type: "PartnerShowSorts", defaultValue: END_AT_DESC }
      ) {
      artist_currentShows: artist(id: $artist_id) {
        ...ArtistShows_artist
          @arguments(sort: $currentShowsSort, status: $currentShowsStatus)
      }
      artist_upcomingShows: artist(id: $artist_id) {
        ...ArtistShows_artist
          @arguments(sort: $upcomingShowsSort, status: $upcomingShowsStatus)
      }
      artist_pastShows: artist(id: $artist_id) {
        ...ArtistShows_artist
          @arguments(sort: $pastShowsSort, status: $pastShowsStatus)
      }
    }
  `,
})
