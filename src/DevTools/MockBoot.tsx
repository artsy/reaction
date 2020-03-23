import { Boot } from "Artsy/Router"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

export const MockBoot: React.SFC<{
  breakpoint?: Breakpoint
  headTags?: JSX.Element[]
  user?: User
}> = ({ breakpoint = "xl", headTags, children, user = null }) => {
  return (
    <Boot
      onlyMatchMediaQueries={[breakpoint]}
      headTags={headTags}
      context={null as any}
      user={user}
      relayEnvironment={null as any}
      routes={null as any}
    >
      {children}
    </Boot>
  )
}
