import {
  ArticleProps,
  FeatureLayout,
} from "Components/Publishing/Layouts/FeatureLayout"
import { Nav } from "Components/Publishing/Nav/Nav"
import React from "react"
import styled from "styled-components"

export const Eoy2018Artists: React.SFC<ArticleProps> = props => {
  return (
    <ArticleWrapper>
      <Nav canFix={false} transparent />
      <FeatureLayout {...props} />
    </ArticleWrapper>
  )
}

const ArticleWrapper = styled.div`
  background: blue;
  color: white;
  padding-top: 75px;

  .content-end {
    background: white;
  }

  div[class^="FeatureInnerContent__"] {
    color: white;
  }
  div[class^="Author__"] {
    color: white;
    &::before {
      background-color: white;
    }
  }
  .Byline {
    color: white;
    svg path {
      fill: white;
    }
  }
`
