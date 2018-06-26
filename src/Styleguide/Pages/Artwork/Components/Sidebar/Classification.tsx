import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"

import { Classification_artwork } from "__generated__/Classification_artwork.graphql"

export interface ClassificationProps {
  artwork: Classification_artwork
}

const ClassificationContainer = Box

export class Classification extends React.Component<ClassificationProps> {
  render() {
    const { artwork } = this.props
    if (!artwork.attribution_class) {
      return null
    }
    return (
      <ClassificationContainer pt={2} color="black60" textAlign="left">
        <Serif size="2">
          <a href="#">{artwork.attribution_class.short_description}</a>.
        </Serif>
      </ClassificationContainer>
    )
  }
}

export const ClassificationFragmentContainer = createFragmentContainer(
  Classification,
  graphql`
    fragment Classification_artwork on Artwork {
      attribution_class {
        short_description
      }
    }
  `
)
