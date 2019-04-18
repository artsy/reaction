import { Link, QuestionCircleIcon, Serif, Spacer } from "@artsy/palette"
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
    const linkHref =
      "https://www.artsy.net/article/artsy-editorial-artworks-prices"
    return (
      <>
        <Modal
          onClose={this.closeModal}
          show={this.state.isModalOpen}
          title="Price in context"
          cta={{
            text: "Got it",
            onClick: this.closeModal,
            isFixed: false,
          }}
        >
          <Spacer mt={2} />
          <Serif size="3" color={"black80"}>
            This feature aims to provide insight into the range of prices for an
            artist's works and allow buyers to discover other available works by
            the artist at different price points.
          </Serif>
          <Spacer mt={2} />
          <Serif size="3" color={"black80"}>
            The graph displays current and past list prices for works that are
            similar in size and category to the work you're viewing. The prices
            included in the graph are only from galleries and dealers on Artsy.
          </Serif>
          <Serif size="3" color={"black80"}>
            Artwork prices are affected by{" "}
            <Link href={linkHref}>
              a variety of objective and subjective factors
            </Link>{" "}
            including the artist's relative position in the art market and the
            artwork's size, condition, rarity, and subject matter. These factors
            are unique to every artwork. As such, this feature is not intended
            to provide pricing guidance for the artwork being viewed.
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
