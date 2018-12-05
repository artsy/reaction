import React from "react"
import { getCurrentTimeAsIsoString } from "Utils/getCurrentTimeAsIsoString"

/**
 * Render prop component to provide the current time as an ISO string.
 *
 * Example usage:
 *
 *     <WithCurrentTime>
 *       {currentTime => (
 *          <>The current time is {currentTime}</>
 *       )}
 *     </WithCurrentTime>
 *
 * @param interval The interval (in ms) with which to update the time.
 *                 The default value is 1000, i.e. the time is updated once
 *                 every second.
 */
export class WithCurrentTime extends React.Component<
  {
    interval?: number
    children: (currentTime: string) => React.ReactNode
  },
  { currentTime: string }
> {
  state = {
    currentTime: getCurrentTimeAsIsoString(),
  }

  intervalId: NodeJS.Timer

  componentDidMount() {
    this.intervalId = setInterval(
      this.setCurrentTime,
      this.props.interval || 1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  setCurrentTime = () => {
    this.setState({ currentTime: getCurrentTimeAsIsoString() })
  }

  render() {
    return this.props.children(this.state.currentTime)
  }
}
