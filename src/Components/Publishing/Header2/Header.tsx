import React from "react"
import { ArticleData } from "../Typings"
import { ClassicHeader } from "./Layouts/ClassicHeader"
import { FeatureHeader } from "./Layouts/FeatureHeader"
import { StandardHeader } from "./Layouts/StandardHeader"

interface HeaderProps {
  article: ArticleData
  date?: string
  editDeck?: any
  editImage?: any
  editLeadParagraph?: any
  editTitle?: any
  editVertical?: any
}

export const Header: React.SFC<HeaderProps> = props => {
  const {
    article,
    date,
    editLeadParagraph,
    editDeck,
    editImage,
    editTitle,
    editVertical,
  } = props

  switch (article.layout) {
    case "feature": {
      return (
        <FeatureHeader
          article={article}
          date={date && date}
          editDeck={editDeck}
          editImage={editImage}
          editTitle={editTitle}
          editVertical={editVertical}
        />
      )
    }

    case "standard": {
      return (
        <StandardHeader
          article={article}
          date={date && date}
          editTitle={editTitle}
          editVertical={editVertical}
        />
      )
    }

    default: {
      return (
        <ClassicHeader
          article={article}
          date={date && date}
          editLeadParagraph={editLeadParagraph}
          editTitle={editTitle}
        />
      )
    }
  }
}
