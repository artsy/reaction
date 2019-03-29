import { Serif } from "@artsy/palette"
import React from "react"

export function ArtistRecommendations() {
  const { artistName } = data

  return (
    <div>
      <Serif size="8" color="black100">
        Related to {artistName}
      </Serif>
    </div>
  )
}

const data = {
  artistName: "Donald Judd",
}
