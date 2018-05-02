import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import Colors from "Assets/Colors"

import { MobileRegisterForm } from "../RegisterForm"

const MobileContainer = styled.div`
  border: 1px solid ${Colors.grayRegular};
  display: flex;
  width: 320px;
  height: 460px;
  margin: 0 auto;
  align-self: center;
  justify-content: center;

  form {
    width: 100%;
  }
`

storiesOf("Components/Auth/Mobile", module).add("RegisterForm", () => (
  <MobileContainer>
    <MobileRegisterForm
      values={{}}
      handleSubmit={() => null}
      handleChangeMode={() => mode => null}
    />
  </MobileContainer>
))
