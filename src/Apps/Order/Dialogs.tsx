import { ModalDialog, ModalDialogProps } from "Components/Modal/ModalDialog"
import React from "react"
import { Container, Subscribe } from "unstated"

interface DialogState {
  props: ModalDialogProps
  forceCloseDialog: () => Promise<{}>
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
    forceCloseDialog: () => Promise.resolve({}),
  }

  // We are quite unlikely to need this, but let's err on the side of caution
  async maybeForceCloseExistingDialog() {
    if (this.state.props.show) {
      await this.state.forceCloseDialog()
    }
  }

  showAcceptDialog = async ({
    title,
    message,
    continueButtonText = "Continue",
    cancelButtonText = "Cancel",
  }: {
    title: string
    message: string
    continueButtonText?: string
    cancelButtonText?: string
  }): Promise<{ accepted: boolean }> => {
    await this.maybeForceCloseExistingDialog()

    return new Promise<{ accepted: boolean }>(resolve => {
      const accept = () =>
        this.setState({ props: { ...this.state.props, show: false } }, () =>
          resolve({ accepted: true })
        )
      const reject = (cb = null) =>
        this.setState({ props: { ...this.state.props, show: false } }, () => {
          resolve({ accepted: false })
          cb && cb()
        })

      this.setState({
        props: {
          show: true,
          heading: title,
          detail: message,
          primaryCta: {
            text: continueButtonText,
            action: accept,
          },
          secondaryCta: {
            text: cancelButtonText,
            action: reject,
          },
          onClose: reject,
        },
        forceCloseDialog: () => new Promise(r => reject(r)),
      })
    })
  }
}

export type DialogHelpers = {
  [k in Exclude<
    keyof DialogContainer,
    | "state"
    | "setState"
    | "subscribe"
    | "unsubscribe"
    | "maybeForceCloseExistingDialog"
  >]: DialogContainer[k]
}

const extractDialogHelpers = ({
  showAcceptDialog,
}: DialogContainer): DialogHelpers => ({ showAcceptDialog })

/**
 * Injects the `dialogs` prop into the given page component
 * @param Component
 */
export function injectDialogs<R extends { dialogs: DialogHelpers }>(
  Component: React.ComponentType<R>
): React.ComponentType<{ [K in Exclude<keyof R, "dialogs">]: R[K] }> {
  return props => (
    <Subscribe to={[DialogContainer]}>
      {(dialogs: DialogContainer) => (
        <>
          <Component dialogs={extractDialogHelpers(dialogs)} {...props} />
          <ModalDialog {...dialogs.state.props} />
        </>
      )}
    </Subscribe>
  )
}
