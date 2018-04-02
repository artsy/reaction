import React, { Component } from "react"
import styled from "styled-components"
import Colors from "../../../Assets/Colors"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsSections } from "../News/NewsSections"
import { ArticleData } from "../Typings"

interface Props {
  article: ArticleData
  isMobile?: boolean
  isTruncated?: boolean
  marginTop?: string
  onExpand?: any
  isHovered?: boolean
}

interface State {
  isTruncated: boolean
  isHovered: boolean
}

interface NewsContainerProps {
  isTruncated: boolean
  marginTop?: string
  isHovered: boolean
}

export class NewsLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isTruncated: this.props.isTruncated,
      isHovered: this.props.isHovered,
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
    const { article, isMobile, marginTop } = this.props
    const { isTruncated, isHovered } = this.state

    return (
      <NewsContainer
        isTruncated={isTruncated}
        isHovered={isHovered}
        marginTop={marginTop}
        onClick={() => {
          if (!isMobile && isTruncated) {
            this.onExpand()
          }
        }}
        onMouseEnter={() => {
          if (!isMobile) {
            this.setState({ isHovered: true })
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            this.setState({ isHovered: false })
          }
        }}
      >
        <NewsHeadline article={article} />
        <NewsSections {...this.props} isTruncated={isTruncated} />
        <ExpandButton
          isHovered={isHovered}
          isTruncated={isTruncated}
          onClick={this.onExpand}
        >
          Expand
        </ExpandButton>
      </NewsContainer>
    )
  }
}

export const ExpandButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: black;
  position: absolute;
  bottom: 30px;
  right: 30px;
  color: white;
  border-radius: 2px;
  border: none;
  display: block;
  opacity: 0;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.25s ease;
  ${Fonts.unica("s14", "medium")};
  line-height: 1em;

  &:focus {
    outline: 0;
  }

  &:hover {
    color: ${Colors.grayRegular};
  }

  ${(props: NewsContainerProps) =>
    props.isHovered &&
    props.isTruncated &&
    `
      opacity: 1;
    `};

  ${pMedia.sm`
    bottom: 15px;
    right: 15px;
  `};
`

const NewsContainer = styled.div`
  position: relative;
  max-width: 780px;
  padding: 20px 30px 30px;
  margin: 40px auto;
  transition: all 0.25s ease;
  border: 1px solid transparent;

  ${(props: NewsContainerProps) =>
    props.marginTop &&
    `
    margin-top: ${props.marginTop};
  `};

  ${(props: NewsContainerProps) =>
    props.isTruncated &&
    props.isHovered &&
    `
    border-radius: 4px;
    border: 1px solid ${Colors.grayRegular};
  `};

  ${pMedia.sm`
    margin: 40px 5px;
    padding: 10px 15px 20px;
    ${(props: NewsContainerProps) =>
      props.marginTop &&
      `
      margin-top: ${props.marginTop};
    `};
  `};
`
