import React, { Component } from "react"

class IconRemove extends Component<any, null> {
  render() {
    return (
      <svg
        className="remove"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        enableBackground="new 0 0 1000 1000"
      >
        <circle cx="500.937" cy="489.704" r="468.769" fill={this.props.fill ? this.props.fill : "#000"} />
        <polygon
          fill="#FFFFFF"
          points="485.251,550.605 374.762,661.094 308.487,594.819 418.976,484.33 308.487,373.84 374.762,307.565 485.251,418.055 595.741,307.565 662.016,373.84 551.526,484.33 662.016,594.819 595.741,661.094 "
        />
      </svg>
    )
  }
}
export default IconRemove
