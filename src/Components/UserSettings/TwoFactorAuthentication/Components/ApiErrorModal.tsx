import { Modal, Sans } from "@artsy/palette"
import React from "react"
import { ApiError } from "../ApiError"

interface ApiErrorModalProps {
  errors: ApiError[]
  onClose: () => void
  show?: boolean
}

export const ApiErrorModal: React.FC<ApiErrorModalProps> = props => {
  const { errors, onClose, show } = props

  const errorMessage = errors.map(error => error.message).join("\n")

  return (
    <Modal
      forcedScroll={false}
      title="An error occurred"
      show={show}
      onClose={onClose}
    >
      <Sans color="black60" textAlign="center" size="3t">
        {errorMessage}
      </Sans>
    </Modal>
  )
}
