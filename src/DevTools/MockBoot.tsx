import { Boot } from "Artsy/Router/Boot"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

export const MockBoot: React.SFC<{
  breakpoint?: Breakpoint
  headTags?: JSX.Element[]
  user?: User
  context?: any
}> = ({
  breakpoint = "xl",
  headTags,
  children,
  user = null,
  context = null,
}) => {
  return (
    <Boot
      onlyMatchMediaQueries={[breakpoint]}
      headTags={headTags}
      context={context}
      user={user}
      relayEnvironment={null as any}
      routes={null as any}
    >
      {children}
    </Boot>
  )
}
