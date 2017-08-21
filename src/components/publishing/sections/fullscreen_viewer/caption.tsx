import * as React from "react"
import styled from "styled-components"
import Fonts from "../../fonts"

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
    return (
      <CaptionContainer>
        <Caption dangerouslySetInnerHTML={{ __html: this.props.caption }} />
      </CaptionContainer>
    )
  }
}

const Caption = styled.div`
  ${Fonts.unica("s19")}
`
const CaptionContainer = styled.div`
  height: 100px;
  width: 100vw;
`

export default FullscreenViewerCaption
