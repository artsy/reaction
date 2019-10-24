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
import { PricingTransparency } from "Apps/Auction/Components/PricingTransparency"
import { ConditionsOfSaleCheckbox } from "Components/Auction/ConditionsOfSaleCheckbox"
import { Form, Formik, FormikActions, FormikValues } from "formik"
import { dropWhile, find } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Yup from "yup"

interface Props {
  showPricingTransparency?: boolean
  saleArtwork: BidForm_saleArtwork
  initialSelectedBid?: string
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

const getSelectedBid = ({
  initialSelectedBid,
  displayIncrements,
}: {
  initialSelectedBid: Props["initialSelectedBid"]
  displayIncrements: Array<{ value: string; text: string }>
}): string => {
  let selectedIncrement: { value: string }
  if (!initialSelectedBid) {
    selectedIncrement = displayIncrements[0]
  } else {
    const selectedNum = Number(initialSelectedBid)
    const lastGoodIncrement = find(
      displayIncrements,
      i => Number(i.value) === selectedNum
    )
    selectedIncrement = lastGoodIncrement || displayIncrements[0]
  }
  return selectedIncrement.value
}

export const BidForm: React.FC<Props> = ({
  onSubmit,
  saleArtwork,
  showPricingTransparency = false,
  initialSelectedBid,
}) => {
  const displayIncrements = dropWhile(
    saleArtwork.increments,
    increment => increment.cents < saleArtwork.minimumNextBid.cents
  ).map(inc => ({ value: inc.cents.toString(), text: inc.display }))

  const selectedBid = getSelectedBid({ initialSelectedBid, displayIncrements })

  return (
    <Box maxWidth={550}>
      <Formik<FormValues>
        initialValues={{
          selectedBid,
          agreeToTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        render={({
          values,
          touched,
          errors,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <Form>
              <Flex flexDirection="column">
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
                  {showPricingTransparency && <PricingTransparency />}
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
            </Form>
          )
        }}
      />
    </Box>
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
