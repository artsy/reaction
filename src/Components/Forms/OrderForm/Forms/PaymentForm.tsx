import Input from "../../../Input"
import InvertedButton from "../../../Buttons/Inverted"
import React, { Component } from "react"
import Text from "../../../Text"
import Title from "../../../Title"
import colors from "../../../../Assets/Colors"
import { AddressFormInputs } from "./ShippingForm"
import { Checkbox } from "../../../Checkbox"
import { Grid, Row, Col } from "react-styled-flexboxgrid"

interface Props {
  nextStep: () => void
}

interface State {
  showPaymentAddress: boolean
}

export class PaymentForm extends Component<Props, State> {
  state = {
    showPaymentAddress: false,
  }

  toggleShowPaymentAddress = () => {
    const showPaymentAddress = !this.state.showPaymentAddress

    this.setState({
      showPaymentAddress,
    })
  }

  render() {
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

        {/* Spacer */}
        <Row>
          <Col>&nbsp;</Col>
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
            <Checkbox checked onClick={() => this.toggleShowPaymentAddress()}>
              Same as shipping
            </Checkbox>
          </Col>
        </Row>

        {/* Spacer */}
        <Row>
          <Col>&nbsp;</Col>
        </Row>

        {this.state.showPaymentAddress && <AddressFormInputs {...this.props} />}

        {/* Spacer */}
        <Row>
          <Col>&nbsp;</Col>
        </Row>

        <Row>
          <Col xs>
            <InvertedButton block onClick={() => this.props.nextStep()}>
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
}
