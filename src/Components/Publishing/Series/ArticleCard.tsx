import React, { Component } from "react"
import styled, { StyledFunction } from "styled-components"
import { crop } from "../../../Utils/resizer"
import { pMedia } from "../../Helpers"
import { Date } from '../Byline/AuthorDate'
import { Byline } from '../Byline/Byline'
import {
  formatTime,
  getMediaDate
} from "../Constants"
import { Fonts } from "../Fonts"
import { IconVideoPlay } from '../Icon/IconVideoPlay'

interface Props {
  article?: any
  color?: string
  editDescription?: any
  editTitle?: any
  editImage?: any
  series?: any
}

export class ArticleCard extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  isUnpublishedMedia () {
    const { media } = this.props.article
    return media && !media.published
  }

  renderMediaDate () {
    const { article } = this.props
    const mediaDate = getMediaDate(article)

    if (this.isUnpublishedMedia()) {
      return (
          <MediaDate>
            <span>Available </span>
            <Date layout='condensed' date={mediaDate} />
          </MediaDate>
      )
    } else {
      return <Date layout='condensed' date={mediaDate} />
    }
  }

  renderMediaCoverInfo () {
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

  openLink = (e) => {
    e.preventDefault()

    if (!this.isUnpublishedMedia()) {
      window.open(e.currentTarget.attributes.href.value)
    }
  }

  render () {
    const {
      article,
      color,
      editDescription,
      editImage,
      editTitle,
      series
    } = this.props
    const { media } = article
    const isUnpublishedMedia = this.isUnpublishedMedia()

    return (
      <ArticleCardContainer
        href={isUnpublishedMedia ? '' : article.slug}
        color={color}
        className="ArticleCard"
        published={!isUnpublishedMedia}
        onClick={this.openLink}
      >

        <TextContainer>
          <div>
            <Header>
              <div>{series.title}</div>
            </Header>
            <Title>
              {editTitle
                ? editTitle
                : article.thumbnail_title
              }
            </Title>
            <Description>
              {editDescription
                ? editDescription
                : article.description
              }
            </Description>
          </div>
          {media
            ?
              this.renderMediaDate()
            :
              <Byline
                article={article}
                color={color}
                layout='condensed'
              />
          }
        </TextContainer>

        <ImageContainer>
          {editImage}
          <Image
            src={crop(article.thumbnail_image, { width: 680, height: 450 })}
            style={{opacity: isUnpublishedMedia ? 0.7 : 1}}
          />
          {media && this.renderMediaCoverInfo()}
        </ImageContainer>

      </ArticleCardContainer>
    )
  }
}

ArticleCard.defaultProps = {
  color: 'black'
}

interface LinkProps {
  published: boolean
}

const A: StyledFunction<Props & LinkProps & React.HTMLProps<HTMLLinkElement>> = styled.a

export const ArticleCardContainer = A`
  display: block;
  border: 1px solid;
  color: ${props => props.color};
  cursor: ${props => props.published ? "pointer" : "default"};
  text-decoration: none;
  padding: 30px;
  display: flex;
  ${props => pMedia.md`
    flex-direction: column-reverse;
    padding: 20px;
  `}
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  margin-bottom: 5px;
  .author, .date {
    ${Fonts.unica("s16", "medium")}
  }
  ${props => pMedia.md`
    width: 100%;
    margin-bottom: 0;
  `}
`

const Title = styled.div`
  ${Fonts.unica("s45")}
  margin-bottom: 30px;
  ${props => pMedia.md`
    ${Fonts.unica("s32")}
  `}
`

const Header = styled.div`
  ${Fonts.unica("s16", "medium")}
  margin-bottom: 10px;
`

const Description = styled.div`
  ${Fonts.garamond("s23")}
  ${props => pMedia.md`
    ${Fonts.garamond("s19")}
    margin-bottom: 20px;
  `}
`

const MediaDate = styled.div`
  ${Fonts.unica("s16", "medium")}
  display: flex;
  align-items: flex-end;
  span {
    margin-right: 5px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  margin-left: 30px;
  ${props => pMedia.md`
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
  `}
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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
  ${Fonts.unica("s16", "medium")}
  svg {
    width: 40px;
  }
  ${props => pMedia.md`
    svg {
      width: 30px;
    }
  `}
`

const MediaComingSoon = Media.extend`
  ${Fonts.unica("s45")}
  ${props => pMedia.md`
    ${Fonts.unica("s32")}
  `}
`
