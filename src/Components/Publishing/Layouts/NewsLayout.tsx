import React, { Component } from "react"
import styled from "styled-components"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsSections } from "../News/NewsSections"

interface Props {
  article: any
  isTruncated?: boolean
}

interface State {
  isTruncated: boolean
}

interface NewsContainerProps {
  isTruncated: boolean
}

export class NewsLayout extends Component<Props, State> {
  state = {
    isTruncated: this.props.isTruncated || true,
  }

  render() {
    const { article } = this.props
    const { isTruncated } = this.state

    return (
      <NewsContainer
        onClick={() =>
          this.setState({
            isTruncated: false,
          })}
        isTruncated={isTruncated}
      >
        <NewsHeadline article={article} />
        <NewsSections article={article} isTruncated={isTruncated} />
      </NewsContainer>
    )
  }
}

const NewsContainer = styled.div`
  max-width: 780px;
  margin: 40px auto;

  ${(props: NewsContainerProps) =>
    props.isTruncated &&
    `
    &:hover {
      outline: 1px solid gray;
      outline-offset: 30px;
    }
    `};
`
