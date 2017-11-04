import React from "react"
import styled from "styled-components"
import { resize } from "../../../Utils/resizer"
import { Responsive } from '../../../Utils/Responsive'
import { track } from "../../../Utils/track"
import { pMedia } from "../../Helpers"
import Icon from "../../Icon"
import { Byline } from "../Byline/Byline"
import { Fonts } from "../Fonts"
import { isValidVideoUrl } from '../Sections/Video'
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
  if (isValidVideoUrl(url)) {
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
  isMobile: boolean
  size?: {
    width: number
  }
}

@track()
class FeatureHeaderComponent extends React.Component<FeatureHeaderProps, any> {
  static defaultProps = {
    height: "calc(100vh - 50px)"
  }

  @track(props => ({
    action: "Click",
    label: "Clicked primary partner logo",
    impression_type: "sa_primary_logo",
    destination_path: props.article.super_article.partner_logo_link,
    context_type: "article_fixed"
  }))
  onClickPartnerLink() {
    // noop
  }

  render() {
    const { article, vertical, title, deck, image, height, isMobile: passedIsMobile } = this.props
    const hero = article.hero_section
    const url = hero && hero.url || ""
    const type = hero && hero.type || "text"

    if (type === 'basic') {
      return (
        <BasicHeader
          article={article}
          vertical={vertical}
          title={title}
          isMobile={passedIsMobile}
        />
      )
      // Fullscreen, Text, Split
    } else {
      return (
        <Responsive initialState={{ isMobile: passedIsMobile }}>
          {({ isMobile }) => (
            <FeatureHeaderContainer data-type={type} height={height}>
              {renderFeatureAsset(url, type, isMobile, article.title, image)}
              <HeaderTextContainer>
                {article.is_super_article &&
                  renderSuperArticleLogos(article.super_article, isMobile, this.onClickPartnerLink)}
                <HeaderText>
                  <Vertical>{vertical}</Vertical>
                  <Title>{title}</Title>
                  {renderMobileSplitAsset(url, type, isMobile, article.title, image)}
                  <SubHeader>
                    {renderDeck(deck)}
                    <Byline article={article} layout={type} />
                  </SubHeader>
                </HeaderText>
                {renderTextLayoutAsset(url, type, article.title, image)}
              </HeaderTextContainer>
            </FeatureHeaderContainer>
          )}
        </Responsive>
      )
    }
  }
}

