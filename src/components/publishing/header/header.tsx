import * as React from "react"
import FeatureHeader from "./feature_header"
import StandardHeader from "./standard_header"

interface HeaderProps {
  article: any
}

const Header: React.SFC<HeaderProps> = props => {
  const { article } = props
  if (article.layout === "feature") {
    return <FeatureHeader article={article} />
  } else if (article.layout === "standard") {
    return <StandardHeader article={article} />
  }
}

export default Header
