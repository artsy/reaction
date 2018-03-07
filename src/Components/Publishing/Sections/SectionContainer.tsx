import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { Layout } from "../Typings"

interface SectionContainerProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
  articleLayout?: Layout
  type?: string
}

const Div: StyledFunction<SectionContainerProps> = styled.div

const chooseWidth = (layout, articleLayout, media = null) => {
  if (layout) {
    // Standard Desktop
    if (media && media === "lg" && articleLayout === "standard") {
      return "680px"
    }

    // Blockquote
    if (
      layout === "blockquote" &&
      ["feature", "standard"].includes(articleLayout)
    ) {
      const sectionWidth = articleLayout === "feature" ? "900px" : "780px"
      return sectionWidth

      // Overflow Blockquote
    } else if (layout === "overflow_fillwidth" || layout === "blockquote") {
      return "780px"

      // Fillwidth
    } else if (layout === "fillwidth") {
      return "100%"
    }
  }
  return "680px"
}

const chooseMobilePadding = type => {
  switch (type) {
    case "author":
    case "blockquote":
    case "text":
    case "image_set":
    case "mini": // imageset layout
      return "0 20px"
    default:
      return "0"
  }
}

export const SectionContainer = Div`
  box-sizing: border-box;
  display: flex;
  width: ${props => chooseWidth(props.layout, props.articleLayout)};
  margin: auto;
  margin-bottom: 40px;
  ${props => pMedia.xl`
    width: ${chooseWidth(props.layout, props.articleLayout, "lg")};
  `}
  ${props => pMedia.md`
    width: 100%;
    padding: ${chooseMobilePadding(props.layout || props.type)};
    margin: 0 0 40px 0;
  `}
`
