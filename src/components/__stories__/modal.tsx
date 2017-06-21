import { storiesOf } from "@storybook/react"
import * as React from "react"

import Button from "../buttons/default"
import Modal from "../modal/modal"
import ModalHeader from "../modal_header"
import Title from "../title"

const ModalStyle = {
  height: "500px",
  width: "500px",
}

class ModalDemo extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render(): JSX.Element {
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal style={ModalStyle} show={this.state.isModalOpen} onClose={this.closeModal}>
          <ModalHeader>
            <Title>This is a modal title</Title>
          </ModalHeader>
          <div>
            <p>This is modal contents</p>
            <hr/>
            <div>Even more contents</div>
          </div>
        </Modal>
      </div>
    )
  }
}

storiesOf("ModalDemo", ModalDemo)
  .add("ModalDemo", () => (
      <ModalDemo/>
  ))
