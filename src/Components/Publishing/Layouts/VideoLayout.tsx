import React, { Component } from "react"
import { Col } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import Events from "../../../Utils/Events"
import { track } from "../../../Utils/track"
import { media } from "../../Helpers"
import { getEditorialHref } from "../Constants"
import { Fonts } from "../Fonts"
import { Nav } from "../Nav/Nav"
import { ArticleCard, ArticleCardContainer } from "../Series/ArticleCard"
import { SeriesAbout, SeriesAboutContainer } from "../Series/SeriesAbout"
import { ArticleData } from "../Typings"
import { VideoContainer, VideoPlayer } from "../Video/Player/VideoPlayer"
import { MaxRow } from "../Video/Shared"
import { VideoAbout, VideoAboutContainer } from "../Video/VideoAbout"
import { VideoCover } from "../Video/VideoCover"

interface Props {
  article: ArticleData
  seriesArticle?: ArticleData
  relatedArticles?: any
}

interface State {
  isPlaying: boolean
  hideCover: boolean
}

@track((props) => {
  return {
    page: "Video",
    entity_type: "article",
    entity_id: props.article.id
  }
}, {
    dispatch: data => Events.postEvent(data)
  }
)
export class VideoLayout extends Component<Props, State> {
  state = {
    isPlaying: false,
    hideCover: false
  }

  playVideo = () => {
    this.setState({
      isPlaying: true,
      hideCover: true
    })
  }

  onPlayToggle = (isPlaying) => {
    if (!isPlaying) {
      this.setState({
        isPlaying
      })
      setTimeout(this.setHideCover.bind(this), 30000)
    } else {
      this.setState({
        isPlaying,
        hideCover: true
      })
    }
  }

  setHideCover = () => {
    if (!this.state.isPlaying) {
      this.setState({
        hideCover: false
      })
    }
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
          canFix={false}
        />
        <VideoPlayerContainer>
          <VideoPlayer
            url={media.url}
            title={media.title}
            forcePlay={this.state.isPlaying}
            notifyPlayToggle={this.onPlayToggle}
          />
          <VideoCover
            article={article}
            media={media}
            seriesTitle={seriesArticle && seriesArticle.title}
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
                <Link href={getEditorialHref('series', seriesArticle.slug)}>
                  {seriesArticle.title}
                </Link>
                :
                <span>{article.vertical && article.vertical.name}</span>
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
