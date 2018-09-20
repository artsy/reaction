import { color, Flex, Sans } from "@artsy/palette"
import { ModalWrapper } from "Components/Modal/ModalWrapper"
import React from "react"
import styled from "styled-components"

interface ErrorModalProps extends React.HTMLProps<HTMLDivElement> {
  show?: boolean
  headerText?: string
  detailText?: string
  closeText?: string
  onClose?: () => void
}

export class ErrorModal extends React.Component<ErrorModalProps> {
  static defaultProps = {
    headerText: "An error occurred",
    closeText: "Continue",
  }

  close = () => {
    this.props.onClose && this.props.onClose()
  }

  render() {
    const { show, onClose, headerText, detailText, closeText } = this.props

    return (
      <ModalWrapper show={show} onClose={onClose}>
        <Flex flexDirection="column" pt={2} px={2}>
          <Sans size="4" weight="medium" mb={10}>
            {headerText}
          </Sans>
          <Sans size="3" color="black60">
            {detailText || (
              <>
                Something went wrong. Please try again or contact{" "}
                <Link href="mailto:support@artsy.net">support@artsy.net</Link>.
              </>
            )}
          </Sans>
        </Flex>

        <Flex mt={1} justifyContent="flex-end" onClick={this.close}>
          <ModalButton>{closeText}</ModalButton>
        </Flex>
      </ModalWrapper>
    )
  }
}

// TODO: Generalize this button and move it to @artsy/palette
export const ModalButton = props => (
  <Sans
    p={2}
    size="3"
    color="purple100"
    weight="medium"
    style={{ cursor: "pointer" }}
    {...props}
  />
)

// TODO: Generalize this link and move it to @artsy/palette
const Link = styled.a`
  color: ${color("black60")};
`
