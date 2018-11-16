import { Flex, Sans } from "@artsy/palette"
import moment from "moment-timezone"
import React from "react"

interface Props {
  endDate: string
}

interface State {
  msLeft: number
}

export class Timer extends React.Component<Props, State> {
  private intervalId

  constructor(props) {
    super(props)

    const { endDate } = this.props
    this.state = {
      msLeft: Math.max(0, Date.parse(endDate) - Date.now()),
    }
  }

  componentDidMount() {
    const { msLeft } = this.state
    if (msLeft > 0) {
      this.intervalId = setInterval(() => this.timer(), 1000)
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  timer() {
    const { msLeft } = this.state
    const nextTick = msLeft - 1000
    const hasEnded = nextTick < 0

    if (hasEnded) {
      clearInterval(this.intervalId)
      this.setState({ msLeft: 0 })
    } else {
      this.setState({ msLeft: nextTick })
    }
  }

  render() {
    const { msLeft } = this.state
    const duration = moment.duration(msLeft)

    return (
      <Flex alignItems="center">
        <Sans size="4t" weight="medium">
          {this.padWithZero(duration.days())}d{"  "}
          {this.padWithZero(duration.hours())}h{"  "}
          {this.padWithZero(duration.minutes())}m{"  "}
          {this.padWithZero(duration.seconds())}s
        </Sans>
      </Flex>
    )
  }

  private padWithZero(num: number) {
    return num.toString().padStart(2, "0")
  }
}
