import React from "react"
import styled from "styled-components"
import { FeatureFullscreenHeader } from "./Components/FeatureFullscreenHeader"
import { FeatureSplitHeader } from "./Components/FeatureSplitHeader"
import { FeatureTextHeader } from "./Components/FeatureTextHeader"

export interface FeatureHeaderProps {
  article?: any
  date?: string
  editDeck?: any
  editImage?: any
  editTitle?: any
  editVertical?: any
}

export const FeatureHeader: React.SFC<FeatureHeaderProps> = props => {
  const {
    article: { hero_section },
  } = props
  const type = hero_section && hero_section.type

  switch (type) {
    case "fullscreen": {
      return <FeatureFullscreenHeader {...props} />
    }
    case "split": {
      return <FeatureSplitHeader {...props} />
    }
    default: {
      return <FeatureTextHeader {...props} />
    }
  }
}

export const EditImage = styled.div`
  position: absolute;
`
