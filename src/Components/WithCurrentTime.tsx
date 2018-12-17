import React from "react"
import { getCurrentTimeAsIsoString } from "Utils/getCurrentTimeAsIsoString"
import { getOffsetBetweenGravityClock } from "Utils/time"

/**
 * Render prop component to provide the current time as an ISO string, and
 * an offset from the current time to the server time (in milliseconds).
 *
 * If the `useServerAdjustment` prop is provided the offset is calculated.
 * Any errors in offset calculation, or if that prop is not provided, will result
 * in the offset being returned as 0.
 *
 * Example usage:
 *
 *     <WithCurrentTime>
 *       {({ currentTime, timeOffsetInMilliseconds }) => (
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
    useServerAdjustment?: boolean
    children: (x: State) => React.ReactNode
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
    if (this.props.useServerAdjustment) {
      const timeOffsetInMilliseconds = await getOffsetBetweenGravityClock()

      this.setState({ timeOffsetInMilliseconds })
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  setCurrentTime = () => {
    this.setState({ currentTime: getCurrentTimeAsIsoString() })
  }

  render() {
    return this.props.children(this.state)
  }
}
