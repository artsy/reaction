import { BorderBox, Button, Flex, Sans, Serif } from "@artsy/palette"
import { BorderBoxProps } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import { FormikActions } from "formik"
import React, { useState } from "react"
import { RelayRefetchProp } from "react-relay"

import { useSystemContext } from "Artsy"
import { FormValues } from "Components/Wizard/types"

import { DisableSecondFactor } from "../Mutation/DisableSecondFactor"
import { EnableSecondFactor } from "../Mutation/EnableSecondFactor"
import { SmsSecondFactorModal } from "./Modal"
import { CreateSmsSecondFactor } from "./Mutation/CreateSmsSecondFactor"
import { UpdateSmsSecondFactor } from "./Mutation/UpdateSmsSecondFactor"

import { TwoFactorAuthentication_me } from "__generated__/TwoFactorAuthentication_me.graphql"

interface SmsSecondFactorProps extends BorderBoxProps {
  me: TwoFactorAuthentication_me
  relay: RelayRefetchProp
}

export const SmsSecondFactor: React.FC<SmsSecondFactorProps> = props => {
  const { me, relay } = props
  const { relayEnvironment } = useSystemContext()
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [stagedSecondFactor, setStagedSecondFactor] = useState(null)

  function handleSubmit(values: FormValues, actions: FormikActions<object>) {
    const update = UpdateSmsSecondFactor(relayEnvironment, {
      secondFactorID: stagedSecondFactor.internalID,
      attributes: { phoneNumber: values.phoneNumber, countryCode: "US" },
    })

    const enable = EnableSecondFactor(relayEnvironment, {
      secondFactorID: stagedSecondFactor.internalID,
      code: values.code,
    })

    Promise.all([update, enable]).then(result => {
      const updateFactorOrErrors =
        result[0].updateSmsSecondFactor.secondFactorOrErrors
      const enableFactorOrErrors =
        result[1].enableSecondFactor.secondFactorOrErrors

      if (updateFactorOrErrors.__typename === "Errors") {
        actions.setSubmitting(false)
        actions.setError(updateFactorOrErrors.errors[0].message)
      } else if (enableFactorOrErrors.__typename === "Errors") {
        actions.setSubmitting(false)
        actions.setError(enableFactorOrErrors.errors[0].message)
      } else {
        setShowSetupModal(false)
        relay.refetch({})
      }
    })
  }

  function handleSetup() {
    CreateSmsSecondFactor(relayEnvironment, { attributes: {} }).then(
      response => {
        if (
          response.createSmsSecondFactor.secondFactorOrErrors.__typename ===
          "Errors"
        ) {
          console.error(response.createSmsSecondFactor.secondFactorOrErrors)
        } else {
          setStagedSecondFactor(
            response.createSmsSecondFactor.secondFactorOrErrors
          )
          setShowSetupModal(true)
        }
      }
    )
  }

  function handleDisable() {
    DisableSecondFactor(relayEnvironment, {
      secondFactorID: me.smsSecondFactors[0].internalID,
    }).then(response => {
      if (
        response.disableSecondFactor.secondFactorOrErrors.__typename ===
        "Errors"
      ) {
        console.error(response.disableSecondFactor.secondFactorOrErrors)
      } else {
        relay.refetch({})
      }
    })
  }

  return (
    <BorderBox p={2} {...props}>
      <Flex flexDirection="row" justifyContent="space-between" width="100%">
        <Flex flexDirection="column" width="345px">
          <Sans size="4t" color="black100">
            Use text messages
          </Sans>
          <Serif size="3t" color="black60">
            Security codes will be sent to your mobile phone.
          </Serif>
        </Flex>
        <Flex alignItems="center">
          {me.smsSecondFactors.length ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.smsSecondFactors[0].formattedPhoneNumber}
              </Sans>
              <Button onClick={handleDisable} ml={1} variant="secondaryOutline">
                Disable
              </Button>
              <Button onClick={handleSetup} ml={1} variant="secondaryGray">
                Edit
              </Button>
            </>
          ) : (
            <Button onClick={handleSetup}>Set up</Button>
          )}
        </Flex>
      </Flex>
      <SmsSecondFactorModal
        show={showSetupModal}
        secondFactor={stagedSecondFactor}
        handleSubmit={handleSubmit}
        onClose={() => setShowSetupModal(false)}
      />
    </BorderBox>
  )
}
