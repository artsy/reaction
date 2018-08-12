import React, { SFC } from "react"
import { Container, ContainerType, Subscribe } from "unstated"

interface ConnectProps {
  to: Array<ContainerType<any> | Container<any>>
  children(...instances: any[]): React.ReactNode
}

export const Connect: SFC<ConnectProps> = ({ to, children }) => {
  return (
    <Subscribe to={to as any}>
      {({ state }) => {
        return children({
          ...state,
        })
      }}
    </Subscribe>
  )
}
