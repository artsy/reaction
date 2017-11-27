import React, { Component } from "react"

export class IconPlayCaret extends Component<any, null> {
  static defaultProps = {
    color: "black",
  }

  render() {
    return (
      <svg className='IconPlayCaret' x="0px" y="0px" viewBox="0 0 40 56" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon fill={this.props.color} points="0 0 0 56 39.3600006 28" />
        </g>
      </svg>
    )
  }
}
