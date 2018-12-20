import React from "react"

export type ShowErrorModal = (
  props: { title?: string; message?: string; ctaAction?: string }
) => void
export interface ErrorModalContext {
  showErrorModal: ShowErrorModal
}

export const ErrorModalContext = React.createContext<ErrorModalContext>({
  showErrorModal() {
    console.error("No error modal context in render tree")
  },
})
