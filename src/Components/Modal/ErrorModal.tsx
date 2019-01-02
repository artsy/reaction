import { Link } from "@artsy/palette"
import React from "react"
import { ModalDialog } from "./ModalDialog"

interface ErrorModalProps {
  show?: boolean
  headerText?: string
  detailText?: string
  contactEmail?: string // Used in default detailText if none is specified.
  closeText?: string
  onClose?: () => void
  ctaAction?: () => void
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
    const {
      show,
      onClose,
      headerText,
      detailText,
      contactEmail,
      closeText,
      ctaAction,
    } = this.props
    const emailAddress = contactEmail ? contactEmail : "support@artsy.net"

    return (
      <ModalDialog
        show={show}
        onClose={onClose}
        heading={headerText}
        detail={
          detailText || (
            <>
              Something went wrong. Please try again or contact{" "}
              <Link href={`mailto:${emailAddress}`}>{emailAddress}</Link>.
            </>
          )
        }
        primaryCta={{
          action: ctaAction || onClose,
          text: closeText,
        }}
      />
    )
  }
}
