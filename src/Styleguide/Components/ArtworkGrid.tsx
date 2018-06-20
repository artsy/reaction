import React from "react"
import { ArtworkGridExample } from "Styleguide/Components/ArtworkGridExample"
import { Responsive } from "../Utils/Responsive"

export const FullArtworkGrid = props => (
  <Responsive>
    {({ xs, sm }) => {
      let columns
      if (xs) {
        columns = 2
      } else if (sm) {
        columns = 3
      } else {
        columns = 4
      }
      return <ArtworkGridExample columnCount={columns} {...props} />
    }}
  </Responsive>
)

export const ArtworkGrid = ArtworkGridExample
