import React from "react"
import sizeMe from "react-sizeme"
import Header from "./header/header"
import FeatureLayout from "./layouts/feature_layout"
import StandardLayout from "./layouts/standard_layout"
import Sections from "./sections/sections"

interface ArticleProps {
  article: any
  size?: {
    width: number
  }
}

const Article: React.SFC<ArticleProps> = props => {
  const { article, size } = props
  if (article.layout === "feature") {
    return (
      <div>
        <Header article={article} size={size} />
        <FeatureLayout>
          <Sections article={article} size={size} />
        </FeatureLayout>
      </div>
    )
  } else {
    return (
      <StandardLayout>
        <Sections article={article} size={size} />
      </StandardLayout>
    )
  }
}

const sizeMeOptions = {
  monitorHeight: false,
  refreshRate: 64,
  refreshMode: "debounce",
}

export default sizeMe(sizeMeOptions)(Article)
