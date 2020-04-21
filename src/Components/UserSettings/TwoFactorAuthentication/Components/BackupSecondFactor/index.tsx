import { BorderBox, Button, Flex, Modal, Sans, Serif } from "@artsy/palette"
import { BorderBoxProps } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import React, { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { useSystemContext } from "Artsy"
import { BackupSecondFactorModalContentQueryRenderer as ModalContent } from "./BackupSecondFactorModalContent"
import { CreateBackupSecondFactors } from "./Mutation/CreateBackupSecondFactors"

import { TwoFactorAuthentication_me } from "__generated__/TwoFactorAuthentication_me.graphql"

interface BackupSecondFactorProps extends BorderBoxProps {
  me: TwoFactorAuthentication_me
}

export const BackupSecondFactor: React.FC<BackupSecondFactorProps> = props => {
  const { me } = props
  const { relayEnvironment } = useSystemContext()

  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function createBackupSecondFactors() {
    setIsSubmitting(true)

    CreateBackupSecondFactors(relayEnvironment)
      .then(() => {
        setIsSubmitting(false)
        setShowModal(true)
      })
      .catch(reason => {
        console.error(reason)
        setIsSubmitting(false)
      })
  }

  return (
    <BorderBox p={20} {...props}>
      <Flex flexDirection="row" justifyContent="space-between" width="100%">
        <Flex flexDirection="column" width="345px">
          <Sans size="4t" color="black100">
            Backup codes
          </Sans>
          <Serif size="3t" color="black60">
            Generate one-time backup codes to access your account. Keep these
            safe.
          </Serif>
        </Flex>
        <Flex alignItems="center">
          {me.backupSecondFactors.length ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.backupSecondFactors.length} remaining
              </Sans>
              <Button
                ml={10}
                variant="secondaryOutline"
                onClick={() => setShowModal(true)}
              >
                Show
              </Button>
              <Button
                loading={isSubmitting}
                ml={10}
                variant="secondaryGray"
                onClick={createBackupSecondFactors}
              >
                Regenerate
              </Button>
            </>
          ) : (
            <Button loading={isSubmitting} onClick={createBackupSecondFactors}>
              Set up
            </Button>
          )}
        </Flex>
      </Flex>
      <Modal
        forcedScroll={false}
        title="Your backup codes"
        show={showModal}
        onClose={() => setShowModal(false)}
        FixedButton={
          <Button block width="100%" onClick={() => setShowModal(false)}>
            Done
          </Button>
        }
      >
        <ModalContent />
      </Modal>
    </BorderBox>
  )
}

export const BackupSecondFactorFragmentContainer = createFragmentContainer(
  BackupSecondFactor,
  {
    me: graphql`
      fragment BackupSecondFactor_me on Me {
        backupSecondFactors: secondFactors(kinds: [backup]) {
          ... on BackupSecondFactor {
            __typename
          }
        }
      }
    `,
  }
)
