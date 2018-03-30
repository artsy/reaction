import React from "react"
import ReactDOM from "react-dom"
import sizeMe from "react-sizeme"
import styled, { StyledFunction } from "styled-components"
import { fadeIn, fadeOut } from "../Assets/Animations"

interface Props extends React.HTMLProps<HTMLDivElement> {
  show?: boolean
  maxWidth?: string
  minWidth?: string
  anchorRef?: HTMLElement
  dismissOnClick?: boolean
  message?: (() => any) | string
  // dismissOnTimeout?: boolean
}

interface PositionProps {
  top: number
  left: number
  width: number
}

const Positionable: StyledFunction<
  { anchorPosition: PositionProps; ownWidth?: number; size?: any } & Props &
    React.HTMLProps<HTMLDivElement>
> =
  styled.div

const sizeMeOptions = {
  monitorWidth: true,
}

const Container = Positionable`
  position: fixed;
  top: ${({ anchorPosition }) => anchorPosition && anchorPosition.top}px;
  left: ${({ anchorPosition }) => anchorPosition && anchorPosition.left}px;
  `

const Tip = Positionable`
  position: absolute;
  display: ${props => (props.show ? "block" : "none")};
  visibility: ${props => (props.show ? "visible" : "hidden")};
  animation: ${props => (props.show ? fadeIn : fadeOut)} 1s linear;
  z-index: 1000;
  `

const Arrow = Positionable`
  width: 0;
  height: 0;
  border-bottom: 10px solid #000;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  left: ${({ anchorPosition }) =>
    anchorPosition && anchorPosition.width / 2 - 10}px;
`
// or:
// width: 12px;
// height: 12px;
// transform: rotate(-45deg);
// background: #000;

// ${/*props => (props.size && console.log(props.size)) ||*/ ""}
// ${/*props => (props.anchorPosition && console.log(props.anchorPosition)) ||*/ ""}
const SizelessMessage = Positionable`
  position: absolute;
  top: 10px;
  left: ${({ anchorPosition, size }) =>
    anchorPosition && anchorPosition.width / 2 - size.width / 2}px;
  padding: 13px 15px;
  background: #000;
  color: #fff;
  font-family: "Courier New", Courier, monospace;
  cursor: default;
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  & span {
    cursor: pointer;
  }
`
const Message = sizeMe(sizeMeOptions)(SizelessMessage)

export class Popover extends React.Component<Props, any> {
  public messageRef

  static defaultProps = {
    show: false,
    dismissOnClick: true,
    minWidth: "200px",
  }

  constructor(props) {
    super(props)
    const message = this.getMessage(props.message)
    const show = props.show && message
    const anchorPosition = this.getAnchorPosition(props.anchorRef)
    this.state = {
      show,
      message,
      anchorPosition,
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const newMessage = this.getMessage(nextProps.message)
    const show = nextProps.show && newMessage
    const anchorPosition = this.getAnchorPosition(nextProps.anchorRef)
    this.setState({
      show,
      message: newMessage,
      anchorPosition,
    })
  }

  getAnchorPosition: (ref: any) => PositionProps = ref => {
    if (ref) {
      const anchor = ReactDOM.findDOMNode(ref)
      const rect = anchor.getBoundingClientRect()
      const { top, left, width, height } = rect
      return { width, left, top: top + height }
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => {
    const anchorPosition = this.getAnchorPosition(this.props.anchorRef)
    this.setState({ anchorPosition })
  }

  getMessage = message =>
    (typeof message === "function" ? message() : message) || ""

  dismiss = () => {
    this.setState({ show: false })
  }

  handleClick = e => {
    if (this.props.dismissOnClick) this.dismiss()
  }

  render() {
    return (
      <Container
        maxWidth={this.props.maxWidth}
        minWidth={this.props.minWidth}
        anchorPosition={this.state.anchorPosition}
      >
        <Tip show={this.state.show} anchorPosition={this.state.anchorPosition}>
          <Arrow anchorPosition={this.state.anchorPosition} />
          <Message
            ref={r => (this.messageRef = r)}
            anchorPosition={this.state.anchorPosition}
            onClick={this.props.dismissOnClick ? this.dismiss : () => null}
            minWidth={this.props.minWidth}
          >
            {this.state.message}
          </Message>
        </Tip>
      </Container>
    )
  }
}