function renderSuperArticleLogos(superArticle, isMobile, onClickPartnerLink) {
  const partnerLogo = superArticle.partner_fullscreen_header_logo || superArticle.partner_logo

  return (
    <SuperArticleLogos>
      <a href="/">
        <Icon
          name="logotype"
          fontSize={isMobile ? "30px" : "45px"}
          color="white"
        />
      </a>
      {partnerLogo &&
        <SuperArticlePartnerLogo>
          <SuperArticleLogoDivider>
            <Icon
              name="close"
              fontSize={isMobile ? "15px" : "20px"}
              color="white" />
          </SuperArticleLogoDivider>
          <a
            href={superArticle.partner_logo_link}
            target="_blank"
            onClick={onClickPartnerLink}
          >
            <img
              src={partnerLogo}
              height={isMobile ? "32px" : "50px"}
            />
          </a>
        </SuperArticlePartnerLogo>
      }
    </SuperArticleLogos>
  )
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`
const Overlay = Div.extend`
  position: absolute;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
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
const SuperArticleLogos = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 1;
  padding: 45px 45px 50px;
  ${pMedia.xs`
    padding: 20px 15px 20px;
  `}
`
const SuperArticlePartnerLogo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  margin-top: 16px;
  ${pMedia.xs`
    padding-bottom: 10px;
    margin-top: 11px;
  `}
`

const SuperArticleLogoDivider = styled.div`
  transform: rotate(45deg);
  margin: 0 20px;
  ${pMedia.xs`
    margin: 0 10px;
  `}
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
  position: relative;
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
    ${pMedia.sm`
      ${HeaderText} {
        padding: 20px;
      }
    `}
  }
`

export const FeatureHeader = FeatureHeaderComponent

// FIXME: Reeimplment below refactor once the heat is off....
// import { get } from 'lodash'
// import React from "react"
// import styled, { StyledFunction } from "styled-components"
// import { resize } from "../../../Utils/resizer"
// import { Responsive } from '../../../Utils/Responsive'
// import { pMedia as breakpoint } from "../../Helpers"
// import Icon from "../../Icon"
// import { Byline } from "../Byline/Byline"
// import { Fonts } from "../Fonts"
// const IMAGE_QUALITY: number = 60
// interface FeatureHeaderProps {
//   article?: any
//   deck?: any
//   height?: string
//   image?: any
//   isMobile?: boolean
//   title: any
//   size?: {
//     width: number
//   }
//   vertical?: any
// }
// interface DivProps extends React.HTMLProps<HTMLDivElement> {
//   height?: string
//   src?: string
// }
// const FeatureHeaderComponent: React.SFC<FeatureHeaderProps> = props => {
//   const { article, vertical, title, deck, image, height, isMobile: passedIsMobile } = props
//   const hero = article.hero_section
//   const url = get(hero, "url", "")
//   const type = get(hero, "type", "text")
//   // Video / Image / Text
//   const Asset = () => renderAsset(type)(url, article.title, image)
//   return (
//     <Responsive initialState={{ isMobile: passedIsMobile }}>
//       {({ isMobile }) => {
//         const isFullScreenLayout = type === 'fullscreen'
//         const isDesktopSplitLayout = type === 'split' && !isMobile
//         const isMobileSplitLayout = type === "split" && isMobile
//         const isTextLayout = type === 'text'
//         return (
//           <FeatureHeaderContainer data-type={type} height={height}>
//             {isFullScreenLayout &&
//               <div>
//                 <Asset />
//                 <Overlay />
//               </div>}
//             {isDesktopSplitLayout &&
//               <Asset />}
//             <HeaderTextContainer>
//               {article.is_super_article &&
//                 renderSuperArticleLogos(article.super_article, isMobile)}
//               <HeaderText>
//                 <Vertical>
//                   {vertical}
//                 </Vertical>
//                 <Title>
//                   {title}
//                 </Title>
//                 {isMobileSplitLayout &&
//                   <Asset />}
//                 <SubHeader>
//                   {deck &&
//                     <Deck>
//                       {deck}
//                     </Deck>}
//                   <Byline
//                     article={article}
//                     layout={type}
//                   />
//                 </SubHeader>
//               </HeaderText>
//               {isTextLayout &&
//                 <Asset />}
//             </HeaderTextContainer>
//           </FeatureHeaderContainer>
//         )
//       }}
//     </Responsive>
//   )
// }
// FeatureHeaderComponent.defaultProps = {
//   height: "100vh",
//   size: {
//     width: 1024,
//   },
// }
// // Helpers
// function renderAsset(type: string) {
//   const isTextType = type === 'text'
//   let Layout
//   let Player
//   let ImageW
//   if (isTextType) {
//     Layout = TextAsset
//     Player = Video
//     ImageW = Image
//   } else {
//     Layout = FeatureVideoContainer
//     Player = FeatureVideo
//     ImageW = FeatureImage
//   }
//   return (url: string, title: string, image: any) => {
//     const isVideo = url.includes("mp4")
//     if (isVideo) {
//       return (
//         <Layout>
//           {image}
//           <Player autoPlay loop muted playsInline
//             src={url}
//             controls={false}
//           />
//         </Layout>
//       )
//       // Text
//     } else {
//       const hasImage = url.length
//       if (hasImage) {
//         const src = resize(url, {
//           width: 1600,
//           quality: IMAGE_QUALITY
//         })
//         if (isTextType) {
//           return (
//             <TextAsset>
//               {image}
//               <ImageW
//                 src={src}
//                 alt={title}
//               />
//             </TextAsset>
//           )
//         } else {
//           return (
//             <ImageW src={src} alt={title}>
//               {image}
//             </ImageW>
//           )
//         }
//         // Error: Missing image
//       } else {
//         console.error(
//           '(@artsy/reaction) FeatureHeader: ',
//           'Error rendering Asset: missing image.'
//         )
//         return (
//           <TextAsset>
//             {image}
//           </TextAsset>
//         )
//       }
//     }
//   }
// }
// function renderSuperArticleLogos(superArticle, isMobile) {
//   return (
//     <SuperArticleLogos>
//       <a href="/">
//         <Icon
//           name="logotype"
//           fontSize={isMobile ? "30px" : "45px"}
//           color="white"
//         />
//       </a>
//       <SuperArticleLogoDivider>
//         <Icon
//           name="close"
//           fontSize={isMobile ? "15px" : "25px"}
//           color="white"
//         />
//       </SuperArticleLogoDivider>
//       <a
//         href={superArticle.partner_logo_link}
//         target="_blank">
//         <img
//           src={superArticle.partner_fullscreen_header_logo || superArticle.partner_logo}
//           height={isMobile ? "32px" : "50px"}
//         />
//       </a>
//     </SuperArticleLogos>
//   )
// }
// // Styles
// const Div = styled.div`
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
// `
// const DivWithProps: StyledFunction<DivProps> = Div.extend
// const Overlay = Div.extend`
//   position: absolute;
//   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
// `
// const Vertical = styled.div`
//   ${Fonts.unica("s16", "medium")}
//   margin-bottom: 10px;
//   ${breakpoint.sm`
//     ${Fonts.unica("s14", "medium")}
//   `}
// `
// const HeaderTextContainer = Div.extend`
//   margin: auto;
//   // display: flex;
//   // flex-direction: column;
//   // justify-content: space-between;
// `
// const HeaderText = Div.extend`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   padding: 20px;
//   color: #000;
//   justify-content: flex-start;
// `
// const FeatureImage = DivWithProps`
//   position: absolute;
//   background-image: url(${props => (props.src || "")});
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
//   right: 0;
//   width: 100%;
// `
// const FeatureVideo = styled.video`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `
// const FeatureVideoContainer = Div.extend`
//   width: 100%;
//   height: 100%;
//   right: 0;
//   position: absolute;
//   overflow: hidden;
// `
// const Image = styled.img`
//   width: 100%;
//   height: auto;
//   box-sizing: border-box;
// `
// const Video = styled.video`
//   width: 100%;
// `
// const TextAsset = styled.div`
//   width: 100%;
//   padding: 20px;
//   box-sizing: border-box;
// `
// const SubHeader = styled.div`
//   ${Fonts.unica("s19", "medium")}
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-end;
//   flex-direction: row;
//   ${breakpoint.sm`
//     align-items: flex-start;
//     flex-direction: column;
//   `}
//       `
// const Title = styled.div`
//   ${Fonts.unica("s100")}
//   margin-bottom: 75px;
//   letter-spacing: -0.035em;
//   ${breakpoint.xl`
//     ${Fonts.unica("s80")}
//   `}
//   ${breakpoint.md`
//     ${Fonts.unica("s65")}
//   `}
//   ${breakpoint.xs`
//     ${Fonts.unica("s45")}
//   `}
// `
// const Deck = styled.div`
//   max-width: 460px;
//   margin-right: 30px;
//   line-height: 1.4em;
//   ${Fonts.unica("s16", "medium")}
//   ${breakpoint.sm`
//     margin-bottom: 28px;
//     ${Fonts.unica("s14", "medium")}
//   `}
// `
// const FeatureHeaderContainer = DivWithProps`
//   width: 100%;
//   height: ${props => props.height};
//   &[data-type="text"] {
//     height: auto;
//     ${Title} {
//       margin-bottom: 150px;
//     }
//   }
//   &[data-type="split"] {
//     ${Title} {
//       flex-grow: 1;
//     }
//     ${HeaderText} {
//       width: 50%;
//     }
//     ${FeatureImage} {
//       width: 50%;
//       border: 20px solid white;
//     }
//     ${FeatureVideoContainer} {
//       width: 50%;
//       border: 20px solid white;
//     }
//     ${FeatureVideo} {
//       width: 50vw;
//     }
//     ${SubHeader} {
//       align-items: flex-start;
//       flex-direction: column;
//     }
//     ${Deck} {
//         margin-bottom: 30px;
//     }
//     ${breakpoint.xs`
//       ${Title} {
//         margin-bottom: 20px;
//         flex-grow: 0;
//       }
//       ${HeaderText} {
//         width: 100%;
//       }
//       ${FeatureImage} {
//         width: 100%;
//         height: 50%;
//         position: relative;
//         border: 0px;
//         margin-bottom: 30px;
//       }
//       ${FeatureVideoContainer} {
//         width: 100%;
//         height: 50%;
//         position: relative;
//         border: 0px;
//         margin-bottom: 30px;
//       }
//       ${FeatureVideo} {
//         width: 100%;
//       }
//     `}
//   }
//   &[data-type="fullscreen"] {
//     ${HeaderText} {
//       padding: 50px;
//       color: #fff;
//       justify-content: flex-end;
//       margin: auto;
//       text-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
//     }
//     ${breakpoint.xs`
//       ${HeaderText} {
//         padding: 20px;
//       }
//     `}
//   }
// `
// const SuperArticleLogos = styled.div`
//   display: flex;
//   align-items: center;
//   z-index: 1;
//   padding: 50px 45px 50px;
//   ${breakpoint.xs`
//     padding: 20px 15px 20px;
//   `}
// `
// const SuperArticleLogoDivider = styled.div`
//   transform: rotate(45deg);
//   margin: 0 20px;
//   ${breakpoint.xs`
//     margin: 0 10px;
//   `}
// `
// // TODO: Fix component name
// export const FeatureHeader = FeatureHeaderComponent
