import { Box, Flex, Serif } from "@artsy/palette"
import React, { Component } from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"

import { IconVideoPlay } from "Components/Publishing/Icon/IconVideoPlay"
import { VideoInfoBlock } from "./VideoInfoBlock"

interface Props {
  article: any
  description?: string
  editDescription?: any
  editTitle?: any
  hideCover?: boolean
  media: any
  playVideo?: () => void
  seriesLink?: string
  seriesTitle?: string
  tracking?: TrackingProp
}

interface CoverProps {
  hideCover?: boolean
}

interface CoverAssetProps {
  src?: string
}

@track()
export class VideoCover extends Component<Props, null> {
  onPlayClick = () => {
    const { tracking, playVideo } = this.props

    tracking.trackEvent({
      action: "Click",
      label: "Play video",
    })
    playVideo()
  }

  render() {
    const {
      article,
      editDescription,
      editTitle,
      hideCover,
      media,
      seriesLink,
      seriesTitle,
    } = this.props

    return (
      <VideoCoverContainer hideCover={hideCover}>
        <VideoCoverAsset src={media.cover_image_url} />
        <VideoCoverOverlay />

        <VideoCoverInfo alignItems="flex-end" pb={[40, 60]} px={20}>
          <Box maxWidth={1200} mx="auto" pb="12px">
            <Flex>
              <Box width="60px" pr={20} onClick={this.onPlayClick}>
                <IconVideoPlay color="white" />
              </Box>
              <Box>
                <VideoInfoBlock
                  media={media}
                  subTitle={
                    seriesTitle || (article.vertical && article.vertical.name)
                  }
                  subTitleLink={seriesLink}
                  title={article.title}
                  editTitle={editTitle}
                />
              </Box>
            </Flex>

            <Box maxWidth={["100%", "60%"]}>
              <MediaDescription size={["4", "5", "5", "5"]} pt={30}>
                {editDescription || article.description}
              </MediaDescription>
            </Box>
          </Box>
        </VideoCoverInfo>
      </VideoCoverContainer>
    )
  }
}

export const VideoCoverAsset = styled.div<CoverAssetProps>`
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
  background-color: black;
`

const VideoCoverOverlay = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
`

const VideoCoverInfo = styled(Flex)`
  box-sizing: border-box;
  z-index: 1;

  ${IconVideoPlay} {
    height: 60px;
    width: 44px;
    cursor: pointer;
  }
`

export const VideoCoverContainer = styled.div<CoverProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: white;
  opacity: ${props => (props.hideCover ? "0" : "1")};
  visibility: ${props => (props.hideCover ? "hidden" : "visible")};
  transition: opacity 0.25s ease, visibility 0.25s ease;

  ${VideoCoverAsset}, ${VideoCoverOverlay}, ${VideoCoverInfo} {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

const MediaDescription = styled(Serif)`
  position: relative;
`
