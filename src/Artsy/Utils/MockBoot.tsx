import { Boot } from "Artsy"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

export const MockBoot: React.SFC<{ breakpoint?: Breakpoint }> = ({
  breakpoint,
  children,
}) => {
  return (
    <Boot
      initialMatchingMediaQueries={[breakpoint]}
      context={null as any}
      user={null as any}
      relayEnvironment={null as any}
      resolver={null as any}
      routes={null as any}
    >
      {children}
    </Boot>
  )
}
