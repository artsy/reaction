import * as React from "react"
import ClassicHeader from "./classic_header"
import FeatureHeader from "./feature_header"
import StandardHeader from "./standard_header"

interface HeaderProps {
  article: any
  height?: string
}

const getTitle = (article, children) => {
  if (article.layout === "classic") {
    return children ? children[0] : article.title
  } else {
    return children ? children[1] : article.title
  }
}

const getVertical = (article, children) => {
  const vertical = article.vertical ? article.vertical.name : false
  const child = children && children[0]
  if (child) {
    return vertical && child ? vertical : child
  } else {
    return vertical
  }
}

const getLeadParagraph = (article, children) => {
  const leadParagraph = article.lead_paragraph
    ? <div dangerouslySetInnerHTML={{ __html: article.lead_paragraph }} />
    : false
  return children ? children[1] : leadParagraph
}

const getDeck = (article, children) => {
  const hero = article.hero_section
  const savedDeck = hero && hero.deck ? hero.deck : false
  const deck = children && children[2] ? children[2] : savedDeck
  return deck ? <div className="feature__deck">{deck}</div> : false
}

const Header: React.SFC<HeaderProps> = props => {
  const { article, children, height } = props
  const title = getTitle(article, children)

  if (article.layout === "classic") {
    const leadParagraph = getLeadParagraph(article, children)
    return <ClassicHeader article={article} title={title} leadParagraph={leadParagraph} />
  } else {
    const deck = getDeck(article, children)
    const vertical = getVertical(article, children)
    const image = children && children[3]
    if (article.layout === "feature") {
      return (
        <FeatureHeader article={article} title={title} vertical={vertical} deck={deck} image={image} height={height} />
      )
    } else {
      return <StandardHeader article={article} vertical={vertical} title={title} />
    }
  }
}

export default Header
