import { Box } from "@artsy/palette"
import React, { Component } from "react"
import track from "react-tracking"
import styled from "styled-components"

import { getEditorialHref } from "Components/Publishing/Constants"
import { Nav, NavContainer } from "Components/Publishing/Nav/Nav"
import { ArticleCardsBlock } from "Components/Publishing/RelatedArticles/ArticleCards/Block"
import { ArticleData } from "Components/Publishing/Typings"
import {
  VideoContainer,
  VideoPlayer,
} from "Components/Publishing/Video/Player/VideoPlayer"
import { VideoAbout } from "Components/Publishing/Video/VideoAbout"
import { VideoCover } from "Components/Publishing/Video/VideoCover"
import Events from "Utils/Events"

interface Props {
  areHostedAdsEnabled?: boolean
  article: ArticleData
  seriesArticle?: ArticleData
  relatedArticles?: any
}

interface State {
  isPlaying: boolean
  hideCover: boolean
}

@track(
  props => {
    return {
      page: "Article",
      entity_type: "article",
      entity_id: props.article.id,
    }
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class VideoLayout extends Component<Props, State> {
  state = {
    isPlaying: false,
    hideCover: false,
  }

  playVideo = () => {
    this.setState({
      isPlaying: true,
      hideCover: true,
    })
  }

  onPlayToggle = isPlaying => {
    if (!isPlaying) {
      this.setState({
        isPlaying,
      })
      setTimeout(this.setHideCover.bind(this), 30000)
    } else {
      this.setState({
        isPlaying,
        hideCover: true,
      })
    }
  }

  setHideCover = () => {
    if (!this.state.isPlaying) {
      this.setState({
        hideCover: false,
      })
    }
  }

  render() {
    const { article, relatedArticles } = this.props
    const { media, seriesArticle } = article
    const sponsor = seriesArticle ? seriesArticle.sponsor : article.sponsor
    const seriesLink =
      seriesArticle && getEditorialHref("series", seriesArticle.slug)
    return (
      <VideoLayoutContainer>
        <Nav transparent sponsor={sponsor} canFix={false} />
        <VideoPlayerContainer>
          {media.url && (
            <VideoPlayer
              url={media.url}
              title={media.title}
              forcePlay={this.state.isPlaying}
              notifyPlayToggle={this.onPlayToggle}
            />
          )}
          <VideoCover
            article={article}
            media={media}
            seriesTitle={seriesArticle && seriesArticle.title}
            seriesLink={seriesLink}
            playVideo={this.playVideo}
            hideCover={this.state.hideCover}
          />
        </VideoPlayerContainer>

        <Box px={20} maxWidth={1200} mx="auto">
          <Box pt={[40, 40, 60]}>
            <VideoAbout article={article} color="white" />
          </Box>

          {(relatedArticles || seriesArticle) && (
            <Box pt={[60, 60, 100]}>
              <ArticleCardsBlock {...this.props} color="white" />
            </Box>
          )}
        </Box>
      </VideoLayoutContainer>
    )
  }
}

const VideoLayoutContainer = styled.div`
  background: black;
  color: white;
  margin: auto;

  ${NavContainer} {
    position: absolute;
    top: 0;
  }
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
