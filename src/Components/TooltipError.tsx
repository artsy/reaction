import React from "react"
import styled, { StyledFunction } from "styled-components"
import { fadeIn, fadeOut } from "../Assets/Animations"
import colors from "../Assets/Colors"

interface Props extends React.HTMLProps<HTMLDivElement> {
  // message?: string
  hide?: boolean
  maxWidth?: string
  adjustTop?: string
}

const Div: StyledFunction<Props & React.HTMLProps<HTMLDivElement>> = styled.div

const Container = Div`
  position: relative;
  top: ${props => props.adjustTop};
  // display: inline-block;
`

const Tip = Div`
  position: absolute;
  display: ${props => (props.hide ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  visibility: ${props => (props.hide ? "hidden" : "visible")};
  z-index: 1000;
  // justify-content: center;
`

const Arrow = Div`
  width: 0;
  height: 0;
  border-bottom: 10px solid #000;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  max-width: ${props => props.maxWidth};
  // width: 12px;
  // height: 12px;
  // transform: rotate(-45deg);
  // background: #000;
`

const Message = Div`
  padding: 13px 15px;
  background: #000;
  color: #fff;
  font-family: "Courier New", Courier, monospace;
  cursor: default;
  animation: ${props => (props.hide ? fadeOut : fadeIn)} 1.0s linear;
  & span {
    cursor: pointer;
  }
`

export class TooltipError extends React.Component<Props, any> {
  static defaultProps = {
    hide: true,
    adjustTop: "0px",
    maxWidth: "300px",
  }

  // Hide by default unless props.hide === false && there is a message.
  constructor(props) {
    super(props)
    const message = this.getMessage(props)
    const hide = props.hide === true || message
    this.state = {
      hide,
      message,
    }
  }

  // Unhide the tip if there is new info to display.
  componentWillReceiveProps(nextProps: Props) {
    const newMessage = this.getMessage(nextProps)
    if (newMessage && newMessage !== this.state.message) {
      this.setState({ hide: false, message: newMessage })
    }
  }

  dismiss = e => {
    this.setState({ hide: true })
  }

  getMessage = props =>
    (typeof props.children === "function"
      ? props.children()
      : props.children) || ""

  render() {
    return (
      <Container adjustTop={this.props.adjustTop}>
        <Tip hide={this.state.hide}>
          <Arrow />
          <Message onClick={this.dismiss}>{this.state.message}</Message>
        </Tip>
      </Container>
    )
  }
}

// const TooltipContainerOld = Div`
//   display: inline-block;
//   position: relative;
//   cursor: help;
//   margin: 0 0.5em;
//   width: 14px;
//   height: 14px;
//   margin-bottom: -2px;

//   &:before {
//     display: block;
//     top: 0;
//     left: 0;
//     position: absolute;
//     content: "";
//     z-index: 2;
//     width: 14px;
//     height: 14px;
//     border-radius: 50%;
//     line-height: 15px;
//     text-align: center;
//     vertical-align: middle;
//     font-family: sans-serif;
//     font-size: 12px;
//     font-weight: bold;
//     color: white;
//   }
//   &:hover {
//     &:before {
//       visibility: hidden;
//     }
//     &:after {
//       opacity: 1;
//       z-index: 3;
//       visibility: visible;
//     }
//   }
//   &:after {
//     display: block;
//     top: 0;
//     left: 0;
//     position: absolute;
//     visibility: hidden;
//     text-align: left;
//     z-index: 1;
//     margin: -10px 0 0 -10px;
//     width: 300px;
//     color: ${colors.graySemibold};
//     background-color: white;
//     padding: 15px 15px 25px 15px;
//     opacity: 0;
//     margin: 0;
//     line-height: 1.3;
//     transform: translateZ(0);
//     border: 1px solid ${colors.grayRegular};
//     content: ${props => `"` + props.message + `"`};
//   }
// `
