import React from "react"
import { AppState } from "Router/state"
import { Subscribe } from "unstated"

export const MediatorTrigger = () => {
  return (
    <Subscribe to={[AppState]}>
      {({ state }) => {
        return <span>trigger</span>
      }}
    </Subscribe>
  )
}
