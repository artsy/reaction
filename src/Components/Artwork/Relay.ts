import * as React from "react"
import * as Relay from "react-relay"

function createContainer<T, S>(
  ComponentClass: React.ComponentClass<T> | React.StatelessComponent<T>,
  ChildComponent: Relay.RelayContainerClass<S>
): Relay.RelayContainerClass<T> {
  return Relay.createContainer(ComponentClass, {
    fragments: {
      artwork: () => Relay.QL`
        fragment on Artwork {
          id
          image {
            url(version: "large")
            aspect_ratio
          }
        ${ChildComponent.getFragment("artwork")}
        }
      `,
    },
  })
}

export default createContainer

export interface RelayProps {
  artwork: {
    id: string | null
    image: {
      url: string | null
      aspect_ratio: number | null
    } | null
  }
}
