import { Sans } from "@artsy/palette"
import { Shows_viewer } from "__generated__/Shows_viewer.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"
import { ShowsRefetchContainer as Shows } from "./ShowsRefetchContainer"

export interface Props {
  viewer: Shows_viewer
}
export const ShowsRoute = (props: Props) => {
  const { viewer } = props
  return (
    <React.Fragment>
      <Sans size="3" weight="medium">
        Currently on view
      </Sans>
      <Shows
        sort="end_at_desc"
        status="running"
        artist={viewer.artist_currentShows as any}
        scrollTo="#jumpto-RouteTabs"
      />

      <Spacer my={4} id="jumpto-Shows-Upcoming" />

      <Sans size="3" weight="medium">
        Upcoming
      </Sans>

      <ShowDivider />

      <Shows
        sort="start_at_asc"
        status="upcoming"
        artist={viewer.artist_upcomingShows as any}
        scrollTo="#jumpto-Shows-Upcoming"
      />

      <Spacer my={4} id="jumpto-Shows-Past" />
      <Sans size="3" weight="medium">
        Past
      </Sans>

      <ShowDivider />

      <Shows
        sort="end_at_desc"
        status="closed"
        artist={viewer.artist_pastShows as any}
        scrollTo="#jumpto-Shows-Past"
      />
    </React.Fragment>
  )
}

const ShowDivider = () => {
  return (
    <Responsive>
      {({ xs }) => {
        return (
          <div>
            <Spacer my={1} />
            <Separator />
            <Spacer py={xs ? 0 : 1} />
          </div>
        )
      }}
    </Responsive>
  )
}

export const ShowsRouteFragmentContainer = createFragmentContainer(
  ShowsRoute,
  graphql`
    fragment Shows_viewer on Viewer
      @argumentDefinitions(
        currentShowsStatus: { type: "String", defaultValue: "running" }
        currentShowsSort: {
          type: "PartnerShowSorts"
          defaultValue: "end_at_desc"
        }
        upcomingShowsStatus: { type: "String", defaultValue: "upcoming" }
        upcomingShowsSort: {
          type: "PartnerShowSorts"
          defaultValue: "start_at_asc"
        }
        pastShowsStatus: { type: "String", defaultValue: "closed" }
        pastShowsSort: { type: "PartnerShowSorts", defaultValue: "end_at_desc" }
      ) {
      artist_currentShows: artist(id: $artistID) {
        ...ShowsRefetchContainer_artist
          @arguments(sort: $currentShowsSort, status: $currentShowsStatus)
      }
      artist_upcomingShows: artist(id: $artistID) {
        ...ShowsRefetchContainer_artist
          @arguments(sort: $upcomingShowsSort, status: $upcomingShowsStatus)
      }
      artist_pastShows: artist(id: $artistID) {
        ...ShowsRefetchContainer_artist
          @arguments(sort: $pastShowsSort, status: $pastShowsStatus)
      }
    }
  `
)
