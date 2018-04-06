import React from "react"
import Title from "../../Title"
import Text from "../../Text"
import Input from "../../Input"
import InvertedButton from "../../Buttons/Inverted"
import colors from "../../../Assets/Colors"
import styled from "styled-components"

const options = ["foo", "bar", "baz"]

export const ShippingForm = props => {
  const label = "Country"

  return (
    <div>
      <Title titleSize="xsmall" fontWeight="bold">
        Shipping details
      </Title>

      <Text textSize="medium">
        Thank you for your interest in the program.<br />
        Have questions? Get in touch
      </Text>

      <Title titleSize="xsmall" fontWeight="bold">
        Shipping address
      </Title>

      <Input placeholder="Full Name" block />
      <Input placeholder="Address Line 1" block />
      <Input placeholder="Address Line 2 (Optional)" block />
      <Input placeholder="City" block />
      <Input placeholder="State / Province / Region" block />
      <Input placeholder="Postal Code" block />

      <div>
        <div className="label">{label}</div>

        <label>
          <select>
            {options.map(option => {
              return <option key={option}>{option}</option>
            })}
          </select>
        </label>
      </div>

      <BorderedSelect>
        <Select id="country">
          <option>foo</option>
          <option>bar</option>
          <option>baz</option>
        </Select>
      </BorderedSelect>

      <InvertedButton block>CONTINUE TO PAYMENT</InvertedButton>

      <Text color={colors.graySemibold} textSize="medium" align="center">
        Questions? Email <a href="mailto:orders@artsy.net">orders@artsy.net.</a>
      </Text>
    </div>
  )
}

const BorderedSelect = styled.label`
  &:before {
    display: block;
    position: absolute;
    content: " ";
    top: 2px;
    right: 2px;
    bottom: 2px;
    width: 24px;
    background-color: #fff;
    border-top: 10px solid #fff;
    border-bottom: 10px solid #fff;
    border-left: 1px solid #e5e5e5;
  }

  &:after {
    display: inline-block;
    content: " ";
    width: 0;
    height: 0;
    vertical-align: middle;
    border-top: 8px solid #ccc;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    margin: 2px 0 4px 4px;
    position: absolute;
    top: 50%;
    right: 9px;
    margin-top: -4px;
  }
`

const Select = styled.select`
  height: 20px;
`
