import * as React from "react"
import styled from "styled-components"
import Icon from "./icon"
import Title from "./title"

const Header = styled.header`
  margin: 20px auto;
  font-size: 26px;
  line-height: 1.3;
  text-align: center;
  width: 400px;
`

export default class LoginHeader extends React.Component<any, null> {
  render() {
    return (
      <div>
        <Header>
          <Icon name={"logotype"} color={"black"} />
          <Title titleSize={'small'}>
            {this.props.title}
          </Title>
        </Header>
      </div>
    )
  }
}
