import InvertedButton from "../../../Buttons/Inverted"
import React, { Component, Fragment } from "react"
import Text from "../../../Text"
import Title from "../../../Title"
import colors from "../../../../Assets/Colors"
import styled from "styled-components"
import { Checkbox } from "../../../Checkbox"
import { Grid, Row, Col } from "react-styled-flexboxgrid"

interface Props {
  gotoStep: (path: string) => void
  nextStep: () => void
}

export class ReviewForm extends Component<Props> {
  state = {
    isComplete: false,
  }

  submitForm = () => {
    this.props.nextStep()

    this.setState({
      isComplete: true,
    })
  }

  goBackToPreviousLocation = () => {
    // TODO
    console.warn("TODO: Back to previous location")
  }

  render() {
    return (
      <Grid fluid>
        {!this.state.isComplete ? (
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
                <InvertedButton block onClick={() => this.submitForm()}>
                  PLACE ORDER
                </InvertedButton>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <Text
                  color={colors.graySemibold}
                  textSize="medium"
                  align="center"
                >
                  Questions? Email{" "}
                  <a href="mailto:orders@artsy.net">orders@artsy.net.</a>
                </Text>
              </Col>
            </Row>
          </Fragment>
        ) : (
          // Submission Complete
          <Fragment>
            <Row>
              <Col xs>
                <Text textSize="medium">
                  <strong>Thank you for your order.</strong> A confirmation
                  email has been sent to you and the seller.
                </Text>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <Text textSize="medium">
                  <strong>What’s next?</strong> The seller will be in touch for
                  pickup or shipping arrangements. If you have questions, please
                  email orders@artsy.net.
                </Text>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <Divider />
              </Col>
            </Row>

            <PaymentMethod />
            <OrderDetails />
            <ShippingAddress />

            <Row>
              <Col xs>
                <Divider />
              </Col>
            </Row>
            <Row>
              <Col xs>
                <InvertedButton
                  block
                  onClick={() => this.goBackToPreviousLocation()}
                >
                  CONTINUE BROWSING
                </InvertedButton>
              </Col>
            </Row>
          </Fragment>
        )}
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
            <Title titleSize="xsmall" fontWeight="bold">
              Shipping Address
            </Title>
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
            <Title titleSize="xsmall" fontWeight="bold">
              Payment method
            </Title>
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
            <Title titleSize="xsmall" fontWeight="bold">
              Order Details
            </Title>
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
