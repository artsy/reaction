import * as PropTypes from "prop-types"
import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../../assets/colors"
import { pMedia } from "../../../helpers"
import Fonts from "../../fonts"
import ArtworkCaption from "../artwork_caption"

interface FullscreenViewerCaptionProps extends React.HTMLProps<HTMLDivElement> {
  section?: any
  total: number
  index: number
  open: boolean
}

const FullscreenViewerCaption: React.SFC<FullscreenViewerCaptionProps> = props => {
  const caption = props.section.type === "artwork"
    ? <ArtworkCaption isFullscreenCaption artwork={props.section} linked />
    : <div dangerouslySetInnerHTML={{ __html: props.section.caption }} />
  const indexText = `${props.index} of ${props.total}`
  return (
    <CaptionContainer>
      <CaptionTextContainer>
        <CaptionToggle open={props.open} />
        <Caption open={props.open}>
          {caption}
        </Caption>
      </CaptionTextContainer>
      <Index>{indexText}</Index>
    </CaptionContainer>
  )
}

interface CaptionOpenProps extends React.HTMLProps<HTMLDivElement> {
  open: boolean
}
const CaptionToggle: React.SFC<CaptionOpenProps> = (props, context) => {
  const toggleMessage = props.open ? "Hide" : "View Caption"
  return (
    <StyledCaptionToggle onClick={context.onToggleCaption} className="fullscreen-viewer__caption-toggle">
      <span>{toggleMessage}</span>
    </StyledCaptionToggle>
  )
}
CaptionToggle.contextTypes = {
  onToggleCaption: PropTypes.func,
}
const StyledCaptionToggle = styled.div`
  display: none;
  ${pMedia.sm`
    ${Fonts.unica("s14", "medium")}
    cursor: pointer;
    display: inline-block;
    span {
      border-bottom: 1px solid black;
    }
  `}
`
const CaptionDiv: StyledFunction<CaptionOpenProps> = styled.div
const Caption = CaptionDiv`
  ${Fonts.unica("s16", "medium")}
  a {
    color: black;
  }
  ${props => pMedia.sm`
    ${Fonts.unica("s14", "medium")}
    display: ${props.open ? "block" : "none"};
    margin-top: ${props.open ? "20px" : "0px"};
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
const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${Colors.gray};
  padding: 30px 60px;
  p {
    margin: 0px;
  }
  ${pMedia.sm`
    position: absolute;
    bottom: 0;
    width: calc(100% - 40px);
    padding: 20px;
  `}
`
const CaptionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default FullscreenViewerCaption
