import React from "react"
import styled from "styled-components"
import { InfoContainer } from "../../Utils/InfoContainer"
import { storiesOf } from "storybook/storiesOf"
import { withInfo } from "@storybook/addon-info"
import { Pagination } from "../Pagination"

storiesOf("Styleguide/Components", module).add(
  "Pagination",
  withInfo(`

    Navigation Tabs

  `)(() => {
    return (
      <InfoContainer>
        <Item>
          <Pagination />
        </Item>
      </InfoContainer>
    )
  })
)

const Item = styled.div`
  padding-bottom: 30px;
`
