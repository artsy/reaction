import * as PropTypes from "prop-types"
import * as React from "react"
import styled from "styled-components"
import Colors from "../../../../assets/colors"
import { pMedia } from "../../../helpers"
import Fonts from "../../fonts"

interface FullscreenViewerCaptionProps extends React.HTMLProps<HTMLDivElement> {
  caption?: string
  artwork?: any
  total: number
  index: number
  open: boolean
}

const FullscreenViewerCaption: React.SFC<FullscreenViewerCaptionProps> = props => {
  return (
    <CaptionContainer>
      <CaptionTextContainer>
        <CaptionToggle open={props.open} />
        <Caption open={props.open} dangerouslySetInnerHTML={{ __html: props.caption }} />
      </CaptionTextContainer>
      <Index>{`${props.index} of ${props.total}`}</Index>
    </CaptionContainer>
  )
}

interface CaptionToggleProps extends React.Props<HTMLDivElement> {
  open: boolean
}
const CaptionToggle: React.SFC<CaptionToggleProps> = (props, context) => {
  const toggleMessage = props.open ? "Hide" : "View Caption"
  return (
    <StyledCaptionToggle onClick={context.onToggleCaption}>
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
const Caption = styled.div`
  ${Fonts.unica("s16", "medium")}
  ${pMedia.sm`
    ${Fonts.unica("s14", "medium")}
  `}
  ${pMedia.sm`
    display: ${props => (props.open ? "block" : "none")};
    margin-top: ${props => (props.open ? "20px" : "0px")};
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
    padding: 20px;
  `}
`
const CaptionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default FullscreenViewerCaption
