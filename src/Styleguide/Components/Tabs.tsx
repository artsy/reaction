import React, { ReactNode } from "react"
import styled from "styled-components"
import { borders, themeGet, WidthProps } from "styled-system"
import { Sans } from "@artsy/palette"
import { Flex } from "../Elements/Flex"

export interface ActiveTabProps {
  activeTab: {
    index: number
    label: string
  }
}

export interface TabsProps extends WidthProps {
  children?: (activeTab: ActiveTabProps) => ReactNode
  onChange?: (activeTab?: ActiveTabProps) => void
  activeTabIndex?: number
  labels: string[]
}

export interface TabsState {
  activeTabIndex: number
}

export class Tabs extends React.Component<TabsProps, TabsState> {
  state = {
    activeTabIndex: 0,
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTabIndex: props.activeTabIndex || this.state.activeTabIndex,
    }
  }

  setActiveTab = (activeTabIndex, label) => {
    this.setState({
      activeTabIndex,
    })

    if (this.props.onChange) {
      this.props.onChange(this.getActiveTab())
    }
  }

  getActiveTab() {
    const { activeTabIndex } = this.state
    const activeTabLabel = this.props.labels[activeTabIndex]

    return {
      activeTab: {
        index: activeTabIndex,
        label: activeTabLabel,
      },
    }
  }

  render() {
    const { children, labels } = this.props
    const { activeTab } = this.getActiveTab()

    return (
      <React.Fragment>
        <TabsContainer mb={2} width="100%">
          {labels.map((label, index) => {
            return activeTab.index === index ? (
              <ActiveTab key={index}>{label}</ActiveTab>
            ) : (
              <Tab key={index} onClick={() => this.setActiveTab(index, label)}>
                {label}
              </Tab>
            )
          })}
        </TabsContainer>

        {children && (
          <Flex flexDirection="column" width="100%">
            {children({
              activeTab: {
                index: activeTab.index,
                label: activeTab.label,
              },
            })}
          </Flex>
        )}
      </React.Fragment>
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

const TabsContainer = styled(Flex)`
  border-bottom: 1px solid ${themeGet("colors.black10")};
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
