import React, { Component, Fragment } from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import styled from "styled-components"
import colors from "../../../../Assets/Colors"
import InvertedButton from "../../../Buttons/Inverted"
import { Checkbox } from "../../../Checkbox"
import Text from "../../../Text"
import Title from "../../../Title"
import { WizardStepChildProps } from "../../../Wizard/types"
import { Contact, StyledGrid as Grid } from "./common"

export class ReviewForm extends Component<WizardStepChildProps> {
  render() {
    return (
      <Grid fluid>
        <Fragment>
          <ShippingAddress editable />
          <PaymentMethod editable />
          <OrderDetails />

          <Row>
            <Col xs>
              <Divider />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <CenteredCheckbox>
                <Text textSize="medium">
                  I agree to the <a href="/TODO">Condition of Sale.</a>
                </Text>
              </CenteredCheckbox>
            </Col>
          </Row>
          <Row>
            <Col xs>
              <InvertedButton block onClick={this.props.form.handleSubmit}>
                PLACE ORDER
              </InvertedButton>
            </Col>
          </Row>
          <Row>
            <Col xs>
              <Contact />
            </Col>
          </Row>
        </Fragment>
      </Grid>
    )
  }
}

const ShippingAddress = props => {
  return (
    <Fragment>
      <Row>
        <Col xs>
          <Header>
            <Title titleSize="small">Shipping Address</Title>
            {props.editable && (
              <Text textSize="medium">
                <Edit onClick={() => this.props.gotoStep("/shipping")}>
                  Change
                </Edit>
              </Text>
            )}
          </Header>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Text textSize="medium">
            Brian Watterson <br />
            401 Broadway, Suite 25 <br />
            New York, NY 11001
          </Text>
        </Col>
      </Row>
    </Fragment>
  )
}

const PaymentMethod = props => {
  return (
    <Fragment>
      <Row>
        <Col xs>
          <Header>
            <Title titleSize="small">Payment method</Title>
            {props.editable && (
              <Text textSize="medium">
                <Edit onClick={() => this.props.gotoStep("/payment")}>
                  Change
                </Edit>
              </Text>
            )}
          </Header>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Text textSize="medium">
            Visa ending in 4444 <br />
            Billing address: 33 5th Ave, Apt 8, <br />
            New York, NY 10011
          </Text>
        </Col>
      </Row>
    </Fragment>
  )
}

const OrderDetails = props => {
  return (
    <Fragment>
      <Row>
        <Col xs>
          <Header>
            <Title titleSize="small">Order Details</Title>
          </Header>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <Items>
            <Item>
              <ItemContent>
                <Image src="https://d32dm0rphc51dk.cloudfront.net/3cB6grnWE6SE4VDHSoP2ow/large.jpg" />
                <Meta>
                  <Artist textSize="medium">Donald Longlaster Ast</Artist>
                  <ArtworkTitle textSize="medium">Flowers, 2015</ArtworkTitle>
                  <Dimensions textSize="medium">
                    22 1/25 × 21 59/100 in
                  </Dimensions>
                </Meta>
              </ItemContent>
              <Price textSize="medium">$1000</Price>
            </Item>
          </Items>
        </Col>
      </Row>
    </Fragment>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Edit = styled.a`
  text-decoration: underline;
  cursor: pointer;
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
`

const ItemContent = styled.div`
  display: flex;
`

const Image = styled.img`
  background-image: url(${(p: { src: string }) => p.src});
  width: 60px;
  height: 60px;
  background-position: center;
  background-size: cover;
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
`

const MetaText = Text.extend`
  line-height: 1;
  margin: 0;
`

const Price = MetaText.extend`
  font-weight: bold;
`
const Artist = MetaText.extend``
const ArtworkTitle = MetaText.extend``
const Dimensions = MetaText.extend``

const Divider = styled.hr`
  margin-top: 40px;
  border: 0;
  background-color: ${colors.grayRegular};
  height: 1px;
`

const CenteredCheckbox = styled(Checkbox)`
  display: flex;
  justify-content: center;
`
