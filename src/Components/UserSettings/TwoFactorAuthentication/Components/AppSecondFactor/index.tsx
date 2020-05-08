import { BorderBox, Button, Flex, Link, Sans, Serif } from "@artsy/palette"
import { BorderBoxProps } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import React, { useState } from "react"
import { createFragmentContainer, graphql, RelayRefetchProp } from "react-relay"

import { useSystemContext } from "Artsy"
import { AppSecondFactorModal } from "./Modal"
import { ApiError } from "../../ApiError"
import { ApiErrorModal } from "../ApiErrorModal"
import { DisableSecondFactor } from "../Mutation/DisableSecondFactor"
import { CreateAppSecondFactor } from "./Mutation/CreateAppSecondFactor"
import { DisableFactorConfirmation } from "../DisableFactorConfirmation"

import { AppSecondFactor_me } from "__generated__/AppSecondFactor_me.graphql"

interface AppSecondFactorProps extends BorderBoxProps {
  me: AppSecondFactor_me
  relayRefetch?: RelayRefetchProp
}

export const AppSecondFactor: React.FC<AppSecondFactorProps> = props => {
  const { me, relayRefetch } = props
  const [apiErrors, setApiErrors] = useState<ApiError[]>([])
  const [showConfirmDisable, setShowConfirmDisable] = useState(false)
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [stagedSecondFactor, setStagedSecondFactor] = useState(null)

  const { relayEnvironment } = useSystemContext()

  function onComplete() {
    setShowSetupModal(false)
    relayRefetch.refetch({})
  }

  function handleMutationError(errors: ApiError[]) {
    if (!Array.isArray(errors)) {
      throw errors
    }

    setApiErrors(errors)
  }

  async function createSecondFactor() {
    try {
      const response = await CreateAppSecondFactor(relayEnvironment, {
        attributes: {},
      })
      setStagedSecondFactor(response.createAppSecondFactor.secondFactorOrErrors)
      setShowSetupModal(true)
    } catch (error) {
      handleMutationError(error)
    }
  }

  async function disableSecondFactor() {
    if (me.appSecondFactors[0].__typename !== "AppSecondFactor") {
      return
    }

    try {
      await DisableSecondFactor(relayEnvironment, {
        secondFactorID: me.appSecondFactors[0].internalID,
      })
      relayRefetch.refetch({})
    } catch (error) {
      handleMutationError(error)
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
          {me.appSecondFactors.length &&
          me.appSecondFactors[0].__typename === "AppSecondFactor" ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.appSecondFactors[0].name || "Unnamed"}
              </Sans>
              <Button
                onClick={() => setShowConfirmDisable(true)}
                ml={1}
                variant="secondaryOutline"
              >
                Disable
              </Button>
              <Button
                onClick={createSecondFactor}
                ml={1}
                variant="secondaryGray"
              >
                Edit
              </Button>
            </>
          ) : (
            <Button onClick={createSecondFactor}>Set up</Button>
          )}
        </Flex>
      </Flex>
      <AppSecondFactorModal
        show={showSetupModal}
        secondFactor={stagedSecondFactor}
        onComplete={onComplete}
        onClose={() => setShowSetupModal(false)}
      />
      <ApiErrorModal
        onClose={() => setApiErrors([])}
        show={!!apiErrors.length}
        errors={apiErrors}
      />
      <DisableFactorConfirmation
        show={showConfirmDisable}
        onConfirm={disableSecondFactor}
        onCancel={() => setShowConfirmDisable(false)}
      />
    </BorderBox>
  )
}

export const AppSecondFactorFragmentContainer = createFragmentContainer(
  AppSecondFactor,
  {
    me: graphql`
      fragment AppSecondFactor_me on Me {
        appSecondFactors: secondFactors(kinds: [app]) {
          ... on AppSecondFactor {
            __typename
            internalID
            name
          }
        }
      }
    `,
  }
)
