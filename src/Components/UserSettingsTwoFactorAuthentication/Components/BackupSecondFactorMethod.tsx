import {
  BorderBox,
  Box,
  Button,
  Flex,
  Modal,
  Sans,
  Serif,
} from "@artsy/palette"
import { BorderBoxProps } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import React, { useState } from "react"

import { UserSettingsTwoFactorAuthentication_me } from "__generated__/UserSettingsTwoFactorAuthentication_me.graphql"

const codes = [
  "d038183sj8",
  "2494nzki4a",
  "ze93hzna31",
  "xfr93424b1",
  "a93n5nziu3",
  "asdf93nz81",
  "q0499zn411",
  "fn3i1x239m",
  "asd0893n2",
  "a9zmemiej",
]

interface SecondFactorMethodProps extends BorderBoxProps {
  me: UserSettingsTwoFactorAuthentication_me
}

export const BackupSecondFactorMethod: React.FC<SecondFactorMethodProps> = props => {
  const { me } = props
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleShow() {
    setShowModal(true)
  }

  function handleGenerate() {
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      handleShow()
    }, 1000)
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
              <Button ml={10} variant="secondaryOutline" onClick={handleShow}>
                Show
              </Button>
              <Button
                loading={isSubmitting}
                ml={10}
                variant="secondaryGray"
                onClick={handleGenerate}
              >
                Regenerate
              </Button>
            </>
          ) : (
            <Button loading={isSubmitting} onClick={handleGenerate}>
              Set up
            </Button>
          )}
        </Flex>
      </Flex>
      <Modal
        title="Your backup codes"
        show={showModal}
        onClose={() => setShowModal(false)}
        FixedButton={
          <Button block width="100%" onClick={() => setShowModal(false)}>
            Done
          </Button>
        }
      >
        <Sans mt={1} size="3" color="black60">
          Store these two-factor recovery codes in a safe place. You can use
          these one-time codes to access your account.
        </Sans>
        <Flex mt={3} flexDirection="row" flexWrap="wrap">
          {codes.map((code, index) => (
            <Box width="50%" key={index}>
              <Sans size="6" color="black60" textAlign="center" py={0.5}>
                {code}
              </Sans>
            </Box>
          ))}
        </Flex>
      </Modal>
    </BorderBox>
  )
}
