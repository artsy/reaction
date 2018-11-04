import {
  SystemContextProps,
  SystemContextProvider,
  withSystemContext,
} from "Artsy/SystemContext"
import React from "react"
import { GraphQLTaggedNode, ReadyState } from "react-relay"
import { QueryRenderer } from "react-relay"
import { CacheConfig, RerunParam, Variables } from "relay-runtime"

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

type Props = SystemContextProps & QueryRendererProps

const Renderer: React.SFC<Props> = ({
  user,
  relayEnvironment,
  children,
  ...props
}) => <QueryRenderer {...props} environment={relayEnvironment} />

const RendererWithContext = withSystemContext(Renderer)

/**
 * This component is, for now, mostly intended as an easy way to render stories, as it combines the Artsy
 * `ContextProvider` component and Relay‘s `QueryRenderer` component.
 *
 * We’ll need to see if it makes sense to use this as an entry point to render component trees from Reaction in Force.
 */
export const RootQueryRenderer: React.SFC<Props> = ({
  user,
  children,
  ...props
}) => (
  <SystemContextProvider user={user}>
    <RendererWithContext {...props} />
  </SystemContextProvider>
)
