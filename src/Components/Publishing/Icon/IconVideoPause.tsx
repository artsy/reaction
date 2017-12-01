import React, { Component } from "react"

export class IconVideoPause extends Component<any, null> {
  static defaultProps = {
    color: "black",
  }

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="28"
        viewBox="0 0 26 28"
      >
        <g fill="none" fillRule="evenodd" transform="translate(-19 -22)">
          <rect width="1200" height="92" fill="#000" fillOpacity=".2" stroke="#FFF" rx="4" />
          <path d="M17 21h30v30H17z" />
          <path fill={this.props.color} d="M19.857 22.429h8.571v27.143h-8.571zM35.571 22.429h8.571v27.143h-8.571z" />
        </g>
      </svg >
    )
  }
}
