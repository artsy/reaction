import React from "react"
import styled from "styled-components"
import { Serif } from "@artsy/palette"
import { Box } from "Styleguide/Elements/Box"
import { themeGet } from "styled-system"

export interface ClassificationProps {
  artwork: {
    readonly attribution_class?: {
      readonly short_description: string
    }
  }
}

const ClassificationContainer = styled(Box)`
  color: ${themeGet("colors.black60")};
  text-align: left;
`

export class Classification extends React.Component<ClassificationProps> {
  render() {
    const { artwork } = this.props
    if (!artwork.attribution_class) {
      return null
    }
    return (
      <ClassificationContainer pt={2}>
        <Serif size="2">
          <a href="#">{artwork.attribution_class.short_description}</a>.
        </Serif>
      </ClassificationContainer>
    )
  }
}
