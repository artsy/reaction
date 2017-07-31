import React from "react"
import Header from "./header/header"
import FeatureLayout from "./layouts/feature_layout"
import StandardLayout from "./layouts/standard_layout"
import Sections from "./sections/sections"
import Sidebar from "./sidebar/sidebar"

interface ArticleProps {
  article: any
}

const Article: React.SFC<ArticleProps> = props => {
  const { article } = props
  if (article.layout === "feature") {
    return (
      <div>
        <Header article={article} />
        <FeatureLayout>
          <Sections article={article} />
        </FeatureLayout>
      </div>
    )
  } else {
    return (
      <StandardLayout>
        <Sections article={article} />
        <Sidebar article={article} />
      </StandardLayout>
    )
  }
}

export default Article
