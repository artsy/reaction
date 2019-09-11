import {
  BorderedRadio,
  Button,
  Checkbox,
  Flex,
  Link,
  Modal,
  Serif,
} from "@artsy/palette"
import React, { useCallback, useState } from "react"

export function BankTransferExperiment() {
  const [isShowingModal, setIsShowingModal] = useState(false)
  const [
    shouldNotifyUserWhenFeatureIsAvailable,
    setShouldNotifyUserWhenFeatureIsAvailable,
  ] = useState(false)

  const dismissModal = useCallback(() => setIsShowingModal(false), [])

  return (
    <Flex flexDirection="column">
      <Serif size="3">Bank Transfer</Serif>
      <Flex flexDirection="column">
        <BorderedRadio
          selected={isShowingModal}
          onSelect={() => setIsShowingModal(true)}
          key={0}
          my={0.3}
          value=""
          label="Add new account."
        />
      </Flex>
      <Modal
        show={isShowingModal}
        onClose={dismissModal}
        title="Pay by Bank Transfer"
      >
        <Flex flexGrow={1} flexDirection="column">
          <Serif size="3t" pb={2}>
            Bank transfer support is currently in development. Please complete
            checkout with a credit card or contact{" "}
            <Link target="_blank" href="mailto:orders@artsy.net">
              orders@artsy.net
            </Link>{" "}
            with questions.
          </Serif>
          <Flex alignItems="center" pb={2}>
            <Checkbox
              onSelect={setShouldNotifyUserWhenFeatureIsAvailable}
              selected={shouldNotifyUserWhenFeatureIsAvailable}
            >
              Notify me when this feature is available.
            </Checkbox>
          </Flex>
          <Button onClick={dismissModal}>Back to payment</Button>
        </Flex>
      </Modal>
    </Flex>
  )
}
