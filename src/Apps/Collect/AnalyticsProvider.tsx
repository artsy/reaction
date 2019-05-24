import { FilterState, State } from "Apps/Collect/FilterState"
import { track } from "Artsy/Analytics/track"
import React from "react"
import { Provider } from "unstated"

interface Props {
  urlBuilder: (state: State) => string
  [key: string]: any
}

@track()
export default class AnalyticsProvider extends React.Component<Props> {
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
