import * as React from "react"

interface FullscreenViewerCaptionProps extends React.HTMLProps<HTMLDivElement> {
  caption?: string
  artwork?: any
}

interface FullscreenViewerCaptionState {
  open: boolean
}

class FullscreenViewerCaption extends React.Component<FullscreenViewerCaptionProps, FullscreenViewerCaptionState> {
  constructor(props) {
    super(props)
  }

  render() {
    const caption = this.props.caption ? <div>{this.props.caption}</div> : false
    return (
      <div>
        {caption}
      </div>
    )
  }
}

export default FullscreenViewerCaption
