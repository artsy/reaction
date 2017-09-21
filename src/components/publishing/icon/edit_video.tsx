import React, { Component } from "react"

class EditVideo extends Component<any, null> {
  render() {
    return (
      <svg
        className="edit-video"
        x="0px"
        y="0px"
        width={this.props.width ? this.props.width : "45px"}
        viewBox="0 0 1000 1000"
        enableBackground="new 0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M57.9,225.9v559.2h887.1V225.9H57.9z M385.7,634.7V358l239.6,138.3L385.7,634.7z" />
      </svg>
    )
  }
}
export default EditVideo
