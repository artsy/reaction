import React from "react"
import styled from "styled-components"

import { unica } from "Assets/Fonts"
import { pMedia } from "Components/Helpers"
import { IconImageSet } from "Components/Publishing/Icon/IconImageSet"
import { Media } from "Utils/Responsive"
import { ImageSetPreviewProps } from "./ImageSetPreview"

export const ImageSetLabel = (props: ImageSetPreviewProps) => {
  const {
    section: { images, title },
  } = props
  const label = images.length === 1 ? "Image" : "Images"
  const imageCount = `${images.length} ${label}`
  const primaryTitle = title ? title : imageCount

  return (
    <LabelWrapper>
      <TitleWrapper>
        <Title>{primaryTitle}</Title>

        <SubTitle>
          <SubTitlePrompt>View Slideshow</SubTitlePrompt>
          {title && <SubTitleCount>{imageCount}</SubTitleCount>}
        </SubTitle>
      </TitleWrapper>

      <Media greaterThanOrEqual="sm">
        <IconContainer>
          <IconImageSet />
        </IconContainer>
      </Media>
    </LabelWrapper>
  )
}

export const IconContainer = styled.div`
  height: 45px;
  position: relative;
  margin-left: 40px;
  text-align: right;
  > svg {
    height: 98%;
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.div`
  ${unica("s19", "medium")};
  margin-bottom: 8px;
  line-height: 1.1em;

  ${pMedia.xs`
    ${unica("s16", "medium")}
  `};
`
const SubTitle = styled.div`
  display: flex;
`
const SubTitlePrompt = styled.div`
  ${unica("s14", "medium")};

  ${pMedia.xs`
    ${unica("s12", "medium")}
  `};
`
const SubTitleCount = styled.div`
  ${unica("s14")};
  margin-left: 20px;

  ${pMedia.xs`
    ${unica("s12")}
  `};
`
