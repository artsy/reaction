import React, { Component } from "react"
import styled, { StyledFunction } from "styled-components"
// import { Fonts } from "../Fonts"

interface Props extends React.HTMLProps<HTMLDivElement> {
  duration: number
  currentTime: number
  isPlaying: boolean
  pause: () => void
  play: () => void
  seekTo: (v) => void
}

interface State {
  isScrubbing: boolean
  isPlayingOnMouseDown: boolean
}

export class Scrubber extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      isScrubbing: false,
      isPlayingOnMouseDown: false
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.currentTime !== nextProps.currentTime ||
      this.props.duration !== nextProps.duration
    )
  }

  handleMouseDown = () => {
    this.setState({
      isPlayingOnMouseDown: this.props.isPlaying
    })
    this.props.pause()
  }

  handleMouseUp = (e) => {
    if (!this.state.isScrubbing) {
      this.props.seekTo(e.target.value)
    }
    if (this.state.isPlayingOnMouseDown) {
      this.props.play()
    }
    this.setState({ isScrubbing: false })
  }

  handleChange = (e) => {
    this.setState({ isScrubbing: true })
    this.props.seekTo(e.target.value)
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
        max={duration && duration.toFixed(4)}
        value={currentTime}
        duration={duration}
        currentTime={currentTime}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onChange={this.handleChange}
      />
    )
  }
}

const Input: StyledFunction<Props & React.HTMLProps<HTMLInputElement>> = styled.input

const ScrubberInput = Input`
  width: 100%;
  background-size: ${props => (props.currentTime * 100) / props.duration }% 100%;
  height: 18px;
  margin: 15px 0;
  appearance: none;
  // background-color: black;

  // &:focus {
  //   outline: none;
  // }
  // ::-webkit-slider-runnable-track, ::-moz-range-track {
  //   height: 2px;
  //   cursor: pointer;
  //   animate: 0.2s;
  //   background-color: white;
  //   border: 0px;
  // }
  // ::-webkit-slider-thumb, &::-moz-range-thumb {
  //   box-shadow: 0px 0px 0px white;
  //   border: 0px solid #E3E3E3;
  //   height: 12px;
  //   width: 12px;
  //   border-radius: 50px;
  //   background-color: white;
  //   cursor: pointer;
  //   margin-top: -5px;
  //   appearance: none;
  // }
  // &:focus::-webkit-slider-runnable-track {
  //   background: #FFFFFF;
  // }
`
