import React, { Component  } from "react"
import styled, { StyledFunction } from "styled-components"
import { crop } from "../../../Utils/resizer"
import { pMedia } from "../../Helpers"
import { Byline } from '../Byline/Byline'
import { Fonts } from "../Fonts"
import { IconPlayCaret } from '../Icon/IconPlayCaret'

interface Props {
  article?: any,
  color?: string, 
  series?: any
}

export class ArticleCard extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render () {
    const { article, color, series } = this.props
    const { media } = article

    return (
      <ArticleCardContainer href={article.slug} color={color} className="ArticleCard">

        <TextContainer>
          <div>
            <Header>
              <div>{series.title}</div>
              {media &&
                <div>{media.duration}</div>
              }
            </Header>
            <Title>{article.title}</Title>
            <Description>{article.description}</Description>
          </div>
          <Byline
            article={article}
            color={color}
            layout='condensed'
          />
        </TextContainer>

        <ImageContainer>
          <Image src={crop(article.thumbnail_image, { width: 680, height: 450 })} />
          {media &&
            <VideoPlay><IconPlayCaret color={color} /></VideoPlay>
          }
        </ImageContainer>

      </ArticleCardContainer>
    )
  }
}

ArticleCard.defaultProps = {
  color: 'black'
}

const A: StyledFunction<Props & React.HTMLProps<HTMLLinkElement>> = styled.a
const Div: StyledFunction<Props & React.HTMLProps<HTMLDivElement>> = styled.div

const ArticleCardContainer = A`
  display: block;
  border: 1px solid;
  color: ${props => props.color};
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
  display: flex;
  margin-bottom: 10px;
  div {
    margin-right: 20px;
  }
`
const Description = styled.div`
  ${Fonts.garamond("s23")}
  ${props => pMedia.md`
    ${Fonts.garamond("s19")}
    margin-bottom: 20px;
  `}
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

const VideoPlay = Div`
  position: absolute;
  left: 20px; 
  bottom: 20px;
  width: 40px;
  ${props => pMedia.md`
    width: 30px;
  `}
`
