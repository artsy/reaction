import React from "react"

declare module "react" {
  /**
   * This typing only exists in the React 16 typings, but the storybook-react typings assume we’re already on that even
   * though React 16 is not a hard dependency of storybook-react. Rather than updating to React 16, we simply augment
   * the React 15 typings to add the missing type.
   */
  type ComponentType<P = {}> = React.ComponentClass<P> | React.StatelessComponent<P>;
}
