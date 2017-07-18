import * as React from "react"
import styled from "styled-components"
import ClassicHeader from "./classic_header"
import FeatureHeader from "./feature_header"
import StandardHeader from "./standard_header"

interface HeaderProps {
  article: any
}

const Header: React.SFC<HeaderProps> = props => {
  const { article } = props
  if (article.layout === "feature") {
    const header = article.hero_section
    return <FeatureHeader header={header} />
  } else if (article.layout === "standard") {
    return <StandardHeader article={article} />
  } else {
    return <ClassicHeader article={article} />
  }
}

export default Header
