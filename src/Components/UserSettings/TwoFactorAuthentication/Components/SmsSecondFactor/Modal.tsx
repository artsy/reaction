import { Box, Button, Input, Modal } from "@artsy/palette"
import { FormikActions } from "formik"
import React from "react"
import * as Yup from "yup"

import { useSystemContext } from "Artsy"
import { Step, Wizard } from "Components/Wizard"
import { FormValues, StepElement } from "Components/Wizard/types"
import { DeliverSecondFactor } from "./Mutation/DeliverSecondFactor"
import { UpdateSmsSecondFactor } from "./Mutation/UpdateSmsSecondFactor"

// TODO: Replace with ModalProps from artsy/palette
// https://github.com/artsy/palette/blob/master/packages/palette/src/elements/Modal/Modal.tsx#L18
interface ModalProps {
  onClose: () => void
  show?: boolean
  title?: string
  forcedScroll?: boolean
}

interface SmsSecondFactorModalProps extends ModalProps {
  handleSubmit: (values: FormValues, actions: FormikActions<object>) => void
  secondFactor: any
}

export const SmsSecondFactorModal: React.FC<SmsSecondFactorModalProps> = props => {
  const { secondFactor, handleSubmit } = props
  const { relayEnvironment } = useSystemContext()

  if (!secondFactor) {
    return null
  }

  const handleDeliver = async (event: React.FormEvent<any>, form: any) => {
    UpdateSmsSecondFactor(relayEnvironment, {
      secondFactorID: secondFactor.internalID,
      attributes: { phoneNumber: form.values.phoneNumber, countryCode: "US" },
    }).then(updateResponse => {
      if (
        updateResponse.updateSmsSecondFactor.secondFactorOrErrors.__typename ===
        "Errors"
      ) {
        console.error(updateResponse.updateSmsSecondFactor.secondFactorOrErrors)
      }

      DeliverSecondFactor(relayEnvironment, {
        secondFactorID: secondFactor.internalID,
      }).then(deliverResponse => {
        if (
          deliverResponse.deliverSecondFactor.secondFactorOrErrors
            .__typename === "Errors"
        ) {
          console.error(
            deliverResponse.deliverSecondFactor.secondFactorOrErrors
          )
        }
      })
    })
  }

  const steps: StepElement[] = [
    <Step
      label="Name"
      validationSchema={Yup.object().shape({
        phoneNumber: Yup.string().required("Enter your phone number"),
      })}
    >
      {({ form, wizard }) => (
        <Box>
          <Input
            autoComplete="off"
            name="phoneNumber"
            error={form.touched.phoneNumber && form.errors.phoneNumber}
            value={form.values.phoneNumber}
            onBlur={form.handleBlur}
            placeholder="+1 (555) 123-7878"
            onChange={form.handleChange}
            title="Phone Number"
          />
          <Button mt={1} onClick={event => handleDeliver(event, form)}>
            Continue
          </Button>
        </Box>
      )}
    </Step>,
    <Step
      label="Terms"
      validationSchema={Yup.object().shape({
        code: Yup.string().required("Enter a code"),
      })}
    >
      {({ form, wizard }) => (
        <Box>
          <Input
            error={form.touched.code && form.errors.code}
            onBlur={form.handleBlur}
            autoComplete="off"
            name="code"
            value={form.values.code}
            onChange={form.handleChange}
            title="Authentication Code"
          />
          <Button mt={1} onClick={form.handleSubmit}>
            Finish
          </Button>
          <Button
            ml={1}
            variant="secondaryGray"
            mt={1}
            onClick={wizard.previous}
          >
            Back
          </Button>
        </Box>
      )}
    </Step>,
  ]

  return (
    <Modal
      forcedScroll={false}
      title="Enable 2FA"
      show={props.show}
      onClose={props.onClose}
    >
      <Wizard onComplete={handleSubmit} steps={steps}>
        {wizardProps => {
          const { wizard } = wizardProps
          const { currentStep } = wizard
          return <Box>{currentStep}</Box>
        }}
      </Wizard>
    </Modal>
  )
}
