import React from "react"
import { ClassicHeader } from "./ClassicHeader"
import { FeatureHeader } from "./FeatureHeader"
import { NewsHeadline } from "./NewsHeadline"
import { StandardHeader } from "./StandardHeader"

interface HeaderProps {
  article: any
  date?: string
  isMobile?: boolean
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
  const leadParagraph = article.lead_paragraph ? (
    <div dangerouslySetInnerHTML={{ __html: article.lead_paragraph }} />
  ) : (
    false
  )
  return children ? children[1] : leadParagraph
}

const getDeck = (article, children) => {
  const hero = article.hero_section
  const savedDeck = hero && hero.deck ? hero.deck : false
  const deck = children && children[2] ? children[2] : savedDeck
  return deck ? <div className="feature__deck">{deck}</div> : false
}

export const Header: React.SFC<HeaderProps> = props => {
  const { article, children, date, height, isMobile } = props
  const title = getTitle(article, children)
  const layout = article.layout

  // Classic Article
  if (layout === "classic") {
    const leadParagraph = getLeadParagraph(article, children)
    return (
      <ClassicHeader
        isMobile={isMobile}
        article={article}
        date={date && date}
        title={title}
        leadParagraph={leadParagraph}
      />
    )
  }

  const deck = getDeck(article, children)
  const vertical = getVertical(article, children)
  const image = children && children[3]

  // tslint:disable-next-line:switch-default
  switch (layout) {
    case "feature": {
      return (
        <FeatureHeader
          article={article}
          title={title}
          vertical={vertical}
          date={date && date}
          deck={deck}
          image={image}
          height={height}
          isMobile={isMobile}
        />
      )
    }
    case "news": {
      return <NewsHeadline article={article} title={title} />
    }
    case "standard": {
      return (
        <StandardHeader
          article={article}
          date={date && date}
          vertical={vertical}
          title={title}
        />
      )
    }
  }
}

Header.defaultProps = {
  isMobile: false,
}
