import { Link } from "@artsy/palette"
import { ModalDialog, ModalDialogProps } from "Components/Modal/ModalDialog"
import React from "react"
import { Container, Subscribe } from "unstated"

interface DialogState {
  props: ModalDialogProps
  forceCloseDialog: () => Promise<void>
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
    forceCloseDialog: () => Promise.resolve(),
  }

  setStatePromise(state: Partial<DialogState>): Promise<void> {
    return new Promise(resolve => {
      this.setState(state, resolve)
    })
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
    title: React.ReactNode
    message: React.ReactNode
    continueButtonText?: string
    cancelButtonText?: string
  }): Promise<{ accepted: boolean }> => {
    await this.maybeForceCloseExistingDialog()

    return new Promise<{ accepted: boolean }>(resolve => {
      const accept = async () => {
        await this.setStatePromise({
          props: { ...this.state.props, show: false },
        })
        resolve({ accepted: true })
      }
      const reject = async () => {
        await this.setStatePromise({
          props: { ...this.state.props, show: false },
        })
        resolve({ accepted: false })
      }

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
        forceCloseDialog: reject,
      })
    })
  }

  showErrorDialog = async ({
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
  }): Promise<{}> => {
    await this.maybeForceCloseExistingDialog()

    return new Promise<{ accepted: boolean }>(resolve => {
      const onContinue = async () => {
        await this.setStatePromise({
          props: { ...this.state.props, show: false },
        })
        resolve()
      }

      this.setState({
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
        forceCloseDialog: onContinue,
      })
    })
  }
}

const extractDialogHelpers = ({
  showAcceptDialog,
  showErrorDialog,
}: DialogContainer) => ({ showAcceptDialog, showErrorDialog })

export type DialogHelpers = ReturnType<typeof extractDialogHelpers>

// make it safe to inject dialogs on components nested within a page by
// only injecting the actual modal component if it hasn't been injected already
// otherwise you might end up with two or more instances of the modal appearing.
const DialogContext = React.createContext({ isModalInTree: false })

/**
 * Injects the `dialogs` prop into the given page component
 * @param Component
 */
export function injectDialogs<R extends { dialogs: DialogHelpers }>(
  Component: React.ComponentType<R>
): React.ComponentType<{ [K in Exclude<keyof R, "dialogs">]: R[K] }> {
  return props => (
    <DialogContext.Consumer>
      {({ isModalInTree }) => (
        <Subscribe to={[DialogContainer]}>
          {(dialogs: DialogContainer) => (
            <>
              <Component dialogs={extractDialogHelpers(dialogs)} {...props} />
              {!isModalInTree && (
                <DialogContext.Provider value={{ isModalInTree: true }}>
                  <ModalDialog {...dialogs.state.props} />
                </DialogContext.Provider>
              )}
            </>
          )}
        </Subscribe>
      )}
    </DialogContext.Consumer>
  )
}
