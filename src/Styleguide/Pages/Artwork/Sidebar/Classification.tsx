import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"

export interface ClassificationProps {
  artwork: {
    readonly attribution_class?: {
      readonly short_description: string
    }
  }
}

const ClassificationContainer = Box

export class Classification extends React.Component<ClassificationProps> {
  render() {
    const { artwork } = this.props
    if (!artwork.attribution_class) {
      return null
    }
    return (
      <ClassificationContainer pt={2} color="black60" align="left">
        <Serif size="2">
          <a href="#">{artwork.attribution_class.short_description}</a>.
        </Serif>
      </ClassificationContainer>
    )
  }
}
