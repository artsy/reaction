import { Box, Button, Flex, Input, Modal, Sans } from "@artsy/palette"
import { Formik, FormikActions, FormikProps } from "formik"
import QRCode from "qrcode.react"
import React from "react"
import * as Yup from "yup"

// TODO: Replace with ModalProps from artsy/palette
// https://github.com/artsy/palette/blob/master/packages/palette/src/elements/Modal/Modal.tsx#L18
interface ModalProps {
  FixedButton?: JSX.Element
  onClose: () => void
  show?: boolean
  title?: string
  forcedScroll?: boolean
}

import { AppSecondFactorType } from "../AppSecondFactor"

export interface FormValues {
  name: string
  code: string
}

const presenceRegex = /.*\S+.*/

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Enter a name")
    .matches(presenceRegex, "Enter a name"),
  code: Yup.string()
    .required("Enter a code")
    .matches(presenceRegex, "Enter a code"),
})

interface AppSecondFactorModalProps extends ModalProps {
  handleSubmit: (values: FormValues, actions: FormikActions<object>) => void
  secondFactor: AppSecondFactorType
}

export const AppSecondFactorModal: React.FC<AppSecondFactorModalProps> = props => {
  const { secondFactor, handleSubmit } = props

  if (!secondFactor) {
    return null
  }

  return (
    <Modal
      forcedScroll={false}
      title="Enable 2FA"
      show={props.show}
      onClose={props.onClose}
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={{ name: secondFactor.name || "", code: "" }}
        onSubmit={handleSubmit}
        render={(formikProps: FormikProps<FormValues>) => (
          <InnerForm secondFactor={secondFactor} {...formikProps} />
        )}
      />
    </Modal>
  )
}

interface InnerFormProps extends FormikProps<FormValues> {
  secondFactor: AppSecondFactorType
}

const InnerForm: React.FC<InnerFormProps> = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  values,
  secondFactor,
}) => {
  return (
    <Box mt={2}>
      <Sans color="black60" size="3">
        An authenticator app lets you generate security codes.
      </Sans>
      <Box mt={1}>
        <Input
          autoComplete="off"
          name="name"
          error={touched.name && errors.name}
          value={values.name}
          onBlur={handleBlur}
          placeholder="My Phone"
          onChange={handleChange}
          title="Device Name"
        />
      </Box>
      <Sans mt={2} color="black60" size="3">
        Use your app to scan the code below. If you can’t use a barcode, enter
        the secret code manually.
      </Sans>
      <Box mt={2} textAlign="center">
        <QRCode size={256} value={secondFactor.otpProvisioningURI} />
      </Box>
      <Sans mt={2} color="black60" size="3t">
        secret: {secondFactor.otpSecret}
      </Sans>
      <Sans mt={2} color="black60" size="3">
        Enter the six-digit code from the application to complete the
        configuration.
      </Sans>
      <Box mt={2}>
        <Input
          error={touched.code && errors.code}
          onBlur={handleBlur}
          autoComplete="off"
          name="code"
          value={values.code}
          onChange={handleChange}
          title="Authentication Code"
        />
      </Box>
      <Flex alignItems="center">
        <Button
          mt={2}
          loading={isSubmitting}
          width="100%"
          type="submit"
          onClick={handleSubmit}
        >
          Turn on
        </Button>
      </Flex>
    </Box>
  )
}
