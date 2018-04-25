import React from "react"
import styled from "styled-components"
import Colors from "Assets/Colors"
import { fadeIn, fadeOut } from "Assets/Animations"
import { garamond, unica } from "Assets/Fonts"
import { block } from "./Helpers"
import { borderedInput } from "./Mixins"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: string
  block?: boolean
  label?: string
  title?: string
  description?: string
  quick?: boolean
  leftView?: JSX.Element
  rightView?: JSX.Element
}

interface InputState {
  focused: boolean
  value: string
}

class Input extends React.Component<InputProps, InputState> {
  state = {
    focused: false,
    value: "",
  }

  onFocus = e => {
    this.setState({
      focused: true,
    })

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  onBlur = e => {
    this.setState({
      focused: false,
    })

    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  onChange = e => {
    this.setState({
      value: e.currentTarget.value,
    })
  }

  render() {
    const { error, quick } = this.props

    if (quick) {
      // prettier-ignore
      const {
        label,
        leftView,
        rightView,
        className,
        ref,
        type,
        ...newProps
      } = this.props
      const showLabel = (!!this.state.focused || !!this.state.value) && !!label

      return (
        <Container>
          <InputContainer
            hasLabel={!!label}
            focused={this.state.focused}
            hasError={!!error}
          >
            <Label out={!showLabel}>{label}</Label>
            {!!leftView && leftView}
            <InputComponent
              {...newProps}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onKeyUp={this.onChange}
              value={this.props.value}
              type={type}
            />
            {!!rightView && rightView}
          </InputContainer>
          {!!error && <Error>{error}</Error>}
        </Container>
      )
    }

    const { title, description } = this.props
    return (
      <Container>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        <StyledInput {...this.props as any} />
        {!!error && <Error>{error}</Error>}
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 5px 0;
`

const StyledInput = styled.input`
  ${borderedInput};
  ${block(24)};
`

const InputComponent = styled.input`
  ${garamond("s17")};
  border: 0;
  font-size: 17px;
  outline: none;
  flex: 1;
  transition: transform 0.25s;

  &:active,
  &:focus,
  &:not(:placeholder-shown) {
    transform: translateY(2px);
  }

  &::placeholder {
    color: ${Colors.grayMedium};
  }
`

const InputContainer = styled.div.attrs<{
  hasLabel?: boolean
  focused?: boolean
  hasError: boolean
}>({})`
  ${borderedInput};
  margin-right: 0;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  position: relative;
  height: ${p => (p.hasLabel ? "40px" : "20px")};
  flex-direction: row;
  align-items: center;
`

const Label = styled.label.attrs<{ out: boolean }>({})`
  ${unica("s12", "medium")};
  position: absolute;
  left: 10px;
  top: 7px;
  visibility: ${p => (p.out ? "hidden" : "visible")};
  animation: ${p => (p.out ? fadeOut : fadeIn)} 0.2s linear;
  transition: visibility 0.2s linear;
`

const Title = styled.div`
  ${garamond("s17")};
`

const Description = styled.div`
  ${garamond("s15")};
  color: ${Colors.graySemibold};
  margin: 3px 0 0;
`

const Error = styled.div`
  ${unica("s12")};
  margin-top: 10px;
  color: ${Colors.redMedium};
`

export default Input
