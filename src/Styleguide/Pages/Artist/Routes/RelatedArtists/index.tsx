import { Sans } from "@artsy/palette"
import React from "react"
import { RelatedArtistsQueryRenderer } from "./RelatedArtistsQueryRenderer"
import { RelatedArtistsRefetchContainer } from "./RelatedArtistsRefetchContainer"

export const RelatedArtistsRoute = props => {
  return (
    <React.Fragment>
      <Sans size="3" weight="medium">
        Related
      </Sans>

      <RelatedArtistsRefetchContainer kind={props.kind} artist={props.artist} />

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
