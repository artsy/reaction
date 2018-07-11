import Colors from "Assets/Colors"
import { unica } from "Assets/Fonts"
import { once } from "lodash"
import React, { Component } from "react"
import track from "react-tracking"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { DisplayCanvas, DisplayContainer } from "../Display/Canvas"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsSections } from "../News/NewsSections"
import RelatedArticlesCanvas, {
  RelatedArticlesCanvasProps,
} from "../RelatedArticles/RelatedArticlesCanvas"
import { ArticleData } from "../Typings"

interface Props {
  article: ArticleData
  display?: any
  isMobile?: boolean
  isHovered?: boolean
  isTruncated?: boolean
  marginTop?: string
  onExpand?: any
  relatedArticlesForCanvas?: RelatedArticlesCanvasProps
  renderTime?: any
  tracking?: any
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

@track()
export class NewsLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isTruncated: this.props.isTruncated || false,
      isHovered: this.props.isHovered || false,
    }

    this.onExpand = this.onExpand.bind(this)
    this.trackExpand = once(this.trackExpand)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isHovered !== this.props.isHovered) {
      this.setState({ isHovered: nextProps.isHovered })
    }
  }

  onExpand() {
    const { onExpand } = this.props
    this.trackExpand()
    if (onExpand) {
      onExpand()
    }
    this.setState({ isTruncated: false })
  }

  trackExpand = () => {
    const { article, tracking } = this.props
    if (tracking) {
      tracking.trackEvent({
        action: "Clicked read more",
        pathname: `/news/${article.slug}`,
      })
    }
  }

  render() {
    const {
      article,
      display,
      isMobile,
      marginTop,
      relatedArticlesForCanvas,
      renderTime,
    } = this.props
    const { isTruncated, isHovered } = this.state

    return (
      <NewsContainer>
        <NewsArticleContainer
          isTruncated={isTruncated}
          isHovered={isHovered}
          marginTop={marginTop}
          onClick={() => {
            if (isTruncated) {
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
        </NewsArticleContainer>
        {relatedArticlesForCanvas && (
          <RelatedContainer>
            <RelatedArticlesCanvas
              articles={relatedArticlesForCanvas as any}
              isMobile={isMobile}
            />
          </RelatedContainer>
        )}
        {display && (
          <DisplayCanvas
            article={article}
            unit={display && display.canvas}
            campaign={display}
            renderTime={renderTime}
          />
        )}
      </NewsContainer>
    )
  }
}

export const RelatedContainer = styled.div`
  border-top: 1px solid rgb(229, 229, 229);
  border-bottom: 1px solid rgb(229, 229, 229);
  margin: 80px 0 0;
`

export const NewsContainer = styled.div`
  ${DisplayContainer} {
    border-bottom: 1px solid rgb(229, 229, 229);
    /* TODO: Fix display margins globally */
    margin-bottom: 0;
    padding-bottom: 20px;
  }
`

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
  ${unica("s14", "medium")};
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

export const NewsArticleContainer = styled.div`
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
    cursor: pointer;
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
