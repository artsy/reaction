import { Serif } from "@artsy/palette"
import { FillwidthItem } from "Components/Artwork/FillwidthItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Slider } from "Styleguide/Components/Slider"
import { Spacer } from "Styleguide/Elements/Spacer"
import { artworkBricks } from "Styleguide/Pages/Fixtures/Slider"

export const RecentlyViewed = props => {
  const HEIGHT = 100

  return (
    <React.Fragment>
      <Serif size="6">Recently viewed</Serif>

      <Spacer mb={3} />

      <Slider
        data={artworkBricks}
        render={artwork => {
          const {
            node: {
              image: { aspect_ratio },
            },
          } = artwork

          return (
            <FillwidthItem
              artwork={artwork.node}
              targetHeight={HEIGHT}
              imageHeight={HEIGHT}
              width={HEIGHT * aspect_ratio}
              margin={10}
              useRelay={false}
            />
          )
        }}
      />
    </React.Fragment>
  )
}

export const RecentlyViewedFragmentContainer = createFragmentContainer(
  RecentlyViewed,
  graphql`
    fragment RecentlyViewed_me on Me {
      recentlyViewedArtworkIds
    }
  `
)
