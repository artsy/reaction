import {
  BorderedRadio,
  Button,
  Checkbox,
  Flex,
  Link,
  Modal,
  Serif,
} from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "Artsy"
import React, { useState } from "react"

export function BankTransferExperiment() {
  const [isShowingModal, setIsShowingModal] = useState(false)
  const [
    shouldNotifyUserWhenFeatureIsAvailable,
    setShouldNotifyUserWhenFeatureIsAvailable,
  ] = useState(false)

  const { trackEvent } = useTracking()

  const onHoverOverRadio = () => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Hover,
      subject: AnalyticsSchema.Subject.BNMOAddBankAccount,
      type: AnalyticsSchema.Type.RadioButton,
    })
  }
  const onClickRadio = () => {
    setIsShowingModal(true)
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      subject: AnalyticsSchema.Subject.BNMOAddBankAccount,
      type: AnalyticsSchema.Type.RadioButton,
    })
  }

  const onClickEmailLink = () => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      subject: AnalyticsSchema.Subject.BNMOHelpEmail,
      type: AnalyticsSchema.Type.EmailLink,
      context_module: AnalyticsSchema.ContextModule.BankTransferExperiment,
    })
  }

  const onCheckboxToggled = (checked: boolean) => {
    setShouldNotifyUserWhenFeatureIsAvailable(checked)
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      subject: AnalyticsSchema.Subject.BNMOBankTransferNotifcationCheckbox,
      type: AnalyticsSchema.Type.EmailLink,
      context_module: AnalyticsSchema.ContextModule.BankTransferExperiment,
    })
  }

  const onDismissModal = () => {
    setIsShowingModal(false)
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      subject: AnalyticsSchema.Subject.BNMOBankTransferModalDismissed,
      type: AnalyticsSchema.Type.ModalDismissal,
      context_module: AnalyticsSchema.ContextModule.BankTransferExperiment,
    })
  }

  return (
    <Flex flexDirection="column">
      <Serif size="3">Bank Transfer</Serif>
      <Flex
        flexDirection="column"
        onMouseEnter={onHoverOverRadio}
        id="bank-transfer-hover-target"
      >
        <BorderedRadio
          selected={isShowingModal}
          onSelect={onClickRadio}
          key={0}
          my={0.3}
          value=""
          label="Add new account."
        />
      </Flex>
      <Modal
        show={isShowingModal}
        onClose={onDismissModal}
        title="Pay by Bank Transfer"
      >
        <Flex flexGrow={1} flexDirection="column">
          <Serif size="3t" pb={2}>
            Bank transfer support is currently in development. Please complete
            checkout with a credit card or contact{" "}
            <Link
              target="_blank"
              href="mailto:orders@artsy.net"
              onClick={onClickEmailLink}
            >
              orders@artsy.net
            </Link>{" "}
            with questions.
          </Serif>
          <Flex alignItems="center" pb={2}>
            <Checkbox
              onSelect={onCheckboxToggled}
              selected={shouldNotifyUserWhenFeatureIsAvailable}
            >
              Notify me when this feature is available.
            </Checkbox>
          </Flex>
          <Button onClick={onDismissModal}>Back to payment</Button>
        </Flex>
      </Modal>
    </Flex>
  )
}
