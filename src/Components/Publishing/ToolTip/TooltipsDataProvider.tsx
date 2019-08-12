import { ArticleProps } from "Components/Publishing/Article"
import React from "react"
import { TooltipsData } from "./TooltipsDataLoader"

export class TooltipsDataProvider extends React.Component<ArticleProps> {
  render() {
    const { article, onOpenAuthModal, showTooltips } = this.props

    return (
      <TooltipsData
        article={article}
        shouldFetchData={showTooltips}
        onOpenAuthModal={onOpenAuthModal}
      >
        {this.props.children}
      </TooltipsData>
    )
  }
}
