import { Box, Sans, Serif } from "@artsy/palette"
import Modal from "Components/Modal/Modal"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import { ArtworkSidebarClassification_artwork } from "__generated__/ArtworkSidebarClassification_artwork.graphql"

export interface ArtworkSidebarClassificationProps {
  artwork: ArtworkSidebarClassification_artwork
}

export class ArtworkSidebarClassification extends React.Component<
  ArtworkSidebarClassificationProps,
  any
> {
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

  render() {
    const { artwork } = this.props
    if (!artwork.attribution_class) {
      return null
    }
    return (
      <React.Fragment>
        <Modal
          onClose={this.closeModal}
          show={this.state.isModalOpen}
          title="Artwork classifications"
          cta={{
            text: "ok",
            onClick: () => this.closeModal(),
            isFixed: false,
          }}
        >
          <ClassificationDetails />
        </Modal>
        <Box pt={2} color="black60" textAlign="left">
          <Serif size="2">
            <ClassificationLink onClick={this.openModal}>
              {artwork.attribution_class.short_description}
            </ClassificationLink>.
          </Serif>
        </Box>
      </React.Fragment>
    )
  }
}

export const ArtworkSidebarClassificationFragmentContainer = createFragmentContainer(
  ArtworkSidebarClassification,
  graphql`
    fragment ArtworkSidebarClassification_artwork on Artwork {
      attribution_class {
        short_description
      }
    }
  `
)

const ClassificationLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`

const ClassificationDetails = () => {
  const classificationOptions = [
    {
      name: "Unique",
      long_description: "One of a kind piece, created by the artist.",
    },
    {
      name: "Limited edition",
      long_description: [
        "Original works created in multiple with direct involvement of the artist.",
        "Generally, less than 150 pieces total.",
      ].join(" "),
    },
    {
      name: "Made-to-order",
      long_description:
        "A piece that is made-to-order, taking into account the collector’s preferences.",
    },
    {
      name: "Reproduction",
      long_description: [
        "Reproduction of an original work authorized by artist’s studio or estate.",
        "The artist was not directly involved in production.",
      ].join(" "),
    },
    {
      name: "Editioned multiple",
      long_description: [
        "Pieces created in larger limited editions, authorized by the artist’s studio or estate.",
        "Not produced with direct involvement of the artist.",
      ].join(" "),
    },
    {
      name: "Non-editioned multiple",
      long_description: [
        "Works made in unlimited or unknown numbers of copies, authorized by the artist’s studio or estate.",
        "Not produced with direct involvement of the artist.",
      ].join(" "),
    },
    {
      name: "Ephemera",
      long_description: [
        "Items related to the artist, created or manufactured for a specific, limited use.",
        "This includes exhibition materials, memorabilia, autographs, etc.",
      ].join(" "),
    },
  ]

  return (
    <>
      <Box mt={1} mb={3}>
        {classificationOptions.map(option => {
          return (
            <React.Fragment key={option.name}>
              <Serif size="3" weight="semibold">
                {option.name}
              </Serif>
              <Serif size="3" mb={2}>
                {option.long_description}
              </Serif>
            </React.Fragment>
          )
        })}
      </Box>
      <Sans size="2" color="black60" mb={3}>
        Our partners are responsible for providing accurate classification
        information for all works.
      </Sans>
    </>
  )
}
