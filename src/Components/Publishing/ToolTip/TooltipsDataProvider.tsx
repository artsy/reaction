import { ArticleProps } from "Components/Publishing/Article"
import React from "react"
import { TooltipsData } from "./TooltipsDataLoader"

export const TooltipsDataProvider: React.SFC<ArticleProps> = props => {
  const { article, showTooltips } = props

  return (
    <TooltipsData article={article} shouldFetchData={showTooltips}>
      {props.children}
    </TooltipsData>
  )
}
