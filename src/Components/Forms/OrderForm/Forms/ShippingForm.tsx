import { Field } from "../../support"
import InvertedButton from "../../../Buttons/Inverted"
import React, { Fragment } from "react"
import Text from "../../../Text"
import Title from "../../../Title"
import colors from "../../../../Assets/Colors"
import { Grid, Row, Col } from "react-styled-flexboxgrid"
import { WizardStepChildProps } from "../../../Wizard/types"

export const ShippingForm: React.SFC<WizardStepChildProps> = ({
  form,
  wizard,
}) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs>
          <Title titleSize="medium">Shipping details</Title>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Text textSize="medium">
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
          <Text color={colors.graySemibold} textSize="medium" align="center">
            Questions? Email{" "}
            <a href="mailto:orders@artsy.net">orders@artsy.net.</a>
          </Text>
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
            placeholder="Full Name"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Field
            name={billing ? "billingAddressLine1" : "addressLine1"}
            placeholder="Address Line 1"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Field
            name={billing ? "billingAddressLine2" : "addressLine2"}
            type="text"
            placeholder="Address Line 2 (Optional)"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            name={billing ? "billingCity" : "city"}
            type="text"
            placeholder="City"
            block
          />
        </Col>
        <Col xs={6}>
          <Field
            name={billing ? "billingState" : "state"}
            type="text"
            placeholder="State / Province / Region"
            block
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            type="text"
            name={billing ? "billingPostalCode" : "postalCode"}
            placeholder="Postal Code"
            block
          />
        </Col>
        <Col xs={6}>
          <Field
            type="text"
            name={billing ? "billingCountry" : "country"}
            placeholder="Country"
            block
          />
        </Col>
      </Row>
    </Fragment>
  )
}
