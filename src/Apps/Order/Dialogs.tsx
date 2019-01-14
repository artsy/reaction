import { Link } from "@artsy/palette"
import { ModalDialog, ModalDialogProps } from "Components/Modal/ModalDialog"
import React from "react"
import { Container, Subscribe } from "unstated"

interface DialogState {
  props: ModalDialogProps
  onForceClose: () => Promise<void>
}

export class DialogContainer extends Container<DialogState> {
  state: DialogState = {
    props: {
      show: false,
      heading: null,
      detail: null,
      primaryCta: {
        text: "",
        action: () => void 0,
      },
    },
    onForceClose: () => Promise.resolve(),
  }

  /**
   * Hides the the currently-showing dialog
   */
  hide = () => {
    this.setState({ props: { ...this.state.props, show: false } })
  }

  /**
   * @param props the props for the ModalDialog
   * @param onForceClose if someone else shows a modal while yours is open this
   * will be called before your modal is closed. It can return a promise if you
   * need to do async stuff before the next modal is shown.
   * @returns a promise that is resolved after your modal is shown
   */
  show = async ({
    props,
    onForceClose,
  }: {
    props: ModalDialogProps
    onForceClose: () => any
  }) => {
    if (this.state.props.show) {
      // need to gracefully allow existing modal to close
      await Promise.resolve(this.state.onForceClose())
      this.hide()
      // give a little pause so the user can see a transition between the two
      await new Promise(r => setTimeout(r, 400))
    }

    return new Promise(resolve => {
      this.setState({ props, onForceClose }, resolve)
    })
  }

  showErrorDialog = ({
    title = "An error occurred",
    supportEmail = "orders@artsy.net",
    message = (
      <>
        Something went wrong. Please try again or contact{" "}
        <Link href={`mailto:${supportEmail}}`}>{supportEmail}</Link>.
      </>
    ),
    continueButtonText = "Continue",
  }: {
    title?: string
    message?: React.ReactNode
    supportEmail?: string
    continueButtonText?: string
  }): Promise<void> => {
    return new Promise<void>(resolve => {
      const onContinue = () => {
        this.hide()
        resolve()
      }

      this.show({
        props: {
          show: true,
          heading: title,
          detail: message,
          primaryCta: {
            text: continueButtonText,
            action: onContinue,
          },
          onClose: onContinue,
        },
        onForceClose: onContinue,
      })
    })
  }
}

const extractDialogHelpers = ({
  show,
  hide,
  showErrorDialog,
}: DialogContainer) => ({
  show,
  hide,
  showErrorDialog,
})

export type Dialog = ReturnType<typeof extractDialogHelpers>

/**
 * Injects the `dialog` prop into the given page component
 * @param Component
 */
export function injectDialog<R extends { dialog: Dialog }>(
  Component: React.ComponentType<R>
): React.ComponentType<{ [K in Exclude<keyof R, "dialog">]: R[K] }> {
  return props => (
    <Subscribe to={[DialogContainer]}>
      {(dialog: DialogContainer) => (
        <Component dialog={extractDialogHelpers(dialog)} {...props} />
      )}
    </Subscribe>
  )
}

export const ConnectedModalDialog = () => (
  <Subscribe to={[DialogContainer]}>
    {(dialogs: DialogContainer) => <ModalDialog {...dialogs.state.props} />}
  </Subscribe>
)
