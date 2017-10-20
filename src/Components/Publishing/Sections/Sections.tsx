import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { Layout } from "../Typings"
import { Authors } from "./Authors"
import { Embed } from "./Embed"
import { ImageCollection } from "./ImageCollection"
import { ImageSetPreview } from "./ImageSetPreview"
import { SectionContainer } from "./SectionContainer"
import { Text } from "./Text"
import { Video } from "./Video"

interface SectionsProps {
  article: {
    layout: Layout
    authors?: any
    postscript?: string
  }
}

interface StyledSectionsProps {
  layout: string
}

export const Sections: React.SFC<SectionsProps> = props => {
  return (
    <StyledSections layout={props.article.layout}>
      {renderSections(props.article)}
      {renderPostScript(props.article)}
      {renderAuthors(props.article.authors)}
    </StyledSections>
  )
}

function renderSections(article) {
  const renderedSections = article.sections.map((section, i) => {
    const child = getSection(section, article.layout)

    if (child) {
      return (
        <SectionContainer key={i} layout={section.layout} articleLayout={article.layout}>
          {child}
        </SectionContainer>
      )
    }
  })
  return renderedSections
}

function getSection(section, layout) {
  const sections = {
    image_collection: (
      <ImageCollection
        sectionLayout={section.layout}
        images={section.images}
        targetHeight={500}
        gutter={10}
      />
    ),
    image_set: <ImageSetPreview section={section} />,
    video: <Video section={section} />,
    embed: <Embed section={section} />,
    text: <Text html={section.body} layout={layout} />,
    default: false,
  }
  return sections[section.type] || sections["default"]
}

function renderAuthors(authors) {
  if (authors) {
    return (
      <SectionContainer>
        <Authors authors={authors} />
      </SectionContainer>
    )
  } else {
    return false
  }
}

function renderPostScript(article) {
  if (article.postscript) {
    return (
      <SectionContainer>
        <Text html={article.postscript} layout={article.layout} postscript={article.postscript ? true : false} />
      </SectionContainer>
    )
  }
}

const chooseMargin = layout => {
  if (layout === "standard") {
    return "0;"
  } else if (layout === "feature") {
    return "80px auto 0 auto;"
  }
}

const Div: StyledFunction<StyledSectionsProps> = styled.div

const StyledSections = Div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${props => chooseMargin(props.layout)}
  max-width: ${props => (props.layout === "standard" ? "780px" : "auto")};
  ${props => pMedia.xl`
    max-width: ${props.layout === "standard" ? "680px" : "auto"};
    margin: ${props.layout === "standard" ? "auto" : "80px auto 0 auto"};
  `}
  ${props => pMedia.md`
    max-width: ${props.layout === "standard" ? "780px" : "auto"};
  `}
`
