import React, { Component } from "react"
import styled from "styled-components"
// import { Fonts } from "../Fonts"

interface Props extends React.HTMLProps<HTMLDivElement> {
  duration: number
  currentTime: number
}

export class Scrubber extends Component<Props, null> {

  handleMouseDown = () => {

  }

  handleMouseUp = () => {

  }

  handleChange = (e) => {

  }

  render() {
    const {
      duration,
      currentTime
    } = this.props

    return (
      <ScrubberInput
        type="range"
        step="any"
        max={duration.toFixed(4)}
        value={currentTime}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onChange={this.handleChange}
        style={{
          backgroundSize: currentTime * 100 / duration + '% 100%',
        }}
      />
    )
  }
}

const ScrubberInput = styled.input`
  width: 100%;
`
