import React, { Component } from "react"
import { Col } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import { media } from "../../Helpers"
import { getEditorialHref } from "../Constants"
import { Fonts } from "../Fonts"
import { Nav } from "../Nav/Nav"
import { ArticleCard, ArticleCardContainer } from "../Series/ArticleCard"
import { SeriesAbout, SeriesAboutContainer } from "../Series/SeriesAbout"
import { VideoContainer, VideoPlayer } from "../VideoPlayer/VideoPlayer"
import { MaxRow } from "./Shared"
import { VideoAbout, VideoAboutContainer } from "./VideoAbout"
import { VideoCover } from "./VideoCover"

interface Props {
  article: any
  seriesArticle?: any
  relatedArticles?: any
}

interface State {
  isPlaying: boolean
}

export class VideoLayout extends Component<Props, State> {
  state = {
    isPlaying: false
  }

  playVideo = () => {
    this.setState({
      isPlaying: true
    })
  }

  onPauseVideo = () => {
    this.setState({
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
          <VideoPlayer
            url={media.url}
            title={media.title}
            forcePlay={this.state.isPlaying}
            notifyIsPaused={this.onPauseVideo}
          />
          <VideoCover
            media={media}
            seriesTitle={seriesArticle && seriesArticle.title}
            description={article.description}
            playVideo={this.playVideo}
            hideCover={this.state.isPlaying}
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
                <Link href={getEditorialHref('series', seriesArticle.slug)}>
                  {seriesArticle.title}
                </Link>
                :
                <span>{article.vertical && article.verical.name}</span>
              }
            </RelatedArticlesTitle>
          </MaxRow>
        }
        {relatedArticles &&
          relatedArticles.map((relatedArticle, i) => {
            return (
              <MaxRow key={i}>
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
        {seriesArticle &&
          <MaxRow>
            <SeriesAbout
              article={seriesArticle}
              color="white"
            />
          </MaxRow>
        }
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
