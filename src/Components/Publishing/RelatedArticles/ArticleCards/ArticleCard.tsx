import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
import { media } from "Components/Helpers"
import { Byline } from "Components/Publishing/Byline/Byline"
import { Date } from "Components/Publishing/Byline/Date"
import { formatTime, getMediaDate } from "Components/Publishing/Constants"
import { IconVideoPlay } from "Components/Publishing/Icon/IconVideoPlay"
import React, { Component } from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { crop } from "Utils/resizer"

interface Props {
  article?: any
  color?: string
  editing?: boolean
  editDate?: any
  editDescription?: any
  editTitle?: any
  editImage?: any
  series?: any
  tracking?: TrackingProp
}

@track()
export class ArticleCard extends Component<Props> {
  public static defaultProps: Partial<Props>

  isUnpublishedMedia = () => {
    const { article } = this.props
    return (
      article.layout === "video" && article.media && !article.media.published
    )
  }

  isEditing = () => {
    const {
      editDate,
      editDescription,
      editImage,
      editTitle,
      editing,
    } = this.props

    return editing || editDate || editDescription || editImage || editTitle
  }

  renderDate = () => {
    const { article, editDate } = this.props

    if (editDate) {
      return (
        <Sans size="3t" weight="medium">
          {editDate}
        </Sans>
      )
    } else if (article.media) {
      return this.renderMediaDate()
    } else {
      return (
        <Byline
          article={article}
          color={this.props.color}
          size="3t"
          layout="condensed"
        />
      )
    }
  }

  renderMediaDate = () => {
    const { article } = this.props
    const mediaDate = getMediaDate(article)
    const date = article.layout === "video" ? mediaDate : article.published_at

    if (this.isUnpublishedMedia()) {
      return (
        <Sans size="3t" weight="medium">
          <Flex alignItems="flex-end">
            <Box mr="5px">Available</Box>
            <Date format="monthYear" date={mediaDate} />
          </Flex>
        </Sans>
      )
    } else {
      return <Date layout="condensed" size="3t" date={date} />
    }
  }

  renderMediaCoverInfo = () => {
    const { article } = this.props

    if (this.isUnpublishedMedia()) {
      return (
        <MediaContainer>
          <Sans size={["8", "8", "8", "10"]}>Coming Soon</Sans>
        </MediaContainer>
      )
    } else {
      return (
        <MediaContainer justifyContent="space-between" alignItems="flex-end">
          <IconVideoPlay color={this.props.color} />
          <Sans size="3t" weight="medium" lineHeight="1em">
            {formatTime(article.media.duration)}
          </Sans>
        </MediaContainer>
      )
    }
  }

  openLink = e => {
    e.preventDefault()

    if (!this.isUnpublishedMedia() && !this.isEditing()) {
      window.open(e.currentTarget.attributes.href.value)
    }

    this.props.tracking.trackEvent({
      action: "Click",
      label: "Related article card",
    })
  }

  render() {
    const {
      article,
      editDescription,
      editImage,
      editTitle,
      series,
    } = this.props
    const { layout } = article
    const isUnpublishedMedia = this.isUnpublishedMedia()

    const description = editDescription ? editDescription : article.description

    const title = editTitle
      ? editTitle
      : article.thumbnail_title || article.title

    return (
      <ArticleCardContainer
        href={isUnpublishedMedia ? "" : article.slug}
        color={this.props.color}
        className="ArticleCard"
        published={!isUnpublishedMedia}
        onClick={this.openLink}
      >
        <Flex
          flexDirection={[
            "column-reverse",
            "column-reverse",
            "column-reverse",
            "row",
          ]}
          p={[20, 20, 20, 30]}
        >
          <Flex
            width={["100%", "100%", "100%", "50%"]}
            mb={[0, 0, 0, "5px"]}
            flexDirection="column"
            justifyContent="space-between"
          >
            <div>
              {series && (
                <Sans size="3t" weight="medium" mb={1}>
                  {series.title}
                </Sans>
              )}
              <Sans size={["8", "8", "8", "10"]} mb={20}>
                {title}
              </Sans>

              <Serif size={["4", "4", "4", "5"]} mb={20}>
                {description}
              </Serif>
            </div>
            {this.renderDate()}
          </Flex>

          <ImageContainer
            width={["100%", "100%", "100%", "50%"]}
            ml={[0, 0, 0, 30]}
            mb={[10, 10, 10, 0]}
          >
            {editImage ? (
              editImage
            ) : (
              <Image
                src={crop(article.thumbnail_image, { width: 680, height: 450 })}
              />
            )}
            {article.media && layout === "video" && this.renderMediaCoverInfo()}
          </ImageContainer>
        </Flex>
      </ArticleCardContainer>
    )
  }
}

ArticleCard.defaultProps = {
  color: color("black100"),
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.15s;
  display: block;
`

const ImageContainer = styled(Box)`
  position: relative;
  height: inherit;
  background: white;
`

export const ArticleCardContainer = styled.a<{ published: boolean }>`
  border: 1px solid;
  border-radius: 2px;
  color: ${props => props.color};
  cursor: ${props => (props.published ? "pointer" : "default")};
  text-decoration: none;
  display: block;

  ${Image} {
    opacity: ${props => (props.published ? "1" : "0.7")};
  }

  &:hover {
    ${Image} {
      opacity: 0.7;
    }
  }
`

const MediaContainer = styled(Flex)`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;

  svg {
    height: 40px;
  }
  ${media.md`
    svg {
      height: 30px;
    }
  `};
`
