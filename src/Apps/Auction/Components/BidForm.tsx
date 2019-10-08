import {
  Box,
  Button,
  Flex,
  LargeSelect,
  Sans,
  Separator,
  Serif,
} from "@artsy/palette"
import { BidForm_saleArtwork } from "__generated__/BidForm_saleArtwork.graphql"
import { ConditionsOfSaleCheckbox } from "Components/Auction/ConditionsOfSaleCheckbox"
import { Formik, FormikActions, FormikValues } from "formik"
import { dropWhile } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Yup from "yup"

interface Props {
  saleArtwork: BidForm_saleArtwork
  onSubmit: (values: FormikValues, actions: FormikActions<object>) => void
}

interface FormValues {
  selectedBid: string
  agreeToTerms: boolean
}

const validationSchema = Yup.object().shape({
  selectedBid: Yup.string().required(),
  agreeToTerms: Yup.bool().oneOf(
    [true],
    "You must agree to the Conditions of Sale"
  ),
})

export const BidForm: React.FC<Props> = ({ onSubmit, saleArtwork }) => {
  const displayIncrements = dropWhile(
    saleArtwork.increments,
    increment => increment.cents < saleArtwork.minimumNextBid.cents
  ).map(inc => ({ value: inc.cents.toString(), text: inc.display }))
  return (
    <Formik<FormValues>
      initialValues={{
        selectedBid: displayIncrements[0].value,
        agreeToTerms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        values,
        touched,
        errors,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Flex flexDirection="column" as="form">
              <Flex flexDirection="column" py={4}>
                <Serif pb={0.5} size="4t" weight="semibold" color="black100">
                  Set your max bid
                </Serif>
                <LargeSelect
                  selected={values.selectedBid}
                  onSelect={value => {
                    setFieldValue("selectedBid", value)
                    setFieldTouched("selectedBid")
                  }}
                  options={displayIncrements}
                />
                {touched.selectedBid && errors.selectedBid && (
                  <Sans mt={1} color="red100" size="2">
                    {errors.selectedBid}
                  </Sans>
                )}
              </Flex>

              <Separator />
              <Flex
                py={3}
                flexDirection="column"
                justifyContent="center"
                width="100%"
              >
                <Box mx="auto" mb={3}>
                  <ConditionsOfSaleCheckbox
                    selected={values.agreeToTerms}
                    onSelect={value => {
                      setFieldValue("agreeToTerms", value)
                      setFieldTouched("agreeToTerms")
                    }}
                  />
                  {touched.agreeToTerms && errors.agreeToTerms && (
                    <Sans mt={1} color="red100" size="2" textAlign="center">
                      {errors.agreeToTerms}
                    </Sans>
                  )}
                </Box>
                <Button
                  size="large"
                  mt={3}
                  width="100%"
                  loading={isSubmitting}
                  {...{ type: "submit" } as any}
                >
                  Confirm bid
                </Button>
              </Flex>
            </Flex>
          </form>
        )
      }}
    />
  )
}

export const BidFormFragmentContainer = createFragmentContainer(BidForm, {
  saleArtwork: graphql`
    fragment BidForm_saleArtwork on SaleArtwork {
      minimumNextBid: minimum_next_bid {
        cents
      }
      increments(useMyMaxBid: true) {
        cents
        display
      }
    }
  `,
})
