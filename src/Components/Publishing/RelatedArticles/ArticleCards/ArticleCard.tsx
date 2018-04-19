import React, { Component } from "react"
import styled from "styled-components"
import { crop } from "../../../../Utils/resizer"
import { track } from "../../../../Utils/track"
import { pMedia } from "../../../Helpers"
import { Date } from "../../Byline/AuthorDate"
import { Byline } from "../../Byline/Byline"
import { formatTime, getMediaDate } from "../../Constants"
import { Fonts } from "../../Fonts"
import { IconVideoPlay } from "../../Icon/IconVideoPlay"

interface Props {
  article?: any
  color?: string
  editing?: boolean
  editDate?: any
  editDescription?: any
  editTitle?: any
  editImage?: any
  series?: any
  tracking?: any
}

interface LinkProps extends Props, React.HTMLProps<HTMLLinkElement> {
  published: boolean
}

@track()
export class ArticleCard extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  isUnpublishedMedia() {
    const { media } = this.props.article
    return media && !media.published
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
    const { article, color, editDate } = this.props
    const { media } = article

    if (editDate) {
      return <MediaDate>{editDate}</MediaDate>
    } else if (media) {
      return this.renderMediaDate()
    } else {
      return <Byline article={article} color={color} layout="condensed" />
    }
  }

  renderMediaDate = () => {
    const { article } = this.props
    const mediaDate = getMediaDate(article)

    if (this.isUnpublishedMedia()) {
      return (
        <MediaDate>
          <span>Available </span>
          <Date format="monthYear" date={mediaDate} />
        </MediaDate>
      )
    } else {
      return <Date layout="condensed" date={mediaDate} />
    }
  }

  renderMediaCoverInfo = () => {
    const { article, color } = this.props

    if (this.isUnpublishedMedia()) {
      return <MediaComingSoon>Coming Soon</MediaComingSoon>
    } else {
      return (
        <MediaPlay>
          <IconVideoPlay color={color} />
          {formatTime(article.media.duration)}
        </MediaPlay>
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
      color,
      editDescription,
      editImage,
      editTitle,
      series,
    } = this.props
    const { media } = article
    const isUnpublishedMedia = this.isUnpublishedMedia()

    return (
      <ArticleCardContainer
        href={isUnpublishedMedia ? "" : article.slug}
        color={color}
        className="ArticleCard"
        published={!isUnpublishedMedia}
        onClick={this.openLink}
      >
        <TextContainer>
          <div>
            <Header>
              <div>{series && series.title}</div>
            </Header>
            <Title>
              {editTitle ? editTitle : article.thumbnail_title || article.title}
            </Title>
            <Description>
              {editDescription ? editDescription : article.description}
            </Description>
          </div>
          {this.renderDate()}
        </TextContainer>

        <ImageContainer>
          {editImage ? (
            editImage
          ) : (
            <Image
              src={crop(article.thumbnail_image, { width: 680, height: 450 })}
            />
          )}
          {media && this.renderMediaCoverInfo()}
        </ImageContainer>
      </ArticleCardContainer>
    )
  }
}

ArticleCard.defaultProps = {
  color: "black",
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.15s;
  display: block;
`

const ImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: inherit;
  margin-left: 30px;
  ${pMedia.md`
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
  `};
`

export const ArticleCardContainer = styled.a`
  display: block;
  border: 1px solid;
  border-radius: 2px;
  color: ${(props: LinkProps) => props.color};
  cursor: ${(props: LinkProps) => (props.published ? "pointer" : "default")};
  text-decoration: none;
  padding: 30px;
  display: flex;
  ${Image} {
    opacity: ${(props: LinkProps) => (props.published ? "1" : "0.7")};
  }
  &:hover {
    ${Image} {
      opacity: 0.7;
    }
  }
  ${ImageContainer} {
    background: ${(props: LinkProps) =>
      props.color === "white" ? "black" : "white"};
  }
  ${pMedia.md`
    flex-direction: column-reverse;
    padding: 20px;
  `};
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  margin-bottom: 5px;
  .author,
  .date {
    ${Fonts.unica("s16", "medium")};
  }
  ${pMedia.md`
    width: 100%;
    margin-bottom: 0;
  `};
`

const Title = styled.div`
  ${Fonts.unica("s45")};
  margin-bottom: 30px;
  ${pMedia.md`
    ${Fonts.unica("s32")}
  `};
`

const Header = styled.div`
  ${Fonts.unica("s16", "medium")};
  margin-bottom: 10px;
`

const Description = styled.div`
  ${Fonts.garamond("s23")};
  ${pMedia.md`
    ${Fonts.garamond("s19")}
    margin-bottom: 20px;
  `};
`

const MediaDate = styled.div`
  ${Fonts.unica("s16", "medium")} display: flex;
  align-items: flex-end;
  span {
    margin-right: 5px;
  }
`

const Media = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const MediaPlay = Media.extend`
  ${Fonts.unica("s16", "medium")} svg {
    width: 40px;
  }
  ${pMedia.md`
    svg {
      width: 30px;
    }
  `};
`

const MediaComingSoon = Media.extend`
  ${Fonts.unica("s45")};
  ${pMedia.md`
    ${Fonts.unica("s32")}
  `};
`
