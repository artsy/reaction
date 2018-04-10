import Input from "../../../Input"
import InvertedButton from "../../../Buttons/Inverted"
import React, { Fragment } from "react"
import Text from "../../../Text"
import Title from "../../../Title"
import colors from "../../../../Assets/Colors"
import { Grid, Row, Col } from "react-styled-flexboxgrid"

export const ShippingForm = (props: any) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs>
          <Title titleSize="xsmall" fontWeight="bold">
            Shipping details
          </Title>
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
          <Title titleSize="xsmall" fontWeight="bold">
            Shipping address
          </Title>
        </Col>
      </Row>

      <AddressFormInputs />

      <Row>
        <Col xs>
          <InvertedButton block onClick={() => props.nextStep()}>
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
export const AddressFormInputs = ({
  values = {},
  touched = {},
  errors = {},
  handleChange,
  handleBlur,
}: any) => {
  return (
    <Fragment>
      <Row>
        <Col xs>
          <Input
            placeholder="Full Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fullName}
            block
          />
          {touched.fullName && errors.fullName && <div>{errors.fullName}</div>}
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Input placeholder="Address Line 1" block />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Input placeholder="Address Line 2 (Optional)" block />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Input placeholder="City" block />
        </Col>
        <Col xs={6}>
          <Input placeholder="State / Province / Region" block />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Input placeholder="Postal Code" block />
        </Col>
        <Col xs={6}>
          <Input placeholder="Country" block />
        </Col>
      </Row>
    </Fragment>
  )
}
