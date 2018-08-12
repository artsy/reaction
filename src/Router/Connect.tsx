import { isArray } from "lodash"
import React, { SFC } from "react"
import { Container, ContainerType, Subscribe } from "unstated"

interface ConnectProps {
  to:
    | ContainerType<any>
    | Container<any>
    | Array<ContainerType<any> | Container<any>>
  children(...instances: any[]): React.ReactNode
}

export const Connect: SFC<ConnectProps> = ({ to, children }) => {
  const _to = isArray(to) ? to : [to]

  return (
    <Subscribe to={_to}>
      {({ state }) => {
        return children({
          ...state,
        })
      }}
    </Subscribe>
  )
}
