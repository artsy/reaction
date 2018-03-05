import React, { Component } from "react"
import styled from "styled-components"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsSections } from "../Sections/NewsSections"

interface Props {
  article: any
  expanded?: boolean
}

interface State {
  expanded: boolean
}

export class NewsLayout extends Component<Props, State> {
  state = {
    expanded: this.props.expanded || true,
  }

  render() {
    const { article } = this.props

    return (
      <NewsContainer>
        <NewsHeadline article={article} />
        <NewsSections article={article} />
      </NewsContainer>
    )
  }
}

const NewsContainer = styled.div`
  max-width: 780px;
  margin: auto;
`
