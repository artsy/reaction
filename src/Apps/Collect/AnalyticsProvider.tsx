import { FilterState } from "Apps/Collect/FilterState"
import { track } from "Artsy"
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
      ...remainingProps
    } = this.props

    return (
      <Provider
        inject={[
          new FilterState({
            ...this.props.params,
            ...this.props.location.query,
            tracking,
          }),
        ]}
      >
        <Component {...remainingProps} query={{ __id, __fragments }} />
      </Provider>
    )
  }
}
