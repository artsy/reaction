import React from "react"
import StyledText from "./styled_text"

interface TextProps extends React.HTMLProps<HTMLDivElement> {
  layout: "classic" | "feature" | "standard"
  postscript?: boolean
  html?: string
}

const Text: React.SFC<TextProps> = props => {
  const { html, layout, postscript } = props
  const child = html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : props.children
  return (
    <StyledText layout={layout} postscript={postscript}>
      {child}
    </StyledText>
  )
}
export default Text
