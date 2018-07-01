import React from "react"
import { GlobalState } from "Router/state"
import { Subscribe } from "unstated"

export const MediatorTrigger = () => {
  return (
    <Subscribe to={[GlobalState]}>
      {({ state }) => {
        return <span>trigger</span>
      }}
    </Subscribe>
  )
}
