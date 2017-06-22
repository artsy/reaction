import * as React from "react"
import styled from "styled-components"
import Icon from "./icon"

const Header = styled.header`
  margin: 20px auto;
  font-size: 26px;
  line-height: 1.3;
  text-align: center;
`

const ModalHeader: React.SFC<any> = props =>
  <Header>
    <Icon name="logotype" color="black" />
    {props.children}
  </Header>

export default ModalHeader
