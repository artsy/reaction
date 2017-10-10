import { storiesOf } from "@storybook/react"
import * as React from "react"

import Button from "../../../../Components/Buttons/Default"
import Modal from "../../../../Components/Modal/Modal"

import Login from "../Login"

storiesOf("Login Page", module).add("no modal", () => <Login form={{ url: "/" }} />).add("w/ modal", () => {
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
          <Modal show={this.state.isModalOpen} onClose={this.closeModal}>
            <Login form={{ url: "/" }} />
          </Modal>
        </div>
      )
    }
  }

  return <ModalDemo />
})
