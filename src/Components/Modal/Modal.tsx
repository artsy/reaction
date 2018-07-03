import React from "react"
import styled, { injectGlobal, keyframes } from "styled-components"
import FadeTransition from "../Animation/FadeTransition"

export interface ModalProps extends React.HTMLProps<Modal> {
  show?: boolean
  onClose?: () => void
  blurContainerSelector?: string
}
export interface ModalState {
  isAnimating: boolean
  isShown: boolean
  blurContainers: Element[]
}

injectGlobal`
  .blurred {
    filter: blur(50px);
  }
`

export class Modal extends React.Component<ModalProps, ModalState> {
  static defaultProps = {
    show: false,
    blurContainerSelector: "",
    style: {},
  }

  state = {
    isAnimating: this.props.show || false,
    isShown: this.props.show || false,
    blurContainers: this.props.blurContainerSelector
      ? Array.from(document.querySelectorAll(this.props.blurContainerSelector))
      : [],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({
        isAnimating: true,
        isShown: nextProps.show,
      })
    }
  }

  componentWillUnmount() {
    this.removeBlurToContainers()
  }

  close = e => {
    e.preventDefault()
    this.props.onClose()

    this.removeBlurToContainers()
  }

  addBlurToContainers = () => {
    for (let container of this.state.blurContainers) {
      container.classList.add("blurred")
    }
  }

  removeBlurToContainers = () => {
    for (let container of this.state.blurContainers) {
      container.classList.remove("blurred")
    }
  }

  render(): JSX.Element {
    const { children } = this.props
    const { isShown, isAnimating } = this.state

    if (isShown) {
      this.addBlurToContainers()
    } else {
      this.removeBlurToContainers()
    }

    return (
      <ModalWrapper isShown={isShown || isAnimating}>
        {isShown && <ModalOverlay onClick={this.close} />}
        <FadeTransition
          in={isShown}
          mountOnEnter
          onExited={() => {
            this.setState({ isAnimating: false })
          }}
          unmountOnExit
          timeout={{ enter: 10, exit: 200 }}
        >
          <ModalContainer>{children}</ModalContainer>
        </FadeTransition>
      </ModalWrapper>
    )
  }
}

const slideUp = keyframes`
  from {
    transform: translate(-50%,-40%);
    opacity: 0;
  },

  to {
    transform: translate(-50%,-50%);
    opacity: 1;
  }
`

const ModalWrapper = styled.div.attrs<{ isShown?: boolean }>({})`
  ${props =>
    props.isShown &&
    `
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999
  `};
`

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 440px;
  height: min-content;
  border-radius: 4px;
  padding: 20px 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  animation: ${slideUp} 250ms linear;
`

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(200, 200, 200, 0.5);
`

export default Modal
