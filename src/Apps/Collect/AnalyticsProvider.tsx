import { FilterState } from "Apps/Collect/FilterState"
import { track } from "Artsy/Analytics/track"
import React from "react"
import { Provider } from "unstated"

@track()
export default class AnalyticsProvider extends React.Component<any> {
  render() {
    const {
      __fragments,
      __id,
      Component,
      tracking,
      urlBuilder,
      ...remainingProps
    } = this.props

    return (
      <Provider
        inject={[
          new FilterState(
            {
              ...this.props.params,
              ...this.props.location.query,
              tracking,
            },
            urlBuilder
          ),
        ]}
      >
        <Component {...remainingProps} query={{ __id, __fragments }} />
      </Provider>
    )
  }
}
