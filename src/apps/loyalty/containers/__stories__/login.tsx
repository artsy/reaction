import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"
import * as Relay from "react-relay"

import Button from "../../../../components/buttons/default"
import Modal from "../../../../components/modal/modal"
import ModalHeader from "../../../../components/modal_header"
import Title from "../../../../components/title"

import Login from "../login"

storiesOf("Login Page", Login)
  .add("no modal", () => (
    <Login form={{url: "/"}} />
  ))
  .add("w/ modal", () => {
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
              <Login form={{url: "/"}} />
            </Modal>
          </div>
        )
      }
    }

    return (
      <ModalDemo />
    )
  })
