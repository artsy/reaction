import React from "react"
import { animated, Spring } from "react-spring"
import styled from "styled-components"

export interface ModalProps extends React.HTMLProps<Modal> {
  show?: boolean
  onClose?: () => void
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
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  opacity: 0;
`

export class Modal extends React.Component<ModalProps, any> {
  static defaultProps = {
    show: false,
  }

  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
  }

  close(e) {
    e.preventDefault()
    this.props.onClose()
  }

  render(): JSX.Element {
    const { children, show } = this.props

    const transitions = show
      ? {
          from: { opacity: 0, transform: "translate(-50%,-40%)" },
          to: { opacity: 1, transform: "translate(-50%,-50%)" },
        }
      : { from: { opacity: 1 }, to: { opacity: 0 } }

    return (
      <div>
        <Spring {...transitions as any}>
          {(styles: any) => (
            <animated.div>
              <Overlay
                style={{ opacity: styles.opacity }}
                onClick={this.close}
                show={show}
              />
              <ModalContainer style={{ ...styles }}>{children}</ModalContainer>
              <div />
            </animated.div>
          )}
        </Spring>
      </div>
    )
  }
}

export default Modal
