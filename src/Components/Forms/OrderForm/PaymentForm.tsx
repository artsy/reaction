import React from "react"
import Title from "../../Title"
import Text from "../../Text"
import Input from "../../Input"
import InvertedButton from "../../Buttons/Inverted"
import { Checkbox } from "../../Checkbox"
import colors from "../../../Assets/Colors"
// import { Link } from "react-router-dom"

export const PaymentForm = props => {
  return (
    <div>
      <Title titleSize="xsmall" fontWeight="bold">
        Payment method
      </Title>

      <Input placeholder="Name on card" block />
      <Input placeholder="Card number" block />
      <Input placeholder="Expiration" block />
      <Input placeholder="Security code" block />

      <Title titleSize="xsmall" fontWeight="bold">
        Billing address
      </Title>

      <Checkbox>Same as shipping</Checkbox>

      <InvertedButton block>REVIEW ORDER</InvertedButton>

      <Text color={colors.graySemibold} textSize="medium" align="center">
        Questions? Email <a href="mailto:orders@artsy.net">orders@artsy.net.</a>
      </Text>
    </div>
  )
}
