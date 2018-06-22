import { Sans } from "@artsy/palette"
import React from "react"
import { ShowsQueryRenderer } from "./ShowsQueryRenderer"

export const ShowsRoute = () => {
  return (
    <React.Fragment>
      <Sans size="3" weight="medium">
        Currently on view
      </Sans>
      <ShowsQueryRenderer
        status="running"
        artistID="pablo-picasso"
        sort="end_at_asc"
      />
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
