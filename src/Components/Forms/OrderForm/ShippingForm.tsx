import React from "react"
import Title from "../../Title"
import Text from "../../Text"
import Input from "../../Input"
import InvertedButton from "../../Buttons/Inverted"
import colors from "../../../Assets/Colors"
// import { Link } from "react-router-dom"

export const ShippingForm = props => {
  return (
    <div>
      <Title titleSize="large" fontWeight="bold">
        Shipping details
      </Title>

      <Text textSize="medium">
        Thank you for your interest in the program.<br />
        Have questions? Get in touch
      </Text>

      <Title titleSize="large" fontWeight="bold">
        Shipping address
      </Title>

      <Input placeholder="Full Name" block />
      <Input placeholder="Address Line 1" block />
      <Input placeholder="Address Line 2 (Optional)" block />
      <Input placeholder="City" block />
      <Input placeholder="State / Province / Region" block />
      <Input placeholder="Postal Code" block />
      <Input placeholder="Country" block />

      <InvertedButton block>CONTINUE TO PAYMENT</InvertedButton>

      <Text color={colors.grayDark} textSize="medium" align="center">
        Questions? Email <a href="mailto:orders@artsy.net">orders@artsy.net.</a>
      </Text>
    </div>
  )
}
