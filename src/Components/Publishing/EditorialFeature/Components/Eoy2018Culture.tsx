import {
  ArticleProps,
  FeatureLayout,
} from "Components/Publishing/Layouts/FeatureLayout"
import { Nav } from "Components/Publishing/Nav/Nav"
import React from "react"
import styled from "styled-components"

export const Eoy2018Culture: React.SFC<ArticleProps> = props => {
  return (
    <ArticleWrapper>
      <Nav canFix={false} transparent />
      <FeatureLayout {...props} />
    </ArticleWrapper>
  )
}

const ArticleWrapper = styled.div`
  background: yellow;
  padding-top: 75px;
`
