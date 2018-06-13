import React from "react"
import styled from "styled-components"
import { borders, themeGet } from "styled-system"
import { Sans } from "@artsy/palette"

export interface TabsProps {
  labels: string[]
  activeTabIndex?: number
}

export interface TabsState {
  activeTab: number
}

export class Tabs extends React.Component<TabsProps, TabsState> {
  state = {
    activeTab: 0,
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTab: props.activeTabIndex || 0,
    }
  }

  setActiveTab = activeTab => {
    this.setState({ activeTab })
  }

  render() {
    const { labels } = this.props
    const { activeTab } = this.state

    return (
      <TabsContainer>
        {labels.map((label, index) => {
          return activeTab === index ? (
            <ActiveTab key={index}>{label}</ActiveTab>
          ) : (
            <Tab key={index} onClick={() => this.setActiveTab(index)}>
              {label}
            </Tab>
          )
        })}
      </TabsContainer>
    )
  }
}

const Tab = ({ children, ...props }) => (
  <TabContainer {...props}>
    <Sans size="3t" weight="medium" color="black30">
      {children}
    </Sans>
  </TabContainer>
)

const ActiveTab = ({ children }) => (
  <ActiveTabContainer>
    <Sans size="3t" weight="medium">
      {children}
    </Sans>
  </ActiveTabContainer>
)

const TabsContainer = styled.div`
  border-bottom: 1px solid ${themeGet("colors.black10")};
  display: flex;
  margin-bottom: 5px;
`

const TabContainer = styled.div`
  cursor: pointer;
  padding-bottom: 13px;
  margin-bottom: -1px;
  margin-right: 20px;
  ${borders};
`

const ActiveTabContainer = styled.div`
  pointer-events: none;
  padding-bottom: 13px;
  margin-bottom: -1px;
  margin-right: 20px;
  border-bottom: 1px solid ${themeGet("colors.black60")};
`
