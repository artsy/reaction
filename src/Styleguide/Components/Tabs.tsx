import { Sans } from "@artsy/palette"
import React from "react"
import { PreloadLink } from "Router"
import { PreloadLinkProps } from "Router/types"
import styled from "styled-components"
import { borders, themeGet, WidthProps } from "styled-system"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"

export interface TabLike extends JSX.Element {
  props: TabProps
}
export interface TabInfo {
  name: string
  tabIndex: number
}
export interface TabsProps extends WidthProps {
  onChange?: (tabInfo?: TabInfo) => void
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
      })
    }
  }

  renderTab = (tab, index) => {
    const { name, children, ...preloadProps } = tab.props
    const buttonContent = Object.keys(preloadProps).length ? (
      <PreloadLink {...preloadProps}>{name}</PreloadLink>
    ) : (
      name
    )
    return this.state.activeTabIndex === index ? (
      <ActiveTabButton key={index}>{buttonContent}</ActiveTabButton>
    ) : (
      <TabButton key={index} onClick={() => this.setActiveTab(index)}>
        {buttonContent}
      </TabButton>
    )
  }

  render() {
    const { children = [] } = this.props

    return (
      <React.Fragment>
        <TabsContainer mb={0.5} width="100%">
          {children.map(this.renderTab)}
        </TabsContainer>
        <Box pt={3}>{children[this.state.activeTabIndex]}</Box>
      </React.Fragment>
    )
  }
}

interface TabProps {
  name: string
}
interface PreloadLinkTabProps extends TabProps, PreloadLinkProps {
  children: never
}
export class Tab extends React.Component<TabProps | PreloadLinkTabProps> {
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

const TabsContainer = styled(Flex)`
  border-bottom: 1px solid ${themeGet("colors.black10")};
`

const TabContainer = styled.div`
  cursor: pointer;
  padding-bottom: 13px;
  margin-bottom: -1px;
  margin-right: 20px;
  white-space: nowrap;
  ${borders};
`

const ActiveTabContainer = styled.div`
  pointer-events: none;
  padding-bottom: 13px;
  margin-bottom: -1px;
  margin-right: 20px;
  white-space: nowrap;
  border-bottom: 1px solid ${themeGet("colors.black60")};
`
