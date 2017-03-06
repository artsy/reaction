import * as React from "react"

interface ModalProps extends React.HTMLProps<Modal> {
  show?: boolean
  onClose: () => void
}

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
    if (!this.props.show) {
      return null
    }
    return (
      <div>
         <div>
           {this.props.children}
         </div>
        <div onClick={this.close}>Click to Close</div>
      </div>
    )
  }
}

export default Modal
