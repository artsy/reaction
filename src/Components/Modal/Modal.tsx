import React from "react"
import { Spring } from "react-spring"
import styled, { injectGlobal } from "styled-components"

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
        isShown: nextProps.show,
        isAnimating: true,
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
    const { isAnimating, isShown } = this.state

    const animationStates = {
      from: {
        opacity: 0,
        transform: "translate(-50%,-40%)",
      },
      to: {
        opacity: 1,
        transform: "translate(-50%,-50%)",
      },
    }

    const transitions = isShown
      ? animationStates
      : { from: animationStates.to, to: animationStates.from }

    if (isShown) {
      this.addBlurToContainers()
    } else {
      this.removeBlurToContainers()
    }

    return (
      <div>
        <Spring
          {...transitions as any}
          onRest={() => {
            this.setState({ isAnimating: false })
          }}
        >
          {(styles: any) =>
            (isShown || isAnimating) && (
              <div>
                <Overlay
                  style={{ opacity: (styles || {}).opacity }}
                  onClick={this.close}
                  show={isShown}
                />
                <ModalContainer style={{ ...styles, ...this.props.style }}>
                  {children}
                </ModalContainer>
                <div />
              </div>
            )
          }
        </Spring>
      </div>
    )
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: #fff;
  width: 440px;
  border-radius: 4px;
  padding: 20px 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`

const Overlay = styled.div.attrs<{ show?: boolean }>({})`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9998;
  background: rgba(200, 200, 200, 0.5);
  opacity: 0;
  pointer-events: ${p => (p.show ? "inherit" : "none")};
`

export default Modal
