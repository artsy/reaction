import React from "react"
import styled from "styled-components"
import { InfoContainer } from "../../Utils/InfoContainer"
import { storiesOf } from "storybook/storiesOf"
import { withInfo } from "@storybook/addon-info"
import { Tabs } from "../Tabs"

storiesOf("Styleguide/Components", module).add(
  "Tabs",
  withInfo(`

    Navigation Tabs

  `)(() => {
    return (
      <InfoContainer>
        <Item>
          <Tabs
            labels={[
              "Overview",
              "CV",
              "Shows",
              "Auction Results",
              "Articles",
              "Related Artists",
            ]}
          />
        </Item>
        <Item>
          <Tabs
            activeTabIndex={1}
            labels={["About the work", "Exhibition history", "Bibliography"]}
          />
        </Item>
      </InfoContainer>
    )
  })
)

const Item = styled.div`
  padding-bottom: 30px;
`
