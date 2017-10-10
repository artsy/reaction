import React from "react"
import { Layout } from "../typings"
import StyledText from "./styled_text"

interface TextProps extends React.HTMLProps<HTMLDivElement> {
  layout: Layout
  postscript?: boolean
  html?: string
}

const Text: React.SFC<TextProps> = props => {
  const { html, layout, postscript } = props
  const child = html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : props.children
  return (
    <StyledText className="article__text-section" layout={layout} postscript={postscript}>
      {child}
    </StyledText>
  )
}
export default Text
