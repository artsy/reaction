import Input from "../../../Input"
import InvertedButton from "../../../Buttons/Inverted"
import React from "react"
import Text from "../../../Text"
import Title from "../../../Title"
import colors from "../../../../Assets/Colors"
import { Checkbox } from "../../../Checkbox"
import { Grid, Row, Col } from "react-styled-flexboxgrid"

export const PaymentForm = props => {
  return (
    <Grid fluid>
      <Row>
        <Col xs>
          <Title titleSize="xsmall" fontWeight="bold">
            Payment method
          </Title>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Input placeholder="Name on card" block />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Input placeholder="Card number" block />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Input placeholder="Expiration" block />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Input placeholder="Security code" block />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Title titleSize="xsmall" fontWeight="bold">
            Billing address
          </Title>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Checkbox>Same as shipping</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <InvertedButton block onClick={() => props.nextStep()}>
            REVIEW ORDER
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
