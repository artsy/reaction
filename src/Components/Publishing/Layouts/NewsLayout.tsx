import React, { Component } from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsSections } from "../News/NewsSections"
import { ArticleData } from "../Typings"

interface Props {
  article: ArticleData
  isMobile?: boolean
  isTruncated?: boolean
  marginTop?: string
  onExpand?: any
}

interface State {
  isTruncated: boolean
}

interface NewsContainerProps {
  isTruncated: boolean
  marginTop?: string
}

export class NewsLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isTruncated: this.props.isTruncated,
    }
  }

  onExpand = () => {
    const { onExpand } = this.props
    if (onExpand) {
      onExpand()
    }
    this.setState({ isTruncated: false })
  }

  render() {
    const { article, marginTop } = this.props
    const { isTruncated } = this.state

    return (
      <NewsContainer
        onClick={this.onExpand}
        isTruncated={isTruncated}
        marginTop={marginTop}
      >
        <NewsHeadline article={article} />
        <NewsSections {...this.props} isTruncated={isTruncated} />
      </NewsContainer>
    )
  }
}

const NewsContainer = styled.div`
  position: relative;
  max-width: 780px;
  padding: 20px 30px 30px;
  margin: 40px auto;
  transition: all 0.5s ease;
  ${(props: NewsContainerProps) =>
    props.marginTop &&
    `
    margin-top: ${props.marginTop};
  `} ${(props: NewsContainerProps) =>
      props.isTruncated &&
      `
    &:hover {
      border-radius: 4px;
      box-shadow: 0 0 8px 0 rgba(0,0,0,0.2);
    }
    `};

  ${pMedia.sm`
    padding: 0px;
  `};
`
