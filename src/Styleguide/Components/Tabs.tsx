import { color, Sans, space } from "@artsy/palette"
import React from "react"
import styled, { css } from "styled-components"
import { borders, JustifyContentProps, WidthProps } from "styled-system"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { media } from "Styleguide/Elements/Grid"
import { Join } from "Styleguide/Elements/Join"

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

  /** To be able to extend or modify the way tab btns are getting rendered
   * default value is an identity function
   */
  transformTabBtn?: (
    Button: JSX.Element,
    tabIndex?: number,
    props?: any
  ) => JSX.Element

  separator?: JSX.Element

  children: TabLike[]
}

export interface TabsState {
  activeTabIndex: number
}

export class Tabs extends React.Component<TabsProps, TabsState> {
  public static defaultProps: Partial<TabsProps> = {
    justifyContent: "left",
    transformTabBtn: Button => Button,
    separator: <Box ml={2} />,
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
    return this.state.activeTabIndex === index
      ? this.props.transformTabBtn(
          <ActiveTabButton key={index}>{name}</ActiveTabButton>,
          index,
          this.props
        )
      : this.props.transformTabBtn(
          <TabButton key={index} onClick={() => this.setActiveTab(index)}>
            {name}
          </TabButton>,
          index,
          this.props
        )
  }

  render() {
    const { children = [], justifyContent, separator } = this.props

    return (
      <React.Fragment>
        <TabsContainer mb={0.5} width="100%" justifyContent={justifyContent}>
          <Join separator={separator}>{children.map(this.renderTab)}</Join>
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
    border-bottom: 1px solid ${color("black10")};
  `,
  tabContainer: css`
    cursor: pointer;
    padding-bottom: 13px;
    margin-bottom: -1px;
    white-space: nowrap;
    ${borders};

    ${media.xs`
      margin-right: ${space(2)}px;

      &:last-child {
        padding-right: ${space(4)}px;
      }
    `};
  `,
  activeTabContainer: css`
    pointer-events: none;
    padding-bottom: 13px;
    margin-bottom: -1px;
    white-space: nowrap;
    border-bottom: 1px solid ${color("black60")};

    ${media.xs`
      margin-right: ${space(2)}px;
    `};
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
