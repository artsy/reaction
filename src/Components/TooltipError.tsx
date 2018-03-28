import React from "react"
import styled, { StyledFunction } from "styled-components"
import { fadeIn, fadeOut } from "../Assets/Animations"
import colors from "../Assets/Colors"

interface Props extends React.HTMLProps<HTMLDivElement> {
  message?: string
  hide?: boolean
}

const Div: StyledFunction<Props & React.HTMLProps<HTMLDivElement>> = styled.div

const TooltipContainerOld = Div`
  display: inline-block;
  position: relative;
  cursor: help;
  margin: 0 0.5em;
  width: 14px;
  height: 14px;
  margin-bottom: -2px;

  &:before {
    display: block;
    top: 0;
    left: 0;
    position: absolute;
    content: "";
    z-index: 2;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    line-height: 15px;
    text-align: center;
    vertical-align: middle;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: bold;
    color: white;
  }
  &:hover {
    &:before {
      visibility: hidden;
    }
    &:after {
      opacity: 1;
      z-index: 3;
      visibility: visible;
    }
  }
  &:after {
    display: block;
    top: 0;
    left: 0;
    position: absolute;
    visibility: hidden;
    text-align: left;
    z-index: 1;
    margin: -10px 0 0 -10px;
    width: 300px;
    color: ${colors.graySemibold};
    background-color: white;
    padding: 15px 15px 25px 15px;
    opacity: 0;
    margin: 0;
    line-height: 1.3;
    transform: translateZ(0);
    border: 1px solid ${colors.grayRegular};
    content: ${props => `"` + props.message + `"`};
  }
`
const Container = styled.div`
  visibility: hidden;
  background: cyan;
`
const SimpleTip = Div`
  width: 50px;
  height: 20px;
  position: absolute;
  background: #000;
  color: #fff;
  font-family: "Courier New", Courier, monospace;
  visibility: ${props => (props.hide ? "hidden" : "visible")};
  animation: ${props => (props.hide ? fadeOut : fadeIn)} 1.0s linear;
  :after {
    content: "${props => props.message}";
  }
`

export class TooltipError extends React.Component<Props, any> {
  static defaultProps = {
    hide: true,
  }

  constructor(props) {
    super(props)
    const initialHide =
      typeof props.hide === "undefined" ? !!props.message : props.hide
    this.state = {
      hide: initialHide,
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.message !== this.props.message) {
      console.log("got new message")
      this.setState({ hide: false })
    }
  }

  dismiss = e => {
    this.setState({ hide: true })
  }

  render() {
    return (
      <Container>
        <SimpleTip
          hide={this.state.hide}
          onClick={this.dismiss}
          message={this.props.message}
        />
      </Container>
      // <TooltipContainer
      //   message={this.props.message}
      //   className={this.props.className}
      // >
      //   {this.props.children}
      // </TooltipContainer>
    )
  }
}
