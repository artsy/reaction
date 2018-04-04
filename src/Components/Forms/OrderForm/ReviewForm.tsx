import React from "react"
import Title from "../../Title"
import Text from "../../Text"
import InvertedButton from "../../Buttons/Inverted"
import { Checkbox } from "../../Checkbox"
import colors from "../../../Assets/Colors"
import styled from "styled-components"
import { Link } from "react-router-dom"

export const ReviewForm = props => {
  return (
    <div>
      <Header>
        <Title titleSize="xsmall" fontWeight="bold">
          Shipping Address
        </Title>

        <Text textSize="medium">
          <Edit to="/shipping">Change</Edit>
        </Text>
      </Header>

      <Text textSize="medium">
        Brian Watterson <br />
        401 Broadway, Suite 25 <br />
        New York, NY 11001
      </Text>

      <Header>
        <Title titleSize="xsmall" fontWeight="bold">
          Payment method
        </Title>

        <Text textSize="medium">
          <Edit to="/payment">Change</Edit>
        </Text>
      </Header>

      <Text textSize="medium">
        Visa ending in 4444 <br />
        Billing address: 33 5th Ave, Apt 8, <br />
        New York, NY 10011
      </Text>

      <Header>
        <Title titleSize="xsmall" fontWeight="bold">
          Review Item
        </Title>
      </Header>

      <Items>
        <Item>
          <ItemContent>
            <Image src="https://d32dm0rphc51dk.cloudfront.net/3cB6grnWE6SE4VDHSoP2ow/large.jpg" />

            <Meta>
              <Artist textSize="medium">Donald Longlaster Ast</Artist>
              <ArtworkTitle textSize="medium">Flowers, 2015</ArtworkTitle>
              <Dimensions textSize="medium">22 1/25 × 21 59/100 in</Dimensions>
            </Meta>
          </ItemContent>

          <Price textSize="medium">$1000</Price>
        </Item>
      </Items>

      <Divider />

      <CenteredCheckbox>
        <Text textSize="medium">
          I agree to the <a href="/TODO">Condition of Sale.</a>
        </Text>
      </CenteredCheckbox>

      <InvertedButton block>REVIEW ORDER</InvertedButton>

      <Text color={colors.graySemibold} textSize="medium" align="center">
        Questions? Email <a href="mailto:orders@artsy.net">orders@artsy.net.</a>
      </Text>
    </div>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Edit = styled(Link)``

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
