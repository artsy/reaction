import React from "react"
import { ArticleData } from "../Typings"
import { ClassicHeader } from "./Layouts/ClassicHeader"

interface HeaderProps {
  article: ArticleData
  date?: string
  editLeadParagraph?: any
  editTitle?: any
}

export const Header: React.SFC<HeaderProps> = props => {
  const { article, date, editLeadParagraph, editTitle } = props

  switch (article.layout) {
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
