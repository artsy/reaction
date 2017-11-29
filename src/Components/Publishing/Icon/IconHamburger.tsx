import React, { Component } from "react"

export class IconHamburger extends Component<any, null> {
  static defaultProps = {
    color: "black"
  }

  render() {
    return (
      <svg
        fill={this.props.color}
        width="32px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        enable-background="new 0 0 32 32"
      >
        <rect x="6" y="22" width="20" height="2" />
        <rect x="6" y="15" width="20" height="2" />
        <rect x="6" y="8" width="20" height="2" />
      </svg>
    )
  }
}
