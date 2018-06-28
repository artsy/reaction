import { Sans } from "@artsy/palette"
import React from "react"
import styled, { css } from "styled-components"
import {
  borders,
  JustifyContentProps,
  themeGet,
  WidthProps,
} from "styled-system"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"

export interface TabLike extends JSX.Element {
  props: TabProps
}

export interface TabInfo {
  /** Display name of the newly selected Tab */
  name: string

  /** Index of the newly selected Tab */
  tabIndex: number

  /** Data associated with the newly selected Tab */
  data: any
}

export interface TabsProps extends WidthProps, JustifyContentProps {
  /** Function that will be called when a new Tab is selected */
  onChange?: (tabInfo?: TabInfo) => void

  /** Index of the Tab that should be pre-selected */
  initialTabIndex?: number

  children: TabLike[]
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

    const activeTabIndex = props.initialTabIndex || 0
    this.state = {
      activeTabIndex,
    }
  }

  setActiveTab = activeTabIndex => {
    this.setState({
      activeTabIndex,
    })
    if (this.props.onChange) {
      this.props.onChange({
        tabIndex: activeTabIndex,
        name: this.props.children[activeTabIndex].props.name,
        data: this.props.children[activeTabIndex].props.data,
      })
    }
  }

  renderTab = (tab, index) => {
    const { name } = tab.props
    return this.state.activeTabIndex === index ? (
      <ActiveTabButton key={index}>{name}</ActiveTabButton>
    ) : (
      <TabButton key={index} onClick={() => this.setActiveTab(index)}>
        {name}
      </TabButton>
    )
  }

  render() {
    const { children = [], justifyContent = "left" } = this.props

    return (
      <React.Fragment>
        <TabsContainer mb={0.5} width="100%" justifyContent={justifyContent}>
          {children.map(this.renderTab)}
        </TabsContainer>
        <Box pt={3}>{children[this.state.activeTabIndex]}</Box>
      </React.Fragment>
    )
  }
}

interface TabProps {
  /** Display name of the Tab */
  name: string

  /**
   * Arbitrary data that can be associated with a Tab.
   *
   * Will be passed to the parent <Tabs>'s onChange handler.
   */
  data?: any
}

export class Tab extends React.Component<TabProps> {
  render() {
    return this.props.children || null
  }
}

const TabButton = ({ children, ...props }) => (
  <TabContainer {...props}>
    <Sans size="3t" weight="medium" color="black30">
      {children}
    </Sans>
  </TabContainer>
)

const ActiveTabButton = ({ children }) => (
  <ActiveTabContainer>
    <Sans size="3t" weight="medium">
      {children}
    </Sans>
  </ActiveTabContainer>
)

// Share with <RouterTabs />
export const styles = {
  tabsContainer: css`
    border-bottom: 1px solid ${themeGet("colors.black10")};
  `,

  tabContainer: css`
    cursor: pointer;
    padding-bottom: 13px;
    margin-bottom: -1px;
    margin-right: 20px;
    white-space: nowrap;
    ${borders};
  `,

  activeTabContainer: css`
    pointer-events: none;
    padding-bottom: 13px;
    margin-bottom: -1px;
    margin-right: 20px;
    white-space: nowrap;
    border-bottom: 1px solid ${themeGet("colors.black60")};
  `,
}

const TabsContainer = styled(Flex)`
  ${styles.tabsContainer};
`

const TabContainer = styled.div`
  ${styles.tabContainer};
`

const ActiveTabContainer = styled.div`
  ${styles.activeTabContainer};
`
