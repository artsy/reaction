import * as React from "react"
import styled from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import ClassicHeader from "./classic_header"
import FeatureHeader from "./feature_header"
import StandardHeader from "./standard_header"

interface HeaderProps {
  article: any
}

const Header: React.SFC<HeaderProps> = props => {
  const { article } = props
  const hero = article.hero_section
  const deck = hero && hero.deck ? <Deck className="feature__deck">{article.hero_section.deck}</Deck> : false
  if (article.layout === "feature") {
    return (
      <FeatureHeader article={article}>
        <FeatureTitle className="feature__title">
          {props.children ? props.children[0] : article.title}
        </FeatureTitle>
        {props.children ? props.children[1] : deck}
      </FeatureHeader>
    )
  } else if (article.layout === "standard") {
    return (
      <StandardHeader article={article}>
        <StandardTitle>
          {props.children ? props.children[0] : article.title}
        </StandardTitle>
      </StandardHeader>
    )
  } else if (article.layout === "classic") {
    return (
      <ClassicHeader article={article}>
        <ClassicTitle>
          {props.children ? props.children[0] : article.title}
        </ClassicTitle>
      </ClassicHeader>
    )
  }
}

const ClassicTitle = styled.div`
  ${Fonts.garamond("s37")}
  margin-bottom: 30px;
  ${pMedia.xs`
    ${Fonts.garamond("s34")}
  `}
`
const StandardTitle = styled.div`
  ${Fonts.garamond("s50")}
  margin-bottom: 50px;
  ${pMedia.xs`
    ${Fonts.garamond("s34")}
  `}
`
const FeatureTitle = styled.div`
  ${Fonts.unica("s100")}
  margin-bottom: 75px;
  ${pMedia.md`
    ${Fonts.unica("s80")}
  `}
  ${pMedia.xs`
    ${Fonts.unica("s45")}
  `}
`
const Deck = styled.div`
  max-width: 460px;
  ${pMedia.xs`
    margin-bottom: 28px;
    ${Fonts.unica("s16")}
  `}
`

export default Header
