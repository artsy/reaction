import { Sans, space } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { Byline } from "Components/Publishing/Byline/Byline"
import {
  Vertical,
  VerticalOrSeriesTitle,
} from "Components/Publishing/Sections/VerticalOrSeriesTitle"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../../../Helpers"
import { FeatureHeaderProps } from "../FeatureHeader"

export const FeatureInnerContent: React.SFC<FeatureHeaderProps> = props => {
  const { article, editTitle, editVertical } = props
  const { title, hero_section } = article
  const vertical = (article.vertical && article.vertical.name) || editVertical
  const isFullscreen = hero_section && hero_section.type === "fullscreen"

  return (
    <TextContainer>
      <div>
        <VerticalOrSeriesTitle
          article={article}
          color={isFullscreen ? "white" : undefined}
          vertical={vertical}
        />
        <Title>{editTitle || title}</Title>
      </div>
      <FeatureInnerSubContent {...props} />
    </TextContainer>
  )
}

export const TextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  ${Vertical} {
    padding-bottom: ${space(1)}px;
  }
`

export const Title = styled.div`
  ${unica("s100")};
  margin-bottom: 75px;
  letter-spacing: -0.035em;
  ${pMedia.xl`
    ${unica("s80")}
  `};
  ${pMedia.lg`
    ${unica("s65")}
  `};
  ${pMedia.xs`
    ${unica("s45")}
  `};
`

// Deck & Byline exported separately for mobile split layout
export const FeatureInnerSubContent: React.SFC<FeatureHeaderProps> = props => {
  const { article, date, editDeck } = props
  const { hero_section } = article
  const deck = editDeck || (hero_section && hero_section.deck)
  const isFullscreen = hero_section && hero_section.type === "fullscreen"

  return (
    <SubContentContainer>
      {deck && (
        <Deck size="3t" weight="medium">
          {deck}
        </Deck>
      )}
      <Byline
        article={article}
        color={isFullscreen ? "white" : undefined}
        date={date && date}
      />
    </SubContentContainer>
  )
}

export const SubContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  ${pMedia.sm`
    align-items: flex-start;
    flex-direction: column;
  `};
`

export const Deck = Sans.extend`
  max-width: 460px;
  margin-right: ${space(3)}px;
  ${pMedia.sm`
    margin-bottom: ${space(3)}px;
  `};
`
