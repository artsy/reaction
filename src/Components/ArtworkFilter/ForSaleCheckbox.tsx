import React, { Component, HTMLProps } from "react"

import Checkbox from "../Checkbox"

import styled from "styled-components"
import colors from "../../Assets/Colors"
import { primary } from "../../Assets/Fonts"

export class ForSaleCheckbox extends Component<HTMLProps<Checkbox>, null> {
  render() {
    return (
      <CheckboxContainer>
        <Checkbox {...this.props}>Only for Sale</Checkbox>
      </CheckboxContainer>
    )
  }
}

const CheckboxContainer = styled.div`
  border: 1px solid ${colors.grayRegular};
  padding: 15px 18px;
  font-size: 13px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${primary.style};
`

export default ForSaleCheckbox
