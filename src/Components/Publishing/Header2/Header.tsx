import React from "react"
import { ArticleData } from "../Typings"
import { ClassicHeader } from "./Layouts/ClassicHeader"
import { StandardHeader } from "./Layouts/StandardHeader"

interface HeaderProps {
  article: ArticleData
  date?: string
  editLeadParagraph?: any
  editTitle?: any
  editVertical?: any
}

export const Header: React.SFC<HeaderProps> = props => {
  const { article, date, editLeadParagraph, editTitle, editVertical } = props

  switch (article.layout) {
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
