import React, { Fragment } from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import InvertedButton from "../../../Buttons/Inverted"
import Text from "../../../Text"
import Title from "../../../Title"
import { WizardStepChildProps } from "../../../Wizard/types"
import { Field } from "../../support"
import { Contact, StyledGrid as Grid } from "./common"

export const ShippingForm: React.SFC<WizardStepChildProps> = ({
  form,
  wizard,
}) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs>
          <Title titleSize="small">Shipping details</Title>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Text style={{ lineHeight: 1.63 }} textSize="medium">
            Upon processing your order, an Artsy Specialist will connect you
            with the seller for shipping arrangements. Any shipping fees will be
            collected at that time.
          </Text>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Title titleSize="small">Shipping address</Title>
        </Col>
      </Row>

      <AddressFormInputs />

      <Row>
        <Col xs>
          <InvertedButton block onClick={form.handleSubmit}>
            CONTINUE TO PAYMENT
          </InvertedButton>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Contact />
        </Col>
      </Row>
    </Grid>
  )
}

// Imported in `PaymentForm` if addresss is different than shipping
export const AddressFormInputs = ({ billing = false }) => {
  return (
    <Fragment>
      <Row>
        <Col xs>
          <Field
            name={billing ? "billingFullName" : "fullName"}
            type="text"
            title="Full Name"
            placeholder="Enter your full name"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Field
            name={billing ? "billingAddressLine1" : "addressLine1"}
            title="Address Line 1"
            placeholder="Enter your street address"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Field
            name={billing ? "billingAddressLine2" : "addressLine2"}
            type="text"
            title="Address Line 2 (Optional)"
            placeholder="Enter your apt, floor, suite, etc"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            name={billing ? "billingCity" : "city"}
            type="text"
            title="City"
            placeholder="Enter your city"
            block
          />
        </Col>
        <Col xs={6}>
          <Field
            name={billing ? "billingState" : "state"}
            type="text"
            title="State, province, or region"
            placeholder="Enter your state, province, or region"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            type="text"
            name={billing ? "billingPostalCode" : "postalCode"}
            title="Postal code"
            placeholder="Enter your postal Code"
            block
          />
        </Col>
        <Col xs={6}>
          <Field
            type="text"
            name={billing ? "billingCountry" : "country"}
            title="Country"
            placeholder="Select your country"
            block
          />
        </Col>
      </Row>
    </Fragment>
  )
}
