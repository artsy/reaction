import { QuestionCircleIcon, Serif, Spacer } from "@artsy/palette"
import Modal from "Components/Modal/Modal"
import React from "react"

interface State {
  isModalOpen?: boolean
}

export class PricingContextModal extends React.Component<State> {
  state = {
    isModalOpen: false,
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <>
        <Modal
          onClose={this.closeModal}
          show={this.state.isModalOpen}
          title="Pricing distribution"
          cta={{
            text: "Got it",
            onClick: this.closeModal,
            isFixed: false,
          }}
        >
          <Spacer mt={2} />
          <Serif size="3" color={"black80"}>
            This information represents retail prices for works on Artsy, sold
            and listed. This does not represent auction data.
          </Serif>
          <Spacer mt={2} />
          <Serif size="3" color={"black80"}>
            We display a price distribution on works to provide contextual
            information about options you have to purchase works at price points
            that make the most sense for you.
          </Serif>
          <Spacer mt={2} />
        </Modal>
        <QuestionCircleIcon
          ml="5px"
          width="15px"
          onClick={this.openModal.bind(this)}
        />
      </>
    )
  }
}
