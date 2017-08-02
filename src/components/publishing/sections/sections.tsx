import React from "react"
import styled, { StyledFunction } from "styled-components"
import Header from "../header/header"
import Authors from "./authors"
import Embed from "./embed"
import ImageCollection from "./image_collection"
import SectionContainer from "./section_container"
// import ImagesetPreview from "./imageset_preview"
import Text from "./text"
import Video from "./video"

import { pMedia } from "../../helpers"

interface SectionsProps {
  article: {
    layout?: string
    authors?: any
    sections: {}
  }
}

interface StyledSectionsProps {
  layout: string
}

const Sections: React.SFC<SectionsProps> = props => {
  const header = props.article.layout === "standard" ? <Header article={props.article} /> : false
  return (
    <StyledSections layout={props.article.layout}>
      {header}
      {renderSections(props.article)}
      {renderAuthors(props.article.authors)}
    </StyledSections>
  )
}

function renderSections(article) {
  const sections = article.sections
  const renderedSections = sections.map((section, i) => {
    switch (section.type) {
      case "image_collection":
        return (
          <SectionContainer key={i} layout={section.layout}>
            <ImageCollection images={section.images} targetHeight={500} gutter={10} />
          </SectionContainer>
        )
      // case "image_set":
      //   return (
      //     <SectionContainer key={i}>
      //       <ImagesetPreview
      //         images={section.images}
      //         layout={article.layout}
      //         type={section.type}
      //         title={section.title}
      //       />
      //     </SectionContainer>
      //   )
      case "video":
        return <SectionContainer key={i}><Video section={section} /></SectionContainer>
      case "embed":
        return <SectionContainer key={i} layout={section.layout}><Embed section={section} /></SectionContainer>
      case "text":
        return (
          <SectionContainer key={i} layout={section.layout}>
            <Text dangerouslySetInnerHTML={{ __html: section.body }} />
          </SectionContainer>
        )
      default:
        return false
    }
  })
  return renderedSections
}

function renderAuthors(authors) {
  if (authors) {
    return <SectionContainer><Authors authors={authors} /></SectionContainer>
  } else {
    return false
  }
}

const Div: StyledFunction<StyledSectionsProps> = styled.div

const StyledSections = Div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${props => (props.layout === "standard" ? "60px" : "80px")} auto;
  max-width: ${props => (props.layout === "standard" ? "780px" : "auto")};
  ${pMedia.sm`
    max-width: 100%;
    padding: 0px;
  `}
`

export default Sections
