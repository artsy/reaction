import { get } from 'lodash'
import React from "react"
import styled from "styled-components"
import { resize } from "../../../Utils/resizer"
import { pMedia } from "../../Helpers"
import { Byline } from "../Byline/Byline"
import { Fonts } from "../Fonts"

const IMAGE_QUALITY: number = 60

interface FeatureHeaderProps {
  article?: any
  vertical?: any
  title: any
  deck?: any
  image?: any
  height?: string
  size?: {
    width: number
  }
}

const FeatureHeaderComponent: React.SFC<FeatureHeaderProps> = props => {
  const { article, vertical, title, deck, image, size, height } = props
  const hero = article.hero_section
  const url = get(hero, "url", "")
  const type = get(hero, "type", "text")
  const isMobile = size.width < 600

  // Layouts
  const isFullScreenLayout = type === 'fullscreen'
  const isDesktopSplitLayout = type === 'split' && !isMobile
  const isMobileSplitLayout = type === "split" && isMobile
  const isTextLayout = type === 'text'

  return (
    <FeatureHeaderContainer data-type={type} height={height}>
      {isFullScreenLayout &&
        <div>
          {renderAsset(type)(url, article.title, image)}
          <Overlay />
        </div>}

      {isDesktopSplitLayout &&
        renderAsset(type)(url, article.title, image)}

      <HeaderTextContainer>
        <HeaderText>
          <Vertical>
            {vertical}
          </Vertical>

          <Title>
            {title}
          </Title>

          {isMobileSplitLayout &&
            renderAsset(type)(url, article.title, image)}

          <SubHeader>
            {deck &&
              <Deck>
                {deck}
              </Deck>}

            <Byline
              article={article}
              layout={type}
            />
          </SubHeader>
        </HeaderText>

        {isTextLayout &&
          renderAsset(type)(url, article.title, image)}

      </HeaderTextContainer>
    </FeatureHeaderContainer>
  )
}

FeatureHeaderComponent.defaultProps = {
  height: "100vh",
  size: {
    width: 500,
  },
}

// Helpers

function renderAsset(type: string): Function {
  const isTextType = type === 'text'

  let Layout
  let Player
  let ImageW

  if (isTextType) {
    Layout = TextAsset
    Player = Video
    ImageW = Image
  } else {
    Layout = FeatureVideoContainer
    Player = FeatureVideo
    ImageW = FeatureImage
  }

  return (url: string, title: string, image: any) => {
    const isVideo = url.includes("mp4")

    if (isVideo) {
      return (
        <Layout>
          {image}

          <Player autoPlay loop muted playsInline
            src={url}
            controls={false}
          />
        </Layout>
      )
    } else {
      const hasImage = url.length

      if (hasImage) {
        const src = resize(url, {
          width: 1600,
          quality: IMAGE_QUALITY
        })

        if (isTextType) {
          return (
            <TextAsset>
              {image}

              <ImageW
                src={src}
                alt={title}
              />
            </TextAsset>
          )
        } else {
          return (
            <ImageW src={src} alt={title}>
              {image}
            </ImageW>
          )
        }
      }
    }
  }
}

// Styles

const Div = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`
const Overlay = Div.extend`
  position: absolute;

  // TODO: This seems to visually exacerbate the load time; do we need?
  // background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
`
const Vertical = styled.div`
  ${Fonts.unica("s16", "medium")}
  margin-bottom: 10px;
  ${pMedia.sm`
    ${Fonts.unica("s14", "medium")}
  `}
`
const HeaderTextContainer = Div.extend`
  margin: auto;
`
const HeaderText = Div.extend`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  color: #000;
  justify-content: flex-start;
`
const FeatureImage = Div.extend`
  position: absolute;
  background-image: url(${props => (props.src ? props.src : "")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  right: 0;
  width: 100%;
`
const FeatureVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const FeatureVideoContainer = Div.extend`
  width: 100%;
  height: 100%;
  right: 0;
  position: absolute;
  overflow: hidden;
`
const Image = styled.img`
  width: 100%;
  height: auto;
  box-sizing: border-box;
`
const Video = styled.video`
  width: 100%;
`
const TextAsset = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`
const SubHeader = styled.div`
  ${Fonts.unica("s19", "medium")}
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  ${pMedia.sm`
    align-items: flex-start;
    flex-direction: column;
  `}
`
const Title = styled.div`
  ${Fonts.unica("s100")}
  margin-bottom: 75px;
  letter-spaceing: -0.035em;
  ${pMedia.xl`
    ${Fonts.unica("s80")}
  `}
  ${pMedia.md`
    ${Fonts.unica("s65")}
  `}
  ${pMedia.xs`
    ${Fonts.unica("s45")}
  `}
`
const Deck = styled.div`
  max-width: 460px;
  margin-right: 30px;
  ${Fonts.unica("s16", "medium")}
  line-height: 1.4em;
  ${pMedia.sm`
    margin-bottom: 28px;
    ${Fonts.unica("s14", "medium")}
  `}
`
const FeatureHeaderContainer = Div.extend`
  width: 100%;
  height: ${props => props.height};
  &[data-type="text"] {
    height: auto;
    ${Title} {
      margin-bottom: 150px;
    }
  }
  &[data-type="split"] {
    ${Title} {
      flex-grow: 1;
    }
    ${HeaderText} {
      width: 50%;
    }
    ${FeatureImage} {
      width: 50%;
      border: 20px solid white;
    }
    ${FeatureVideoContainer} {
      width: 50%;
      border: 20px solid white;
    }
    ${FeatureVideo} {
      width: 50vw;
    }
    ${SubHeader} {
      align-items: flex-start;
      flex-direction: column;
    }
    ${Deck} {
      margin-bottom: 30px;
    }
    ${pMedia.xs`
      ${Title} {
        margin-bottom: 20px;
      }
      ${HeaderText} {
        width: 100%;
      }
      ${FeatureImage} {
        width: 100%;
        position: relative;
        border: 0px;
        margin-bottom: 30px;
      }
      ${FeatureVideoContainer} {
        width: 100%;
        position: relative;
        border: 0px;
        margin-bottom: 30px;
      }
      ${FeatureVideo} {
        width: 100%;
      }
    `}
  }
  &[data-type="fullscreen"] {
    ${HeaderText} {
      padding: 50px;
      color: #fff;
      justify-content: flex-end;
      margin: auto;
      text-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
    }
    ${pMedia.xs`
      ${HeaderText} {
        padding: 20px;
      }
    `}
  }
`

// TODO: Fix this naming ref
export const FeatureHeader = FeatureHeaderComponent
