import {
  Box,
  Button,
  Flex,
  LargeSelect,
  Sans,
  Separator,
  Serif,
} from "@artsy/palette"
import { BidForm_me } from "__generated__/BidForm_me.graphql"
import { BidForm_saleArtwork } from "__generated__/BidForm_saleArtwork.graphql"
import { PricingTransparency } from "Apps/Auction/Components/PricingTransparency"
import { ConditionsOfSaleCheckbox } from "Components/Auction/ConditionsOfSaleCheckbox"
import { Form, Formik, FormikActions, FormikValues } from "formik"
import { dropWhile, find } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Yup from "yup"

import { CreditCardInstructions } from "Apps/Auction/Components/CreditCardInstructions"
import { Address, AddressForm } from "Apps/Order/Components/AddressForm"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"

interface Props {
  initialSelectedBid?: string
  me: BidForm_me
  onSubmit: (values: FormikValues, actions: FormikActions<object>) => void
  saleArtwork: BidForm_saleArtwork
  showPricingTransparency?: boolean
}

export interface FormValues {
  address?: Address
  agreeToTerms: boolean
  creditCard?: string
  selectedBid: string
}

Yup.addMethod(Yup.string, "present", function(message) {
  return this.test("test-present", message, value => {
    return this.trim()
      .required(message)
      .isValid(value)
  })
})

const validationSchemaForRegisteredUsers = Yup.object().shape({
  selectedBid: Yup.string().required(),
})

const validationSchemaForUnregisteredUsersWithCreditCard = Yup.object().shape({
  selectedBid: Yup.string().required(),
  agreeToTerms: Yup.bool().oneOf(
    [true],
    "You must agree to the Conditions of Sale"
  ),
})

const validationSchemaForUnregisteredUsersWithoutCreditCard = Yup.object().shape(
  {
    selectedBid: Yup.string().required(),
    address: Yup.object({
      name: Yup.string().present("Name is required"),
      addressLine1: Yup.string().present("Address is required"),
      country: Yup.string().present("Country is required"),
      city: Yup.string().present("City is required"),
      region: Yup.string().present("State is required"),
      postalCode: Yup.string().present("Postal code is required"),
      phoneNumber: Yup.string().present("Telephone is required"),
    }),
    agreeToTerms: Yup.bool().oneOf(
      [true],
      "You must agree to the Conditions of Sale"
    ),
  }
)

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

export const determineDisplayRequirements = (
  bidder: BidForm_saleArtwork["sale"]["registrationStatus"],
  me: BidForm_me
) => {
  const isRegistered = !!bidder

  return {
    requiresCheckbox: !isRegistered,
    requiresPaymentInformation: !(isRegistered || me.hasQualifiedCreditCards),
  }
}

export const BidForm: React.FC<Props> = ({
  initialSelectedBid,
  me,
  onSubmit,
  saleArtwork,
  showPricingTransparency = false,
}) => {
  const displayIncrements = dropWhile(
    saleArtwork.increments,
    increment => increment.cents < saleArtwork.minimumNextBid.cents
  ).map(inc => ({ value: inc.cents.toString(), text: inc.display }))

  const selectedBid = getSelectedBid({ initialSelectedBid, displayIncrements })
  const {
    requiresCheckbox,
    requiresPaymentInformation,
  } = determineDisplayRequirements(saleArtwork.sale.registrationStatus, me)
  const validationSchema = requiresCheckbox
    ? requiresPaymentInformation
      ? validationSchemaForUnregisteredUsersWithoutCreditCard
      : validationSchemaForUnregisteredUsersWithCreditCard
    : validationSchemaForRegisteredUsers

  return (
    <Box maxWidth={550}>
      <Formik<FormValues>
        initialValues={{
          selectedBid,
          agreeToTerms: false,
          address: {
            name: "",
            country: "",
            postalCode: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            region: "",
            phoneNumber: "",
          },
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
          status,
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

                {requiresPaymentInformation && (
                  <Box>
                    <Separator mb={3} />
                    <CreditCardInstructions />

                    <Serif
                      mt={4}
                      mb={2}
                      size="4t"
                      weight="semibold"
                      color="black100"
                    >
                      Card Information
                    </Serif>

                    <CreditCardInput
                      error={{ message: errors.creditCard } as stripe.Error}
                    />

                    <Box mt={2}>
                      <AddressForm
                        value={values.address}
                        onChange={address => setFieldValue("address", address)}
                        errors={errors.address}
                        touched={touched.address}
                        billing
                        showPhoneNumberInput
                      />
                    </Box>
                  </Box>
                )}

                <Flex
                  pb={3}
                  flexDirection="column"
                  justifyContent="center"
                  width="100%"
                >
                  {requiresCheckbox && (
                    <>
                      <Separator mb={3} />

                      <Box mx="auto" mb={3}>
                        <ConditionsOfSaleCheckbox
                          selected={values.agreeToTerms}
                          onSelect={value => {
                            setFieldValue("agreeToTerms", value)
                            setFieldTouched("agreeToTerms")
                          }}
                        />
                        {touched.agreeToTerms && errors.agreeToTerms && (
                          <Sans
                            mt={1}
                            color="red100"
                            size="2"
                            textAlign="center"
                          >
                            {errors.agreeToTerms}
                          </Sans>
                        )}
                      </Box>
                    </>
                  )}

                  {status && (
                    <Sans textAlign="center" size="3" color="red100" mb={2}>
                      {status}.
                    </Sans>
                  )}

                  <Button
                    size="large"
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
      sale {
        registrationStatus {
          qualifiedForBidding: qualified_for_bidding
        }
      }
    }
  `,
  me: graphql`
    fragment BidForm_me on Me {
      hasQualifiedCreditCards: has_qualified_credit_cards
    }
  `,
})
