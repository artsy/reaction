import { Sans } from "@artsy/palette"
import React from "react"
import { RelatedArtistsQueryRenderer } from "./RelatedArtistsQueryRenderer"

export const RelatedArtistsRoute = () => {
  return (
    <React.Fragment>
      <Sans size="3" weight="medium">
        Related
      </Sans>

      <RelatedArtistsQueryRenderer artistID="pablo-picasso" kind="MAIN" />

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
