import React from "react"
import { AppState, Subscribe } from "Router"

export const MediatorTrigger = () => {
  return (
    <Subscribe to={[AppState]}>
      {({ state }) => {
        return <span>trigger</span>
      }}
    </Subscribe>
  )
}
