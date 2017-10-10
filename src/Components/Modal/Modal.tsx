import * as React from "react"
import styled from "styled-components"

interface ModalProps extends React.HTMLProps<Modal> {
  show?: boolean
  onClose: () => void
}

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  zIndex: 9999;
  background: #fff;
  width: 420px;
`

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  zIndex: 9998;
  background: rgba(0, 0, 0, 0.3);
`

class Modal extends React.Component<ModalProps, any> {
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
    const newProps: any = { ...this.props }
    delete newProps.onClose
    delete newProps.show

    if (!this.props.show) {
      return null
    }
    return (
      <div>
        <ModalContainer {...newProps}>
          {this.props.children}
        </ModalContainer>
        <Overlay onClick={this.close} />
      </div>
    )
  }
}

export default Modal
