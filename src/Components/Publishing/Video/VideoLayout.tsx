import React, { Component } from "react"
import { Row } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import { getEditorialHref } from "../Constants"
import { Fonts } from "../Fonts"
import { Nav } from "../Nav/Nav"
import { ArticleCard, ArticleCardContainer } from "../Series/ArticleCard"
import { SeriesAbout, SeriesAboutContainer } from "../Series/SeriesAbout"
import { VideoPlayer } from "../VideoPlayer/VideoPlayer"
import { VideoAbout } from "./VideoAbout"
import { VideoCover, VideoCoverContainer } from "./VideoCover"

interface Props {
  article: any
  seriesArticle?: any
  relatedArticles?: any
}

interface State {
  forcePlay: boolean
  isPlaying: boolean
}

export class VideoLayout extends Component<Props, State> {
  state = {
    forcePlay: false,
    isPlaying: false
  }

  playVideo = () => {
    this.setState({
      forcePlay: true,
      isPlaying: true
    })
  }

  pauseVideo = () => {
    this.setState({
      forcePlay: false,
      isPlaying: false
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
          <VideoCover
            media={media}
            seriesTitle={seriesArticle && seriesArticle.title}
            description={article.description}
            playVideo={this.playVideo}
            hideCover={this.state.isPlaying}
          />
          <VideoPlayer
            url={media.url}
            title={media.title}
            forcePlay={this.state.forcePlay}
            notifyIsPaused={this.pauseVideo}
          />
        </VideoPlayerContainer>
        <VideoAbout
          article={article}
        />
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
                <ArticleCard
                  article={relatedArticle}
                  color="white"
                  series={seriesArticle}
                  // NOT SURE ABOUT NAMING ABOVE
                />
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

const VideoLayoutContainer = styled(Row)`
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
  ${VideoCoverContainer} {
    z-index: 9;
    position: absolute;
  }
  ${SeriesAboutContainer} {
    margin-bottom: 100px;
  }
`
const VideoPlayerContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  top: 0;
`
const RelatedArticlesTitle = styled.div`
  ${Fonts.unica("s32")}
  margin-bottom: 40px;
`
const Link = styled.a`
  text-decoration: none;
  color: white;
`
const MaxRow = styled(Row)`
  width: 100%;
  max-width: 1200px;
  margin: auto;
`
