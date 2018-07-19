import { space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { resize } from "../../../../../Utils/resizer"
import { EditImage, FeatureHeaderProps } from "../FeatureHeader"
import { FeatureInnerContent, Title } from "./FeatureInnerContent"

export const FeatureTextHeader: React.SFC<FeatureHeaderProps> = props => {
  const { article, date, editDeck, editImage, editVertical, editTitle } = props
  const { hero_section } = article

  const url = (hero_section && hero_section.url) || ""
  const alt = url.length ? article.title : ""
  const src = url.length && resize(url, { width: 1200 })

  return (
    <TextHeaderContainer>
      <FeatureInnerContent
        article={article}
        date={date}
        editDeck={editDeck}
        editVertical={editVertical}
        editTitle={editTitle}
      />

      <Asset>
        {editImage && <EditImage>{editImage}</EditImage>}
        {url.includes("mp4") ? (
          <video
            src={url}
            autoPlay
            controls={false}
            loop
            muted
            playsInline
            width="100%"
          />
        ) : (
          url.length && <Image src={src} alt={alt} />
        )}
      </Asset>
    </TextHeaderContainer>
  )
}

const Image = styled.img`
  width: 100%;
  height: auto;
  box-sizing: border-box;
`

const Asset = styled.div`
  width: 100%;
  padding-top: ${space(2)}px;
  box-sizing: border-box;
`

const TextHeaderContainer = styled.div`
  width: 100%;
  position: relative;
  height: auto;
  padding: ${space(2)}px;
  margin-top: 50px;

  ${Title} {
    margin-bottom: 150px;
  }
`
