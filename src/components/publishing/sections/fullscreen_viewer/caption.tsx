import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../../assets/colors"
import { pMedia } from "../../../helpers"
import Fonts from "../../fonts"

interface FullscreenViewerCaptionProps extends React.HTMLProps<HTMLDivElement> {
  caption?: string
  artwork?: any
  total: number
  index: number
}

const FullscreenViewerCaption: React.SFC<FullscreenViewerCaptionProps> = props => {
  return (
    <CaptionContainer>
      <CaptionToggle />
      <Caption dangerouslySetInnerHTML={{ __html: this.props.caption }} />
      <Index>{`${this.props.index} of ${this.props.total}`}</Index>
    </CaptionContainer>
  )
}

const CaptionToggle = (props, context) => {
  const toggleMessage = context.captionOpen ? "Hide" : "View Caption"
  return (
    <div>
      {toggleMessage}
    </div>
  )
}

const Caption = styled.div`
  ${Fonts.unica("s16", "medium")}
  ${pMedia.sm`
    ${Fonts.unica("s14", "medium")}
  `}
`
const Index = styled.div`
  margin-left: 20px;
  white-space: nowrap;
  ${Fonts.unica("s16")}
  ${pMedia.sm`
    ${Fonts.unica("s14")}
  `}
`
interface CaptionContainerProps {
  open: boolean
}
const div: StyledFunction<CaptionContainerProps & React.HTMLProps<HTMLDivElement>> = styled.div
const CaptionContainer = div`
  display: flex;
  justify-content: space-between;
  background-color: ${Colors.gray};
  padding: 30px 60px;
  p {
    margin: 0px;
  }
  ${pMedia.sm`
    padding: 20px;
  `}
`

export default FullscreenViewerCaption
