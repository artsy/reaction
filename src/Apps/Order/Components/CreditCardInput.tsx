import { color, Sans } from "@artsy/palette"
import { BorderBox, color } from "@artsy/palette"
import { fontFamily } from "@artsy/palette/dist/platform/fonts"
import {
  border as inputBorder,
  BorderProps as InputBorderProps,
} from "Components/Mixins"
import React from "react"
import { CardElement } from "react-stripe-elements"
import styled from "styled-components"

export const StyledCardElement = styled(CardElement)`
  width: 100%;
`

// Re-uses old input border behavior
const StyledBorderBox = styled(BorderBox).attrs<InputBorderProps>({})`
  ${inputBorder};
`

interface CreditCardInputProps {
  error?: stripe.Error
}

interface CreditCardInputState {
  focused: boolean
  error: stripe.Error
}

export class CreditCardInput extends React.Component<
  CreditCardInputProps,
  CreditCardInputState
> {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
      error: props.error || {},
    }
  }

  render() {
    const { message } = this.state.error || { message: null }

    return (
      <>
        <StyledBorderBox
          className={`${this.state.focused ? "focused" : ""}`}
          hasError={!!message}
          p={1}
        >
          <StyledCardElement
            onChange={res => {
              this.setState({ error: res.error })
            }}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            style={{
              base: {
                "::placeholder": {
                  color: color("black30"),
                },
                fontFamily: fontFamily.serif.regular as string,
                fontSmoothing: "antialiased",
                lineHeight: "20px",
              },
            }}
          />
        </StyledBorderBox>
        {message && (
          <Sans pt={1} size="2" color="red100">
            {message}
          </Sans>
        )}
      </>
    )
  }
}
