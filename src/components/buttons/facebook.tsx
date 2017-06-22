import * as React from "react"
import styled from "styled-components"
import Icon from "../icon"
import Button, { ButtonProps } from "./default"

const FacebookButton = (props: ButtonProps) => {
  const icon = <Icon name="facebook" color="white" />
  return <Button {...props} icon={icon}>Log in with Facebook</Button>
}

export default styled(FacebookButton)`
  background: #39439C;
  color: white;
  height: 40px;
  padding: 0 30px;
  margin: 10px auto 2px;
  flex-direction: row;

  &:hover:not(:disabled) {
    background: #252C68;
  }
`
