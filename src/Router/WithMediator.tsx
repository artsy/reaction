import React from "react"
import { AppState } from "Router/state"
import { Subscribe } from "unstated"

type Mediator = {
  trigger: (action: string, config?: object) => void
}

export const WithMediator: React.SFC<{
  children: (mediator: Mediator) => React.ReactNode
}> = ({ children }) => (
  <Subscribe to={[AppState]}>
    {({ state: { mediator } }) =>
      children(
        mediator || {
          trigger() {
            console.error("mediator is not present in AppState")
          },
        }
      )
    }
  </Subscribe>
)
