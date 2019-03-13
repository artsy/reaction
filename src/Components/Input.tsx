import { Box, color, space } from "@artsy/palette"
import { growAndFadeIn } from "Assets/Animations"
import { garamond, unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { block } from "./Helpers"
import { borderedInput } from "./Mixins"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  block?: boolean
  description?: string
  error?: string
  ref?: React.RefObject<any>
  title?: string
}

/**
 * Standard input field.
 * The `title` and `description` props are rendered above the input.
 *
 */
export const Input: React.ExoticComponent<InputProps> = React.forwardRef(
  ({ error, title, description, ...rest }, ref) => {
    return (
      <Box>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        <StyledInput ref={ref} hasError={!!error} {...rest} />
        {error && <InputError>{error}</InputError>}
      </Box>
    )
  }
)

export const StyledInput = styled.input`
  ${borderedInput};
  ${block(24)};
`

export const Title = styled.div`
  ${garamond("s17")};
`

const Description = styled.div`
  ${garamond("s15")};
  color: ${color("black60")};
  margin: ${space(0.3)}px 0 0;
`

export const InputError = styled.div`
  ${unica("s12")};
  margin-top: ${space(1)}px;
  color: ${color("red100")};
  transition: visibility 0.2s linear;
  animation: ${growAndFadeIn("16px")} 0.25s linear;
  height: 16px;
`

export default Input
