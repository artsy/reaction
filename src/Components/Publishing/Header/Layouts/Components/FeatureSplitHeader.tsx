import { space } from "@artsy/palette"
import { BylineContainer } from "Components/Publishing/Byline/Byline"
import React from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import styled from "styled-components"
import { resize } from "../../../../../Utils/resizer"
import { pMedia } from "../../../../Helpers"
import { EditImage, FeatureHeaderProps } from "../FeatureHeader"
import {
  FeatureInnerContent,
  FeatureInnerSubContent,
  SubContentContainer,
  TextContainer,
  Title,
} from "./FeatureInnerContent"

export const FeatureSplitHeader: React.SFC<FeatureHeaderProps> = props => {
  const {
    article: { hero_section, seriesArticle },
    editImage,
  } = props

  const url = (hero_section && hero_section.url) || ""
  const isVideo = url.includes("mp4")
  const src = !isVideo && url.length && resize(url, { width: 1600 })

  return (
    <FeatureSplitHeaderContainer hasNav={seriesArticle && true}>
      <HeaderTextContainer xs={12} sm={5}>
        <FeatureInnerContent {...props} />
      </HeaderTextContainer>

      <FeatureAssetContainer xs={12} sm={6}>
        {editImage && <EditImage>{editImage}</EditImage>}
        {isVideo ? (
          <FeatureVideo
            src={url}
            autoPlay
            controls={false}
            loop
            muted
            playsInline
          />
        ) : (
          src && (
            <ImageContainer src={src}>
              <Img src={src} />
            </ImageContainer>
          )
        )}
      </FeatureAssetContainer>

      <HeaderTextContainer xs={12} sm={false}>
        <FeatureInnerSubContent {...props} />
      </HeaderTextContainer>
    </FeatureSplitHeaderContainer>
  )
}

const HeaderTextContainer = Col.extend`
  padding-left: ${space(2)}px;
  padding-right: ${space(2)}px;
  padding-top: ${space(2)}px;
  padding-bottom: ${space(2)}px;
  ${TextContainer} {
    height: 100%;
    justify-content: space-between;
  }
  ${SubContentContainer} {
    display: block;
  }
  ${BylineContainer} {
    margin-top: ${space(3)}px;
  }
  ${pMedia.sm`
    ${Title} {
      margin-bottom: 20px;
    }
    ${TextContainer} {
      ${SubContentContainer} {
        display: none;
      }
    }
  `};
`

const FeatureVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${pMedia.sm`
    height: auto;
  `};
`

const FeatureAssetContainer = Col.extend`
  flex: 1;
  overflow: hidden;
  margin: 0 ${space(2)}px;
  padding-left: 0;
  padding-right: 0;
  img {
    display: none;
  }
  ${pMedia.sm`
    height: fit-content;
    img {
      display: block;
    }
  `};
`

const ImageContainer = styled.div.attrs<{ src?: string }>({})`
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  ${pMedia.sm`
    height: fit-content;
    ${props =>
      props.src &&
      `
      background-image: none;
      height: fit-content;
    `}
  `};
`

const Img = styled.img`
  width: 100%;
`

const FeatureSplitHeaderContainer = Row.extend.attrs<{ hasNav?: boolean }>({})`
  margin-left: 0;
  margin-right: 0;
  height: ${props => (props.hasNav ? "100vh" : "calc(100vh - 50px)")};
  min-height: fit-content;
  justify-content: space-between;
  ${props =>
    !props.hasNav &&
    `
    margin-top: 50px;
  `};
`
