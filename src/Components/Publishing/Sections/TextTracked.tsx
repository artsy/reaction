import React from "react"
import { track } from "../../../Utils/track"
import { Text, TextProps } from "./Text"

@track()
export class TextTracked extends React.Component<TextProps, null> {
  render() {
    const { color, isContentStart, layout, postscript } = this.props

    return (
      <Text
        className="article__tracked-text-section"
        color={color}
        isContentStart={isContentStart}
        layout={layout}
        postscript={postscript}
      />
    )
  }
}
