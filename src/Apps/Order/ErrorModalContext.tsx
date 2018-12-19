import React from "react"

export interface ErrorModalProps {
  showErrorModal: (
    props: { title?: string; message?: string; ctaAction?: string }
  ) => void
}

export const ErrorModalContext = React.createContext<ErrorModalProps>({
  showErrorModal: null,
})
