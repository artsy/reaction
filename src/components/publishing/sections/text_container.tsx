import React from "react"
import Text from "./text"

interface TextContainerProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
  html?: string
}

const TextContainer: React.SFC<TextContainerProps> = props => {
  const { html, layout } = props
  const formattedText = <div dangerouslySetInnerHTML={{ __html: html }} />
  const child = html ? formattedText : props.children
  return (
    <Text layout={layout}>
      {child}
    </Text>
  )
}
export default TextContainer
