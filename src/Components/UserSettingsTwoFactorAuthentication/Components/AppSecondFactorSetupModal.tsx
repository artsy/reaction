import { Box, Button, Flex, Input, Modal, Sans } from "@artsy/palette"
import { Formik, FormikActions, FormikProps } from "formik"
import QRCode from "qrcode.react"
import React from "react"
import * as Yup from "yup"

import { ModalProps } from "Components/Modal/Modal"

export interface FormValues {
  name: string
  code: string
}

const initialValues: FormValues = {
  name: "",
  code: "",
}

const presenceRegex = /.*\S.*/

const validationSchema = Yup.object().shape({
  name: Yup.string().matches(presenceRegex, "Enter a name"),
  code: Yup.string().matches(presenceRegex, "Enter a code"),
})

interface AppSecondFactorSetupModalProps extends ModalProps {
  handleSubmit: (values: FormValues, actions: FormikActions<object>) => void
}

export const AppSecondFactorSetupModal: React.FC<AppSecondFactorSetupModalProps> = props => {
  return (
    <Modal title="Enable 2FA" show={props.show} onClose={props.onClose}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={props.handleSubmit}
        render={(formikProps: FormikProps<FormValues>) => (
          <InnerForm {...formikProps} />
        )}
      />
    </Modal>
  )
}

const InnerForm: React.FC<FormikProps<FormValues>> = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  values,
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
          placeholder="My iPhone"
          onChange={handleChange}
          title="Device Name"
        />
      </Box>
      <Sans mt={220} color="black60" size="3">
        Use your app to scan the code below. If you can’t use a barcode, enter
        the secret code manually.
      </Sans>
      <Box mt={2} textAlign="center">
        <QRCode
          size={256}
          value="otpauth://totp/Artsy:user@example.com?secret=secret&issuer=Artsy"
        />
      </Box>
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
          placeholder="123456"
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
