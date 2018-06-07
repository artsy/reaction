import React from "react"
import styled from "styled-components"
import { borders, themeGet } from "styled-system"
import { Display } from "../Elements/Typography"

export interface TabsProps {
  labels: any[]
}

export class Tabs extends React.Component<TabsProps> {
  state = {
    activeTab: 0,
  }

  setActiveTab = activeTab => {
    this.setState({ activeTab })
  }

  render() {
    return (
      <TabsContainer>
        {this.props.labels.map((label, index) => {
          return this.state.activeTab === index ? (
            <ActiveTab key={index}>{label}</ActiveTab>
          ) : (
            <Tab key={index} onPress={() => this.setActiveTab(index)}>
              {label}
            </Tab>
          )
        })}
      </TabsContainer>
    )
  }
}

const Tab = ({ children, ...props }) => (
  <TabContainer>
    <Display size="3t">{children}</Display>
  </TabContainer>
)

const ActiveTab = ({ children, ...props }) => (
  <ActiveTabContainer>
    <Display size="3t">{children}</Display>
  </ActiveTabContainer>
)

const TabsContainer = styled.div`
  height: 10px;
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${themeGet("colors.black10")};
  margin-bottom: 5px;
`

const TabContainer = styled.div`
  padding-bottom: 13px;
  margin-bottom: -1px;
  margin-right: 20px;
  ${borders};
`

const ActiveTabContainer = styled.div`
  padding-bottom: 13px;
  margin-bottom: -1px;
  margin-right: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${themeGet("colors.black60")};
`
