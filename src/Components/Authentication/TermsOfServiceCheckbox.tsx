import Colors from "Assets/Colors"
import Checkbox from "Components/Checkbox"
import Text from "Components/Text"
import React from "react"
import styled from "styled-components"

export const TermsOfServiceCheckbox = ({
  error,
  name,
  onChange,
  onBlur,
  value,
  ...props
}) => (
  <StyledCheckbox {...{ checked: value, error, onChange, onBlur, name }}>
    <TOSText color={error ? Colors.redMedium : Colors.graySemibold}>
      {"I agree to Artsy’s "}
      <A
        href="https://www.artsy.net/terms"
        target="_blank"
        color={error ? Colors.redMedium : Colors.graySemibold}
      >
        Terms Of Use
      </A>
      {" and "}
      <A
        href="https://www.artsy.net/privacy"
        target="_blank"
        color={error ? Colors.redMedium : Colors.graySemibold}
      >
        Privacy Policy
      </A>
      {", and to receive emails from Artsy."}
    </TOSText>
  </StyledCheckbox>
)

const StyledCheckbox = styled(Checkbox)`
  margin: 5px 0;
  align-items: flex-start;
`
const A = styled.a`
  color: ${props => props.color};
`

export const TOSText = styled(Text)`
  margin: 0 0 0 5px;
  line-height: 22px;
`
