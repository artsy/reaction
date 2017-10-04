import React from "react"
import sizeMe from "react-sizeme"
import styled from "styled-components"
import { resize } from "../../../utils/resizer"
import { pMedia } from "../../helpers"
import Byline from "../byline/byline"
import { sizeMeRefreshRate } from "../constants"
import Fonts from "../fonts"

function renderFeatureAsset(url, layout, isMobile, title, imageChild) {
  if (layout === "fullscreen") {
    return (
      <div>
        {renderAsset(url, title, imageChild)}
        <Overlay />
      </div>
    )
  } else if (layout === "split" && !isMobile) {
    return renderAsset(url, title, imageChild)
  } else {
    return false
  }
}

function renderMobileSplitAsset(url, layout, isMobile, title, imageChild) {
  if (layout === "split" && isMobile) {
    return renderAsset(url, title, imageChild)
  } else {
    return false
  }
}

function renderAsset(url, title, imageChild) {
  if (isVideo(url)) {
    return (
      <FeatureVideoContainer>
        {imageChild}
        <FeatureVideo src={url} autoPlay controls={false} loop muted playsInline />
      </FeatureVideoContainer>
    )
  } else {
    const src = url.length && resize(url, { width: 1600 })
    const alt = url.length ? title : ""
    return (
      <FeatureImage src={src} alt={alt}>
        {imageChild}
      </FeatureImage>
    )
  }
}

function renderTextLayoutAsset(url, layout, title, imageChild) {
  if (layout === "text") {
    if (isVideo(url)) {
      return (
        <TextAsset>
          {imageChild}
          <Video src={url} autoPlay controls={false} loop muted playsInline />
        </TextAsset>
      )
    } else {
      const alt = url.length ? title : ""
      const src = url.length && resize(url, { width: 1200 })
      const image = <Image src={src} alt={alt} />
      return (
        <TextAsset>
          {imageChild}
          {url.length && image}
        </TextAsset>
      )
    }
  } else {
    return false
  }
}

function isVideo(url) {
  return url.includes("mp4")
}

const renderDeck = deck => {
  return deck ? <Deck>{deck}</Deck> : false
}

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

const FeatureHeader: React.SFC<FeatureHeaderProps> = props => {
  const { article, vertical, title, deck, image, size, height } = props
  const hero = article.hero_section
  const isMobile = size.width && size.width < 600 ? true : false
  return (
    <FeatureHeaderContainer data-type={hero.type} height={height}>
      {renderFeatureAsset(hero.url, hero.type, isMobile, article.title, image)}
      <HeaderTextContainer>
        <HeaderText>
          <Vertical>{vertical}</Vertical>
          <Title>{title}</Title>
          {renderMobileSplitAsset(hero.url, hero.type, isMobile, article.title, image)}
          <SubHeader>
            {renderDeck(deck)}
            <Byline article={article} layout={hero.type} />
          </SubHeader>
        </HeaderText>
        {renderTextLayoutAsset(hero.url, hero.type, article.title, image)}
      </HeaderTextContainer>
    </FeatureHeaderContainer>
  )
}

FeatureHeader.defaultProps = {
  height: "100vh",
  size: {
    width: 500,
  },
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`
const Overlay = Div.extend`
  position: absolute;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.3));
`
const Vertical = styled.div`
  ${Fonts.unica("s16", "medium")}
  margin-bottom: 10px;
  ${pMedia.xs`
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
  box-sizing: border-box
`
const SubHeader = styled.div`
  ${Fonts.unica("s19", "medium")}
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  ${pMedia.xs`
    align-items: flex-start;
    flex-direction: column;
  `}
`
const Title = styled.div`
  ${Fonts.unica("s100")}
  margin-bottom: 75px;
  ${pMedia.lg`
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
  ${pMedia.xs`
    margin-bottom: 28px;
    ${Fonts.unica("s16")}
  `}
`
const FeatureHeaderContainer = Div.extend`
  width: 100%;
  height: ${props => props.height};
  &[data-type='text'] {
    height: auto;
    ${Title} {
      margin-bottom: 150px;
    }
  }
  &[data-type='split'] {
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
  &[data-type='fullscreen']{
    ${HeaderText} {
      padding: 50px;
      color: #fff;
      justify-content: flex-end;
      margin: auto;
      text-shadow: 0 0 40px rgba(0,0,0,0.4);
    }
    ${pMedia.xs`
      ${HeaderText} {
        padding: 20px;
      }
    `}
  }
`

const sizeMeOptions = {
  refreshRate: sizeMeRefreshRate,
  noPlaceholder: true,
}

export default sizeMe(sizeMeOptions)(FeatureHeader)
