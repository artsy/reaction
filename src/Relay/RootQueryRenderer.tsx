import React from "react"
import { GraphQLTaggedNode, ReadyState } from "react-relay"
import { QueryRenderer } from "react-relay"
import { CacheConfig, RerunParam, Variables } from "relay-runtime"
import { ContextConsumer, ContextProps, ContextProvider } from "../Components/Artsy"

/**
 * A copy of the upstream interface, minus the `environment` field.
 */
interface QueryRendererProps {
  cacheConfig?: CacheConfig
  query: GraphQLTaggedNode
  variables: Variables
  rerunParamExperimental?: RerunParam
  render(readyState: ReadyState): React.ReactElement<any> | undefined | null
}

type Props = ContextProps & QueryRendererProps

const Renderer: React.SFC<Props> = ({ currentUser, relayEnvironment, children, ...props }) => (
  <QueryRenderer {...props} environment={relayEnvironment} />
)

const RendererWithContext = ContextConsumer(Renderer)

/**
 * This component is, for now, mostly intended as an easy way to render stories, as it combines the Artsy
 * `ContextProvider` component and Relay‘s `QueryRenderer` component.
 *
 * We’ll need to see if it makes sense to use this as an entry point to render component trees from Reaction in Force.
 */
export const RootQueryRenderer: React.SFC<Props> = ({ currentUser, children, ...props }) => (
  <ContextProvider currentUser={currentUser}>
    <RendererWithContext {...props} />
  </ContextProvider>
)
