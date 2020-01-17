import { Flex, Join, Sans, Serif, Spacer } from "@artsy/palette"
import Input from "Components/Input"
import React from "react"

export type PhoneNumber = string

export type PhoneNumberErrors = Partial<PhoneNumber>
export type PhoneNumberTouched = Partial<{ [T in keyof PhoneNumber]: boolean }>
export type PhoneNumberChangeHandler = (phoneNumber: string) => void

export const emptyPhoneNumber: string = ""

export interface PhoneNumberFormProps {
  onChange: PhoneNumberChangeHandler
  value?: string
  errors: PhoneNumberErrors
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

  changeEventHandler = PhoneNumber => (
    ev: React.FormEvent<HTMLInputElement>
  ) => {
    this.onChangeValue(PhoneNumber, ev.currentTarget.value)
  }

  changeValueHandler = PhoneNumber => (value: string) => {
    this.onChangeValue(PhoneNumber, value)
  }

  onChangeValue = (PhoneNumber, value: string) => {
    this.setState({ phoneNumber: value }, () => {
      this.props.onChange(this.state.phoneNumber)
    })
  }

  getError = (PhoneNumber): string => {
    return (this.props.touched && this.props.errors) || ""
  }

  render() {
    return (
      <Flex flexDirection="column">
        <Input
          id="PhoneNumberForm_phoneNumber"
          title="Phone number"
          type="tel"
          description={this.props.label}
          placeholder="Add phone"
          pattern="[^a-z]+"
          value={this.props.value}
          onChange={this.changeEventHandler("phoneNumber")}
          error={this.getError("phoneNumber")}
          block
        />
      </Flex>
    )
  }
}
