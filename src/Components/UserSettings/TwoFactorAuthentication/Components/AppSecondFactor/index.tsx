import { BorderBox, Button, Flex, Link, Sans, Serif } from "@artsy/palette"
import { BorderBoxProps } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import React, { useState } from "react"
import { graphql, RelayRefetchProp } from "react-relay"

import { TwoFactorAuthentication_me } from "__generated__/TwoFactorAuthentication_me.graphql"
import { FormikActions } from "formik"
import { AppSecondFactorModal, FormValues } from "./Modal"

interface AppSecondFactorProps extends BorderBoxProps {
  me: TwoFactorAuthentication_me
  relay?: RelayRefetchProp
}

import { useSystemContext } from "Artsy"

import { AppSecondFactorMethodSecondFactor } from "__generated__/AppSecondFactorMethodSecondFactor.graphql"
import { DisableSecondFactor } from "../Mutation/DisableSecondFactor"
import { EnableSecondFactor } from "../Mutation/EnableSecondFactor"
import { CreateAppSecondFactor } from "./Mutation/CreateAppSecondFactor"
import { UpdateAppSecondFactor } from "./Mutation/UpdateAppSecondFactor"

export type AppSecondFactorType = AppSecondFactorMethodSecondFactor

export const AppSecondFactor: React.FC<AppSecondFactorProps> = props => {
  const { me, relay } = props
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [stagedSecondFactor, setStagedSecondFactor] = useState(null)

  const { relayEnvironment } = useSystemContext()

  function handleSubmit(values: FormValues, actions: FormikActions<object>) {
    const update = UpdateAppSecondFactor(relayEnvironment, {
      secondFactorID: stagedSecondFactor.internalID,
      attributes: { name: values.name },
    })

    const enable = EnableSecondFactor(relayEnvironment, {
      secondFactorID: stagedSecondFactor.internalID,
      code: values.code,
    })

    Promise.all([update, enable]).then(result => {
      const updateFactorOrErrors =
        result[0].updateAppSecondFactor.secondFactorOrErrors
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
    CreateAppSecondFactor(relayEnvironment, { attributes: {} }).then(
      response => {
        if (
          response.createAppSecondFactor.secondFactorOrErrors.__typename ===
          "Errors"
        ) {
          console.error(response.createAppSecondFactor.secondFactorOrErrors)
        } else {
          setStagedSecondFactor(
            response.createAppSecondFactor.secondFactorOrErrors
          )
          setShowSetupModal(true)
        }
      }
    )
  }

  function handleDisable() {
    DisableSecondFactor(relayEnvironment, {
      secondFactorID: me.appSecondFactors[0].internalID,
    }).then(response => {
      if (
        response.disableSecondFactor.secondFactorOrErrors.__typename ===
        "Errors"
      ) {
        console.error(response.disableSecondFactor.secondFactorOrErrors.errors)
      } else {
        relay.refetch({})
      }
    })
  }

  graphql`
    fragment AppSecondFactorMethodSecondFactor on AppSecondFactor {
      __typename
      internalID
      name
      otpProvisioningURI
      otpSecret
    }
  `

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
      <AppSecondFactorModal
        show={showSetupModal}
        secondFactor={stagedSecondFactor}
        handleSubmit={handleSubmit}
        onClose={() => setShowSetupModal(false)}
      />
    </BorderBox>
  )
}
