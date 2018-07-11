import { Sans } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import React from "react"
import track from "react-tracking"
import styled from "styled-components"
import { resize } from "../../../Utils/resizer"
import { ResponsiveDeprecated } from "../../../Utils/ResponsiveDeprecated"
import { pMedia } from "../../Helpers"
import { Byline } from "../Byline/Byline"
import { PartnerInline } from "../Partner/PartnerInline"
import {
  Vertical,
  VerticalOrSeriesTitle,
} from "../Sections/VerticalOrSeriesTitle"
import { BasicHeader } from "./BasicHeader"

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
        <FeatureVideo
          src={url}
          autoPlay
          controls={false}
          loop
          muted
          playsInline
        />
      </FeatureVideoContainer>
    )
  } else {
    const src = url.length && resize(url, { width: 1600 })

    return <FeatureImage src={src}>{imageChild}</FeatureImage>
  }
}

function renderTextLayoutAsset(url, layout, title, imageChild) {
  if (layout === "text") {
    if (isVideo(url)) {
      return (
        <TextAsset>
          {imageChild}
          <video
            src={url}
            autoPlay
            controls={false}
            loop
            muted
            playsInline
            width="100%"
          />
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
  date?: string
  vertical?: any
  title: any
  deck?: any
  image?: any
  height?: string
  isMobile: boolean
  size?: {
    width: number
  }
}

@track()
class FeatureHeaderComponent extends React.Component<FeatureHeaderProps, any> {
  static defaultProps = {
    height: "calc(100vh - 50px)",
  }

  @track(props => ({
    action: "Click",
    label: "Clicked primary partner logo",
    impression_type: "sa_primary_logo",
    destination_path: props.article.super_article.partner_logo_link,
    context_type: "article_fixed",
  }))
  onClickPartnerLink() {
    // noop
  }

  render() {
    const {
      article,
      date,
      vertical,
      title,
      deck,
      image,
      height,
      isMobile: passedIsMobile,
    } = this.props
    const { hero_section } = article
    const url = (hero_section && hero_section.url) || ""
    const type = (hero_section && hero_section.type) || "text"

    if (type === "basic") {
      return (
        <BasicHeader
          article={article}
          vertical={vertical}
          title={title}
          isMobile={passedIsMobile}
          date={date && date}
          deck={deck}
        />
      )
      // Fullscreen, Text, Split
    } else {
      const { super_article } = article

      return (
        // FIXME: Replace with new version of Responsive
        <ResponsiveDeprecated initialState={{ isMobile: passedIsMobile }}>
          {({ isMobile }) => (
            <FeatureHeaderContainer data-type={type} height={height}>
              {renderFeatureAsset(url, type, isMobile, article.title, image)}
              <HeaderTextContainer>
                {article.is_super_article && (
                  <PartnerInline
                    logo={
                      super_article.partner_fullscreen_header_logo ||
                      super_article.partner_logo
                    }
                    url={super_article.partner_logo_link}
                    color={"white"}
                  />
                )}
                <HeaderText>
                  <VerticalOrSeriesTitle
                    article={article}
                    vertical={vertical}
                    color="white"
                  />
                  <Title>{title}</Title>
                  {renderMobileSplitAsset(
                    url,
                    type,
                    isMobile,
                    article.title,
                    image
                  )}
                  <SubHeader>
                    {deck && (
                      <Deck size="3t" weight="medium">
                        {deck}
                      </Deck>
                    )}
                    <Byline
                      article={article}
                      layout={type}
                      date={date && date}
                    />
                  </SubHeader>
                </HeaderText>
                {renderTextLayoutAsset(url, type, article.title, image)}
              </HeaderTextContainer>
            </FeatureHeaderContainer>
          )}
        </ResponsiveDeprecated>
      )
    }
  }
}

interface DivProps {
  height?: string
  src?: string
}

const Overlay = styled.div`
  position: absolute;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3)
  );
`
const HeaderTextContainer = styled.div`
  margin: auto;
  height: 100%;
  .PartnerInline {
    position: absolute;
    z-index: 1;
    padding: 45px 45px 50px;
  }
  ${Vertical} {
    margin-bottom: 10px;
  }
  ${pMedia.xs`
    .PartnerInline {
      padding: 20px 15px 20px;
    }
  `};
`
const HeaderText = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  color: #000;
  justify-content: flex-start;
`
const FeatureImage = styled.div.attrs<DivProps>({})`
  position: absolute;
  background-image: url(${props => (props.src ? props.src : "")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  right: 0;
  width: 100%;
  height: 100%;
`
const FeatureVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const FeatureVideoContainer = styled.div`
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
const TextAsset = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`
const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  ${pMedia.sm`
    align-items: flex-start;
    flex-direction: column;
  `};
`
const Title = styled.div`
  ${unica("s100")};
  margin-bottom: 75px;
  letter-spacing: -0.035em;
  ${pMedia.xl`
    ${unica("s80")}
  `} ${pMedia.md`
    ${unica("s65")}
  `} ${pMedia.xs`
    ${unica("s45")}
  `};
`
const Deck = Sans.extend`
  max-width: 460px;
  margin-right: 30px;
  ${pMedia.sm`
    margin-bottom: 28px;
  `};
`
const FeatureHeaderContainer = styled.div.attrs<DivProps>({})`
  width: 100%;
  position: relative;
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
      border: 20px solid white;
      width: 50%;
    }
    ${FeatureVideoContainer} {
      border: 20px solid white;
      width: 50%;
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
    `};
  }

  &[data-type="fullscreen"] {
    ${HeaderText} {
      padding: 50px;
      color: #fff;
      justify-content: flex-end;
      margin: auto;
      text-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
    }
    ${pMedia.sm`
      ${HeaderText} {
        padding: 20px;
      }
    `};
  }
`

export const FeatureHeader = FeatureHeaderComponent
