import React from "react"
import sizeMe from "react-sizeme"
import styled from "styled-components"
import { resize } from "../../../utils/resizer"
import { pMedia } from "../../helpers"
import AuthorDate from "../author_date"
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
    const src = url.length && resize(url, { width: 1200 })
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

interface FeatureHeaderProps {
  article?: any
  vertical?: any
  title: any
  deck?: any
  image?: any
  size?: {
    width: number
  }
}

const FeatureHeader: React.SFC<FeatureHeaderProps> = props => {
  const { article, vertical, title, deck, image, size } = props
  const hero = article.hero_section
  const isMobile = size.width && size.width < 600 ? true : false
  return (
    <FeatureHeaderContainer data-type={hero.type}>
      {renderFeatureAsset(hero.url, hero.type, isMobile, article.title, image)}
      <HeaderTextContainer>
        <HeaderText>
          <Vertical>{vertical}</Vertical>
          <Title>{title}</Title>
          {renderMobileSplitAsset(hero.url, hero.type, isMobile, article.title, image)}
          <SubHeader>
            <Deck>{deck}</Deck>
            <AuthorDate layout={hero.type} authors={article.contributing_authors} date={article.published_at} />
          </SubHeader>
        </HeaderText>
        {renderTextLayoutAsset(hero.url, hero.type, article.title, image)}
      </HeaderTextContainer>
    </FeatureHeaderContainer>
  )
}

FeatureHeader.defaultProps = {
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
  background-color: black;
  opacity: 0.17;
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
  max-width: 1250px;
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
  height: 100vh;
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
`
const SubHeader = styled.div`
  ${Fonts.unica("s19", "medium")}
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  ${pMedia.xs`
    align-items: flex-start;
    flex-direction: column;
  `}
`
const Title = styled.div`
  ${Fonts.unica("s100")}
  margin-bottom: 75px;
  ${pMedia.md`
    ${Fonts.unica("s80")}
  `}
  ${pMedia.xs`
    ${Fonts.unica("s45")}
  `}
`
const Deck = styled.div`
  max-width: 460px;
  ${pMedia.xs`
    margin-bottom: 28px;
    ${Fonts.unica("s16")}
  `}
`

const FeatureHeaderContainer = Div.extend`
  width: 100%;
  height: 100vh;
  &[data-type='text'] {
    height: auto;
    ${Title} {
      margin-bottom: 150px;
    }
    ${HeaderText} {
      max-width: none;
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
