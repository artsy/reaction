import { Sans } from "@artsy/palette"
import React from "react"
import { RelatedArtistsQueryRenderer } from "./RelatedArtistsQueryRenderer"
import { RelatedArtistsRefetchContainer as RelatedArtists } from "./RelatedArtistsRefetchContainer"

export const RelatedArtistsRoute = props => {
  return (
    <React.Fragment>
      <Sans size="3" weight="medium">
        Related
      </Sans>

      <RelatedArtists kind={props.kind} artist={props.artist} />

      <Sans size="3" weight="medium">
        Suggested contemporary
      </Sans>

      <RelatedArtistsQueryRenderer
        artistID="pablo-picasso"
        kind="CONTEMPORARY"
      />
    </React.Fragment>
  )
}
