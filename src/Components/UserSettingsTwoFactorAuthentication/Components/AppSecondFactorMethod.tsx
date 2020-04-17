import { BorderBox, Button, Flex, Link, Sans, Serif } from "@artsy/palette"
import { BorderBoxProps } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import React, { useState } from "react"

import { UserSettingsTwoFactorAuthentication_me } from "__generated__/UserSettingsTwoFactorAuthentication_me.graphql"
import { FormikActions } from "formik"
import {
  AppSecondFactorSetupModal,
  FormValues,
} from "./AppSecondFactorSetupModal"

interface SecondFactorMethodProps extends BorderBoxProps {
  me: UserSettingsTwoFactorAuthentication_me
}

export const AppSecondFactorMethod: React.FC<SecondFactorMethodProps> = props => {
  const { me } = props
  const [showSetupModal, setShowSetupModal] = useState(false)

  const handleSubmit = (values: FormValues, actions: FormikActions<object>) => {
    if (values.code === "123456") {
      setShowSetupModal(false)
    } else {
      actions.setSubmitting(false)
      actions.setFieldError("code", "Invalid two-factor authentication code.")
    }
  }

  return (
    <BorderBox p={2} {...props}>
      <Flex flexDirection="row" justifyContent="space-between" width="100%">
        <Flex flexDirection="column" width="345px">
          <Sans size="4t" color="black100">
            App Authenticator
          </Sans>
          <Serif size="3t" color="black60">
            Generate secure authentication codes using an application such as{" "}
            <Link href="https://support.1password.com/one-time-passwords">
              1Password
            </Link>{" "}
            or <Link href="https://authy.com/features">Authy</Link>.
          </Serif>
        </Flex>
        <Flex alignItems="center">
          {me.appSecondFactors.length ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.appSecondFactors[0].name}
              </Sans>
              <Button ml={1} variant="secondaryOutline">
                Disable
              </Button>
              <Button ml={1} variant="secondaryGray">
                Edit
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowSetupModal(true)}>Set up</Button>
          )}
        </Flex>
      </Flex>
      <AppSecondFactorSetupModal
        show={showSetupModal}
        handleSubmit={handleSubmit}
        onClose={() => setShowSetupModal(false)}
      />
    </BorderBox>
  )
}
