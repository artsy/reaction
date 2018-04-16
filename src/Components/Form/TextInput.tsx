import React from "react"
import styled, { StyledFunction } from "styled-components"
import colors from "../../Assets/Colors"

type Styled<P, T> = StyledFunction<P & React.HTMLProps<T>>
type StyledDiv<P> = Styled<P, HTMLDivElement>
type StyledInput<P> = Styled<P, HTMLInputElement>

const breakpoints = {
  medium: "768px",
}

const formControlStyle = `
  width: 100%;
  display: block;
  height: 36px;
  padding: 6px 12px;
  font-size: 16px;
  line-height: 1.428571429;
  color: black;
  background-color: white;
  background-image: none;
  border: solid 2px ${colors.grayRegular};
  border-radius: 0px;
  outline: 0;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  &::placeholder {
    color: ${colors.grayMedium};
  }

  &:focus {
    border-color: ${colors.purpleRegular};
  }
`

interface Props {
  isError?: boolean
  flexBasis?: string
}

const input: StyledInput<Props> = styled.input

export const TextInput = input.attrs({ type: "text" })`
  ${formControlStyle}
  width: 100%;
  @media (min-width: ${breakpoints.medium}) {
    flex-basis: ${props => props.flexBasis || "100%"};
  }
  ${props =>
    props.isError &&
    `
      border-color: ${colors.redBold};
      &:focus {
        border-color: ${colors.redBold};
      }
    `};
`
TextInput.displayName = "TextInput"

const withInitialFocus = WrappedComponent => {
  interface Focusable {
    focus()
  }

  interface HasFocusable {
    focusable?: Focusable
  }

  return class extends React.Component implements HasFocusable {
    focusable = null

    componentDidMount() {
      if (this.focusable) {
        this.focusable.focus()
      }
    }

    render() {
      return (
        <WrappedComponent
          innerRef={el => {
            this.focusable = el
          }}
          {...this.props}
        />
      )
    }
  }
}

export const InitiallyFocusedTextInput = withInitialFocus(TextInput)

const div: StyledDiv<Props> = styled.div

const InlineMessage = div`
  margin-top: 10px;
  flex-basis: ${props => props.flexBasis || "100%"};
`

const withInlineMessage = WrappedComponent => {
  // could probably use some type info here...
  return ({ message, flexBasis, ...props }) => {
    return (
      <div style={{ flexBasis }}>
        <WrappedComponent {...props} />
        {message && <InlineMessage>{message}</InlineMessage>}
      </div>
    )
  }
}

export const TextInputWithInlineMessage = withInlineMessage(TextInput)

export default TextInput
