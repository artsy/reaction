import React from "react"
import Text from "./text"

interface TextContainerProps extends React.HTMLProps<HTMLDivElement> {
  layout: "classic" | "feature" | "standard"
  postscript?: boolean
  html?: string
}

const TextContainer: React.SFC<TextContainerProps> = props => {
  const { html, layout, postscript } = props
  const child = html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : props.children
  return (
    <Text layout={layout} postscript={postscript}>
      {child}
    </Text>
  )
}
export default TextContainer
