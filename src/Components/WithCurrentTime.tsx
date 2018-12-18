import moment from "moment"
import React from "react"
import { getCurrentTimeAsIsoString } from "Utils/getCurrentTimeAsIsoString"
import { getOffsetBetweenGravityClock } from "Utils/time"

/**
 * Render prop component to provide the current time as an ISO string, and
 * an offset from the current time to the server time (in milliseconds).
 *
 * If the `syncWithServer` prop is provided the offset is calculated and included
 * with the current time. Any errors in offset calculation, or if that prop is not
 * provided, will result in the offset being calculated as 0.
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

interface State {
  currentTime: string
  timeOffsetInMilliseconds: number
}

export class WithCurrentTime extends React.Component<
  {
    interval?: number
    syncWithServer?: boolean
    children: (currentTime: string) => React.ReactNode
  },
  State
> {
  state = {
    currentTime: getCurrentTimeAsIsoString(),
    timeOffsetInMilliseconds: 0,
  }

  intervalId: NodeJS.Timer

  componentDidMount() {
    this.intervalId = setInterval(
      this.setCurrentTime,
      this.props.interval || 1000
    )
  }

  async componentWillMount() {
    if (this.props.syncWithServer) {
      const timeOffsetInMilliseconds = await getOffsetBetweenGravityClock()

      this.setState({ timeOffsetInMilliseconds })
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  setCurrentTime = () => {
    this.setState({
      currentTime: getCurrentTimeAsIsoString(),
    })
  }

  render() {
    const { currentTime, timeOffsetInMilliseconds } = this.state
    return this.props.children(
      moment(currentTime)
        .subtract(timeOffsetInMilliseconds, "ms")
        .toISOString()
    )
  }
}
