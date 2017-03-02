import * as React from "react"
import styled from "styled-components"
import colors from "../assets/colors"
import "../assets/fonts"

export interface LinkProps extends React.Props<TextLink>, React.HTMLAttributes<TextLink> {
  href?: string
  underline?: boolean
}

export class TextLink extends React.Component<LinkProps, null> {
  public static defaultProps: LinkProps

  render() {
    return (
      <a href={ this.props.href } className={ this.props.className }>
        { this.props.children }
      </a>
    )
  }
}

TextLink.defaultProps = {
    underline: false,
}

export default styled(TextLink)`
  font-size: 15px;
  line-height: 12px;
  color: ${colors.grayBold};
  text-decoration: ${props => props.underline ? "underline" : "none"}
`
