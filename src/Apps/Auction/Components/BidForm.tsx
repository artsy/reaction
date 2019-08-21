import {
  Box,
  Button,
  Flex,
  LargeSelect,
  Sans,
  Separator,
  Serif,
} from "@artsy/palette"
import { ConditionsOfSaleCheckbox } from "Components/Auction/ConditionsOfSaleCheckbox"
import { Form, Formik, FormikActions, FormikProps } from "formik"
import React from "react"
import * as Yup from "yup"

export interface FormValues {
  maxBidAmountCents: string
  agreeToTerms: boolean
}

const InnerForm: React.FC<FormikProps<FormValues>> = props => {
  const {
    touched,
    errors,
    isSubmitting,
    values,
    setFieldValue,
    setFieldTouched,
  } = props

  return (
    <Form>
      <LargeSelect
        mt={1}
        options={[
          { text: "$8,000", value: "800000" },
          { text: "$10,000", value: "1000000" },
        ]}
        onSelect={value => {
          setFieldValue("maxBidAmountCents", value)
          setFieldTouched("maxBidAmountCents")
        }}
      />
      {touched.maxBidAmountCents && errors.maxBidAmountCents && (
        <Sans mt={1} color="red100" size="2">
          {errors.maxBidAmountCents}
        </Sans>
      )}
      <Separator mt={4} mb={2} />
      <Flex mt={4} mb={2} flexDirection="column" justifyContent="center">
        <Box mx="auto">
          <ConditionsOfSaleCheckbox
            selected={values.agreeToTerms}
            onSelect={value => {
              setFieldValue("agreeToTerms", value)
              setFieldTouched("agreeToTerms")
            }}
          />
        </Box>

        {touched.agreeToTerms && errors.agreeToTerms && (
          <Sans mt={1} color="red100" size="2" textAlign="center">
            {errors.agreeToTerms}
          </Sans>
        )}
      </Flex>

      <Button mt={1} size="large" width="100%" loading={isSubmitting}>
        Confirm Bid
      </Button>
    </Form>
  )
}

const validationSchema = Yup.object().shape({
  maxBidAmountCents: Yup.string().required("Max bid amount is required"),
  agreeToTerms: Yup.bool().oneOf(
    [true],
    "You must agree to the Conditions of Sale"
  ),
})

export interface BidFormProps {
  onSubmit: (values: FormValues, formikActions: FormikActions<object>) => void
}

export const BidForm: React.FC<BidFormProps> = props => {
  const initialValues = {
    maxBidAmountCents: "",
    agreeToTerms: false,
  }

  function onSubmit(values: FormValues, actions: FormikActions<object>) {
    props.onSubmit(values, actions)
  }

  return (
    <Box maxWidth={550}>
      <Serif weight="semibold" size="4">
        Set your max bid
      </Serif>
      <Box mt={2}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          render={InnerForm}
        />
      </Box>
    </Box>
  )
}
