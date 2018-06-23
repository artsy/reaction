import { Sans } from "@artsy/palette"
import React from "react"
import { ShowsQueryRenderer } from "./ShowsQueryRenderer"
import { ShowsRefetchContainer } from "./ShowsRefetchContainer"

export const ShowsRoute = props => {
  return (
    <React.Fragment>
      <Sans size="3" weight="medium">
        Currently on view
      </Sans>
      <ShowsRefetchContainer status={status} artist={props.artist} />
      <Sans size="3" weight="medium">
        Upcoming
      </Sans>
      <ShowsQueryRenderer
        status="upcoming"
        artistID="andy-warhol"
        sort="start_at_asc"
      />
      <Sans size="3" weight="medium">
        Past
      </Sans>
      <ShowsQueryRenderer
        status="closed"
        artistID="pablo-picasso"
        sort="end_at_desc"
      />
    </React.Fragment>
  )
}
