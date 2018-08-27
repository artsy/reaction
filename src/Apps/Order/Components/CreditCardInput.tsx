import { color } from "@artsy/palette"
import { fontFamily } from "@artsy/palette/dist/platform/fonts"
import { border } from "Components/Mixins"
import React from "react"
import { CardElement } from "react-stripe-elements"
import styled from "styled-components"
import { BorderBox } from "Styleguide/Elements/Box"

const StyledCardElement = styled(CardElement)`
  width: 100%;
`

interface StyledBorderBox {
  hasError: boolean
}
const StyledBorderBox = styled(BorderBox).attrs<StyledBorderBox>({})`
  ${border};
`

export class CreditCardInput extends React.Component {
  state = {
    focused: false,
    error: false,
  }

  render() {
    return (
      <StyledBorderBox
        className={`${this.state.focused ? "focused" : ""}`}
        hasError={this.state.error}
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
    )
  }
}
