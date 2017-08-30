import React from "react"
import sizeMe from "react-sizeme"
import styled from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import AuthorDate from "./author_date"

function renderFeatureAsset(url, layout, isMobile, title) {
  if (layout === "fullscreen") {
    return (
      <div>
        {renderAsset(url, title)}
        <Overlay />
      </div>
    )
  } else if (layout === "split" && !isMobile) {
    return renderAsset(url, title)
  } else {
    return false
  }
}

function renderMobileSplitAsset(url, layout, isMobile, title) {
  if (layout === "split" && isMobile) {
    return renderAsset(url, title)
  } else {
    return false
  }
}

function renderAsset(url, title) {
  if (isVideo(url)) {
    return (
      <FeatureVideoContainer>
        <FeatureVideo src={url} autoPlay controls={false} loop muted playsInline />
      </FeatureVideoContainer>
    )
  } else {
    return <FeatureImage src={url} alt={title} />
  }
}

function renderTextLayoutAsset(url, layout, title) {
  if (layout === "text") {
    if (isVideo(url)) {
      return <Video src={url} autoPlay controls={false} loop muted playsInline />
    } else {
      return <Image src={url} alt={title} />
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
  size?: {
    width: number
  }
}

const FeatureHeader: React.SFC<FeatureHeaderProps> = props => {
  const { article, size } = props
  const hero = article.hero_section
  const isMobile = size.width && size.width < 600 ? true : false
  return (
    <FeatureHeaderContainer data-type={hero.type}>
      {renderFeatureAsset(hero.url, hero.type, isMobile, article.title)}
      <HeaderTextContainer>
        <HeaderText>
          <Vertical>{article.vertical.name}</Vertical>
          {props.children[0]}
          {renderMobileSplitAsset(hero.url, hero.type, isMobile, article.title)}
          <SubHeader>
            {props.children[1]}
            <AuthorDate layout={hero.type} authors={article.contributing_authors} date={article.published_at} />
          </SubHeader>
        </HeaderText>
        {renderTextLayoutAsset(hero.url, hero.type, article.title)}
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
  width: 100vw;
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
  padding: 20px;
  box-sizing: border-box;
`
const Video = styled.video`
  width: 100vw;
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
const FeatureHeaderContainer = Div.extend`
  width: 100vw;
  height: 100vh;
  &[data-type='text'] {
    height: auto;
    .feature__title {
      margin-bottom: 150px;
    }
    ${HeaderText} {
      max-width: none;
    }
  }
  &[data-type='split'] {
    .feature__title {
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
    .feature__deck {
      margin-bottom: 30px;
    }
    ${pMedia.xs`
      .feature__title {
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
        width: 100vw;
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
  refreshRate: 64,
  refreshMode: "debounce",
}

export default sizeMe(sizeMeOptions)(FeatureHeader)
