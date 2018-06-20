import React from "react"
import { Responsive } from "../Utils/Responsive"
import LegacyArtworkGrid from "Components/ArtworkGrid"

export const ArtworkGrid = props => (
  <Responsive>
    {({ xs, sm }) => (
      <LegacyArtworkGrid columnCount={xs ? 2 : sm ? 3 : 4} {...props} />
    )}
  </Responsive>
)
