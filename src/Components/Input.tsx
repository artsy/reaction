import { growAndFadeIn } from "Assets/Animations"
import Colors from "Assets/Colors"
import { garamond, unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { block } from "./Helpers"
import { borderedInput } from "./Mixins"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  block?: boolean
  description?: string
  error?: string
  title?: string
  touchedOnChange?: boolean
}

export interface InputState {
  value: string
}

/**
 * Standard input field.
 * The `title` and `description` props are rendered above the input.
 *
 */
export class Input extends React.Component<InputProps, InputState> {
  state = {
    value: (this.props.value as string) || "",
    touchedOnChange: true,
  }

  componentWillReceiveProps(newProps) {
    if (this.props.name !== newProps.name) {
      this.setState({
        value: "",
      })
    }
  }

  onFocus = e => {
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  onBlur = e => {
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  onChange = e => {
    this.setState({
      value: e.currentTarget.value,
    })

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    const { error, title, description, ref, ...rest } = this.props
    return (
      <Container>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        <StyledInput hasError={!!error} {...rest} />
        {error && <InputError>{error}</InputError>}
      </Container>
    )
  }
}

const Container = styled.div`
  padding-bottom: 5px;
`

export const StyledInput = styled.input`
  ${borderedInput};
  ${block(24)};
`

export const Title = styled.div`
  ${garamond("s17")};
`

const Description = styled.div`
  ${garamond("s15")};
  color: ${Colors.graySemibold};
  margin: 3px 0 0;
`

export const InputError = styled.div`
  ${unica("s12")};
  margin-top: 10px;
  color: ${Colors.redMedium};
  transition: visibility 0.2s linear;
  animation: ${growAndFadeIn("16px")} 0.25s linear;
  height: 16px;
`

export default Input
