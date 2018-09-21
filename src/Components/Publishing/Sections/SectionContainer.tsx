import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { ArticleLayout, SectionData } from "../Typings"

const ColumnWidth = "680px"
const OverflowWidth = "780px"
const BlockquoteWidth = "900px"
const Fillwidth = "100%"

export const SectionContainer = styled.div.attrs<{
  section?: SectionData
  articleLayout?: ArticleLayout
}>({})`
  box-sizing: border-box;
  display: flex;
  margin: auto;
  margin-bottom: 40px;
  width: ${props => getSectionWidth(props.section, props.articleLayout)};
  max-width: 100%;

  ${props => pMedia.xl`
    ${props.articleLayout === "standard" &&
      `
      width: ${ColumnWidth}
    `}
  `} ${props => pMedia.md`
    padding: ${getSectionMobilePadding(props.section)};
  `};
`

export const getSectionWidth = (
  section?: SectionData,
  articleLayout?: ArticleLayout
) => {
  const layout = (section && section.layout) || "column_width"
  const maybeOverflow =
    layout === "overflow_fillwidth" ? OverflowWidth : ColumnWidth
  const isText = section && section.type === "text"
  const isBlockquote = isText && section.body.includes("<blockquote>")

  switch (articleLayout) {
    case "standard": {
      return maybeOverflow
    }
    case "feature": {
      if (isBlockquote) {
        return BlockquoteWidth
      } else if (layout === "fillwidth") {
        return Fillwidth
      } else {
        return maybeOverflow
      }
    }
    default:
      return ColumnWidth
  }
}

export const getSectionMobilePadding = (section?: SectionData) => {
  const type = section && section.type
  const isFillWidth = ["video", "image_collection", "image_set"].includes(type)
  const isMiniImageSet = type === "image_set" && section.layout === "mini"

  return !isFillWidth || isMiniImageSet ? "0 20px" : 0
}
