import { garamond } from "Assets/Fonts"
import React, { Component } from "react"
import { Col } from "react-styled-flexboxgrid"
import styled, { StyledFunction } from "styled-components"
import { track } from "../../../Utils/track"
import { media } from "../../Helpers"
import { IconVideoPlay } from "../Icon/IconVideoPlay"
import { MaxRow } from "./Shared"
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
  tracking?: any
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
        <VideoCoverInfo>
          <VideoCoverInfoRow>
            <Col xs={2} sm={1} onClick={this.onPlayClick}>
              <IconVideoPlay color="white" />
            </Col>
            <Col xs={10} sm={6}>
              <VideoInfoBlock
                media={media}
                subTitle={
                  seriesTitle || (article.vertical && article.vertical.name)
                }
                subTitleLink={seriesLink}
                title={article.title}
                editTitle={editTitle}
              />
            </Col>
            <Col xs={12} sm={7}>
              <MediaDescription>
                {editDescription || article.description}
              </MediaDescription>
            </Col>
          </VideoCoverInfoRow>
        </VideoCoverInfo>
      </VideoCoverContainer>
    )
  }
}

const Div: StyledFunction<CoverAssetProps> = styled.div
export const VideoCoverAsset = Div`
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
  background-color: black;
`

const VideoCoverOverlay = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
`

const VideoCoverInfoRow = styled(MaxRow)`
  width: 100%;
  align-items: flex-end;
`

const VideoCoverInfo = styled.div`
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 60px;
  z-index: 1;
  ${IconVideoPlay} {
    height: 60px;
    width: 44px;
    margin-right: 15px;
    cursor: pointer;
  }
  ${media.sm`
    padding-bottom: 40px;
  `};
`

const CoverDiv: StyledFunction<CoverProps> = styled.div
export const VideoCoverContainer = CoverDiv`
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

const MediaDescription = styled.div`
  position: relative;
  margin-top: 30px;
  ${garamond("s23")};
  ${media.sm`
    ${garamond("s19")}
  `};
`
