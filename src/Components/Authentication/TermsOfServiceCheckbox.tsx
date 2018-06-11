import React from "react"
import styled from "styled-components"
import Checkbox from "../Checkbox"
import Text from "../Text"
import Colors from "../../Assets/Colors"
import TextLink from "../TextLink"

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
      <TextLink
        href="https://www.artsy.net/terms"
        target="_blank"
        color={error ? Colors.redMedium : Colors.graySemibold}
      >
        Terms Of Service
      </TextLink>
      {" and "}
      <TextLink
        href="https://www.artsy.net/privacy"
        target="_blank"
        color={error ? Colors.redMedium : Colors.graySemibold}
      >
        Privacy Policy
      </TextLink>
      {" and to receive emails from Artsy."}
    </TOSText>
  </StyledCheckbox>
)

const StyledCheckbox = styled(Checkbox)`
  margin: 5px 0;
  align-items: flex-start;
`

export const TOSText = styled(Text)`
  margin: 0 0 0 5px;
  line-height: 22px;
`
