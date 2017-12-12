import { debounce } from "lodash"
import React, { Component } from "react"
import { Col, Row } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import { media } from "../../Helpers"
import { getEditorialHref } from "../Constants"
import { Fonts } from "../Fonts"
import { Nav } from "../Nav/Nav"
import { ArticleCard, ArticleCardContainer } from "../Series/ArticleCard"
import { SeriesAbout, SeriesAboutContainer } from "../Series/SeriesAbout"
import { VideoContainer, VideoPlayer } from "../VideoPlayer/VideoPlayer"
import { VideoAbout, VideoAboutContainer } from "./VideoAbout"
import { VideoCover, VideoCoverContainer } from "./VideoCover"

interface Props {
  article: any
  seriesArticle?: any
  relatedArticles?: any
}

interface State {
  forcePlay: boolean
  hideCover: boolean
}

export class VideoLayout extends Component<Props, State> {
  state = {
    forcePlay: false,
    hideCover: false,
  }

  playVideo = () => {
    this.setState({
      forcePlay: true,
      hideCover: true
    })
  }

  onPauseVideo = () => {
    this.setState({
      forcePlay: false,
      hideCover: false
    })
  }

  render() {
    const {
      article,
      seriesArticle,
      relatedArticles
    } = this.props
    const { media } = article

    return(
      <VideoLayoutContainer>
        <Nav
          transparent
          sponsor={article.sponsor}
        />
        <VideoPlayerContainer>
          <VideoPlayer
            url={media.url}
            title={media.title}
            forcePlay={this.state.forcePlay}
            notifyIsPaused={this.onPauseVideo}
          />
          <VideoCover
            media={media}
            seriesTitle={seriesArticle && seriesArticle.title}
            description={article.description}
            playVideo={this.playVideo}
            hideCover={this.state.hideCover}
          />
        </VideoPlayerContainer>
        <MaxRow>
          <VideoAbout
            article={article}
            color="white"
          />
        </MaxRow>
        {relatedArticles &&
          <MaxRow>
            <RelatedArticlesTitle>
              {"More in "}
              {seriesArticle ?
                <Link
                  href={getEditorialHref('series', seriesArticle.slug)}
                  color="white"
                >
                  {seriesArticle.title}
                </Link>
                :
                <span>{article.vertical.name}</span>
              }
            </RelatedArticlesTitle>
          </MaxRow>
        }
        {relatedArticles &&
          relatedArticles.map((relatedArticle) => {
            return (
              <MaxRow>
                <Col xs={12}>
                  <ArticleCard
                    article={relatedArticle}
                    color="white"
                    series={seriesArticle}
                  />
                </Col>
              </MaxRow>
            )
          })
        }
        <MaxRow>
          {seriesArticle &&
            <SeriesAbout
              article={seriesArticle}
              color="white"
            />
          }
        </MaxRow>
      </VideoLayoutContainer>
    )
  }
}

const RelatedArticlesTitle = styled(Col) `
  ${Fonts.unica("s32")}
`
const VideoLayoutContainer = styled.div`
  background: black;
  color: white;
  margin: auto;
  ${Nav} {
    position: absolute;
    top: 0;
  }
  ${ArticleCardContainer} {
    margin-bottom: 60px;
  }
  ${RelatedArticlesTitle} {
    margin-bottom: 40px;
  }
  ${SeriesAboutContainer}, ${VideoAboutContainer} {
    margin: 60px 0 100px 0;
  }

  ${media.sm`
    ${ArticleCardContainer} {
      margin-bottom: 30px;
    }
    ${SeriesAboutContainer}, ${VideoAboutContainer} {
      margin: 40px 0 100px 0;
    }
  `}
`
const VideoPlayerContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  ${VideoContainer} {
    position: absolute;
    top: 0;
  }
`

const Link = styled.a`
  text-decoration: none;
  color: white;
`
export const MaxRow = styled(Row)`
  max-width: 1200px;
  margin: 0px auto;
  padding: 0px 12px;
`
