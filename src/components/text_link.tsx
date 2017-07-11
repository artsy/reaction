import * as React from "react"
import styled from "styled-components"
import colors from "../assets/colors"
import "../assets/fonts"

export interface LinkProps extends React.Props<TextLink>, React.HTMLAttributes<TextLink> {
  href?: string
  underline?: boolean
  color?: string
}

export class TextLink extends React.Component<LinkProps, null> {
  public static defaultProps: LinkProps

  render() {
    return (
      <a href={this.props.href} className={this.props.className}>
        {this.props.children}
      </a>
    )
  }
}

const StyledTextLink = styled(TextLink)`
  color: ${props => props.color};
  text-decoration: ${props => (props.underline ? "underline" : "none")}
`

StyledTextLink.defaultProps = {
  underline: false,
  color: colors.grayBold,
}

export default StyledTextLink
