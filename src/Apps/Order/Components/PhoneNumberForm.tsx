import { Flex, Spacer } from "@artsy/palette"
import Input from "Components/Input"
import React from "react"

export type PhoneNumber = string

export type PhoneNumberError = Partial<PhoneNumber>
export type PhoneNumberTouched = boolean
export type PhoneNumberChangeHandler = (phoneNumber: string) => void

export const emptyPhoneNumber: string = ""

export interface PhoneNumberFormProps {
  onChange: PhoneNumberChangeHandler
  value?: string
  title: string
  errors: PhoneNumberError
  touched: PhoneNumberTouched
  label: string
}

interface PhoneNumberFormState {
  phoneNumber: string
}

export class PhoneNumberForm extends React.Component<
  PhoneNumberFormProps,
  PhoneNumberFormState
> {
  state = {
    phoneNumber: this.props.value || emptyPhoneNumber,
  }

  changeEventHandler = phoneNumber => (
    ev: React.FormEvent<HTMLInputElement>
  ) => {
    this.onChangeValue(phoneNumber, ev.currentTarget.value)
  }

  changeValueHandler = phoneNumber => (value: string) => {
    this.onChangeValue(phoneNumber, value)
  }

  onChangeValue = (phoneNumber, value: string) => {
    this.setState({ phoneNumber: value }, () => {
      this.props.onChange(this.state.phoneNumber)
    })
  }

  getError = (phoneNumber): string => {
    return (this.props.touched && this.props.errors) || ""
  }

  render() {
    return (
      <Flex flexDirection="column">
        <Input
          id="PhoneNumberForm_phoneNumber"
          title={this.props.title}
          type="tel"
          description={this.props.label}
          placeholder="Add phone"
          pattern="[^a-z]+"
          value={this.props.value}
          onChange={this.changeEventHandler("phoneNumber")}
          error={this.getError("phoneNumber")}
          block
        />
        <Spacer mb={2} />
      </Flex>
    )
  }
}
