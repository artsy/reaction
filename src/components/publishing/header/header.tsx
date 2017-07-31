import * as React from "react"
import styled from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import FeatureHeader from "./feature_header"
import StandardHeader from "./standard_header"

interface HeaderProps {
  article: any
  size?: {
    width?: number
  }
}

const Header: React.SFC<HeaderProps> = props => {
  const { article, size } = props
  const hero = article.hero_section
  const deck = hero && hero.deck ? <Deck className="feature__deck">{article.hero_section.deck}</Deck> : false
  if (article.layout === "feature") {
    const isMobile = size && size.width < 600 ? true : false
    return (
      <FeatureHeader article={article} isMobile={isMobile}>
        <FeatureTitle className="feature__title">
          {article.title}
        </FeatureTitle>
        {deck}
      </FeatureHeader>
    )
  } else if (article.layout === "standard") {
    return (
      <StandardHeader article={article}>
        <StandardTitle>
          {article.title}
        </StandardTitle>
      </StandardHeader>
    )
  }
}

const StandardTitle = styled.div`
  ${Fonts.garamond("s50")}
  margin-bottom: 60px;
  ${pMedia.sm`
    ${Fonts.garamond("s34")}
  `}
`
const FeatureTitle = styled.div`
  ${Fonts.unica("s100")}
  margin-bottom: 75px;
  ${pMedia.md`
    ${Fonts.unica("s80")}
  `}
  ${pMedia.sm`
    ${Fonts.unica("s45")}
  `}
`
const Deck = styled.div`
  max-width: 460px;
  ${pMedia.sm`
    margin-bottom: 28px;
    ${Fonts.unica("s16", "medium")}
  `}
`

export default Header
