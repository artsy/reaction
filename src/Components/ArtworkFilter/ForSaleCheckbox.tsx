import * as React from "react"

import Checkbox from "../Checkbox"

import styled from "styled-components"
import colors from "../../Assets/Colors"
import { primary } from "../../Assets/Fonts"

interface Props extends React.HTMLProps<ForSaleCheckbox> {
  onClick?: any
}

interface State {
  isChecked: boolean
}

export class ForSaleCheckbox extends React.Component<Props, State> {
  state = {
    isChecked: false,
  }

  onClick() {
    this.setState({
      isChecked: !this.state.isChecked,
    })
    this.props.onClick()
  }

  render() {
    const { isChecked } = this.state

    return (
      <div className={this.props.className} onClick={() => this.onClick()}>
        <StyledCheckbox checked={isChecked} />
        <label>Only for Sale</label>
      </div>
    )
  }
}

const StyledCheckbox = styled(Checkbox)`
  margin-right: 15px
`

const StyledForSaleCheckbox = styled(ForSaleCheckbox)`
  display: inline-block;
  border: 1px solid ${colors.grayRegular};
  font-size: 13px;
  line-height: 160%;
  padding: 15px 18px;
  font-size: 13px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${primary.style}
`

export default StyledForSaleCheckbox
