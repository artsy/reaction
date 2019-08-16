import React from "react"
import { MockRouter } from "./MockRouter"

/**
 * Used to provide the proper context setup when using router-related components
 * (like <Link to='/foo'>, from found) that require `router` to be in the context.
 *
 * This should only be used in Storybooks entries and tests.
 */

export const MockRouterProvider = props => {
  return (
    <MockRouter
      routes={[
        {
          path: "/",
          Component: () => props.children,
        },
      ]}
      initialRoute="/"
    />
  )
}
