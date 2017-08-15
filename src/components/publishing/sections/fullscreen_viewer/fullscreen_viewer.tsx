import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import Icon from "../../../icon"
import Slides from "./slides"

interface FullscreenViewerProps extends React.HTMLProps<HTMLDivElement> {
  sections: any
}

interface FullscreenViewerState {
  open: boolean
  activeIndex: number
}

class FullscreenViewer extends React.Component<FullscreenViewerProps, FullscreenViewerState> {
  constructor(props) {
    super(props)
  }

  close = () => {
    console.log("closing")
  }

  next = () => {
    const newActiveIndex = this.state.activeIndex === this.props.sections.length - 1 ? this.state.activeIndex + 1 : 0
    this.setState({ activeIndex: newActiveIndex })
  }

  prev = () => {
    const newActiveIndex = this.state.activeIndex === 0 ? this.props.sections.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: newActiveIndex })
  }

  render() {
    return (
      <FullscreenViewerContainer>
        <NavArrow direction="left">
          <Icon name="chevron-left" color="black" fontSize="24px" />
        </NavArrow>
        <Slides sections={this.props.sections} />
        <Close onClick={this.close}>
          <Icon name="close" color="gray" fontSize="24px" />
        </Close>
        <NavArrow direction="right">
          <Icon name="chevron-right" color="black" fontSize="24px" />
        </NavArrow>
      </FullscreenViewerContainer>
    )
  }
}

const FullscreenViewerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
`
const Close = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px;
  cursor: pointer;
`
interface NavArrowProps extends React.HTMLProps<HTMLDivElement> {
  direction: string
}
const div: StyledFunction<NavArrowProps> = styled.div
const NavArrow = div`
  position: absolute;
  height: 100vh;
  display: flex;
  align-items: center;
  ${props => (props.direction === "left" ? "left: 0px;" : "")}
  ${props => (props.direction === "right" ? "right: 0px;" : "")}
`
export default FullscreenViewer
