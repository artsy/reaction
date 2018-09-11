import { color, Sans } from "@artsy/palette"
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
        <ErrorModalInner>
          <Sans size="4" weight="medium" mb={10}>
            {headerText}
          </Sans>
          {detailText ? (
            <Sans size="3" color="black60" mb={30}>
              {detailText}
            </Sans>
          ) : (
            <Sans size="3" color="black60" mb={30}>
              Something went wrong. Please try again or contact{" "}
              <Link href="mailto:support@artsy.net">support@artsy.net</Link>.
            </Sans>
          )}

          <Dismiss onClick={this.close}>
            <Sans size="3" color="purple100" weight="medium">
              {closeText}
            </Sans>
          </Dismiss>
        </ErrorModalInner>
      </ModalWrapper>
    )
  }
}

const Link = styled.a`
  color: ${color("black60")};
`

const ErrorModalInner = styled.div`
  padding: 20px;
`

export const Dismiss = styled.div`
  text-align: right;
  &:hover {
    cursor: pointer;
  }
`
