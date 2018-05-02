import styled from "styled-components"
import React from "react"
import { unica } from "Assets/Fonts"
import Colors from "Assets/Colors"

const FEEDBACK_EMAIL = "mailto:productfeedback@artsy.net?subject=Feedback"

export const NewFeature: React.SFC = () => {
  return (
    <NewFeatureContainer>
      <span>This is a new feature. </span>
      <a href={FEEDBACK_EMAIL} target="_blank">
        Tell us what you think.
      </a>
    </NewFeatureContainer>
  )
}

export const NewFeatureContainer = styled.div`
  ${unica("s10")};
  color: ${Colors.grayMedium};
  a {
    color: ${Colors.grayMedium};
    text-decoration: none;
    border-bottom: 1px solid ${Colors.grayRegular};
    line-height: 1em;
  }
`
