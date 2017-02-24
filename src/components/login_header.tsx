import * as React from "react"
import styled from "styled-components"
import Icon from "./icons"

const Header = styled.header`
  margin: 20px;
  font-size: 26px;
  line-height: 1.3;
  text-align: center;
`

export default class LoginHeader extends React.Component<any, null> {
  render() {
    return (
      <div>
        <Header>
          <Icon name={"logotype"} color={"black"} />
        </Header>
      </div>
    )
  }
}
