import { isFunction } from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import sizeMe from "react-sizeme"
import styled, { StyledFunction } from "styled-components"
import { fadeIn, fadeOut } from "../Assets/Animations"
import { secondary as secondaryFont } from "../Assets/Fonts"

interface Props extends React.HTMLProps<HTMLDivElement> {
  show?: boolean
  minWidth?: string
  anchorRef?: HTMLElement
  dismissOnClick?: boolean
  message?: (() => any) | string
}

interface State {
  anchorPosition?: any
  show: boolean
  message: any
}

export class Popover extends React.Component<Props, State> {
  public messageRef

  static defaultProps = {
    show: false,
    dismissOnClick: true,
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

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  dismiss = () => {
    this.setState({ show: false })
  }

  getAnchorPosition: (ref: any) => PositionProps = ref => {
    if (ref) {
      const anchor = ReactDOM.findDOMNode(ref)
      const rect = anchor.getBoundingClientRect()
      const { top, left, width, height } = rect
      return { width, left, top: top + height }
    }
  }

  getMessage = message => (isFunction(message) ? message() : message) || ""

  handleClick = e => {
    if (this.props.dismissOnClick) this.dismiss()
  }

  handleScroll = () => {
    const anchorPosition = this.getAnchorPosition(this.props.anchorRef)
    this.setState({ anchorPosition })
  }

  render() {
    return (
      <Container anchorPosition={this.state.anchorPosition}>
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

interface PositionProps {
  top: number
  left: number
  width: number
}

const Positionable: StyledFunction<
  { anchorPosition: PositionProps; size?: any } & Props &
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

const SizelessMessage = Positionable`
  position: absolute;
  top: 10px;
  left: ${({ anchorPosition, size }) =>
    anchorPosition && anchorPosition.width / 2 - size.width / 2}px;
  padding: 13px 15px;
  background: #000;
  color: #fff;
  ${props => secondaryFont.style};
  text-align: center;
  font-size: 15px;
  cursor: default;
  white-space: ${({ minWidth }) => (minWidth ? "normal" : "nowrap")};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  & span {
    cursor: pointer;
  }
`
const Message = sizeMe(sizeMeOptions)(SizelessMessage)
