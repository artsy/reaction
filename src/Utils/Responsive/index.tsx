import { themeProps } from "@artsy/palette"
import React from "react"
import {
  createResponsiveComponents,
  ResponsiveProviderProps as _ResponsiveProviderProps,
} from "./Responsive"

type MediaQuery = keyof typeof themeProps["mediaQueries"]

const ResponsiveComponents = createResponsiveComponents<MediaQuery>()

export const Responsive = ResponsiveComponents.Consumer

// TODO Once we consider the deprecation period of the previous ‘beakpoint’
//      centric API to be over, we can replace the wrapper with just this line.
//
// export const ResponsiveProvider = Responsive.Provider

export type Breakpoint = keyof typeof themeProps["grid"]["breakpoints"]

export type DeprecatedResponsiveProviderProps = {
  initialBreakpoint?: Breakpoint
  breakpoints: { [K in Breakpoint]: string }
  children: React.ReactNode
}

export type NewResponsiveProviderProps = _ResponsiveProviderProps<MediaQuery>

// Using a union here means that the component can either be used using the new
// API or the deprecated one.
export type ResponsiveProviderProps =
  | NewResponsiveProviderProps
  | DeprecatedResponsiveProviderProps

export const ResponsiveProvider: React.SFC<ResponsiveProviderProps> = props => {
  const {
    initialMatchingMediaQueries,
    mediaQueries,
  } = props as NewResponsiveProviderProps
  const {
    initialBreakpoint,
    breakpoints,
  } = props as DeprecatedResponsiveProviderProps

  if (initialBreakpoint) {
    console.warn(
      "[Responsive] The usage of `initialBreakpoint` is deprecated, use " +
        "`initialMatchingMediaQueries` instead."
    )
  }

  if (breakpoints) {
    console.warn(
      "[Responsive] The usage of `breakpoints` is deprecated, use " +
        "`mediaQueries` instead."
    )
  } else if (!mediaQueries) {
    throw new Error(
      "[Responsive] If no `breakpoints` are specified, then `mediaQueries` " +
        "is required."
    )
  }

  return (
    <ResponsiveComponents.Provider
      mediaQueries={
        mediaQueries ||
        (breakpoints as NewResponsiveProviderProps["mediaQueries"])
      }
      initialMatchingMediaQueries={
        initialMatchingMediaQueries ||
        (initialBreakpoint && [initialBreakpoint])
      }
    >
      {props.children}
    </ResponsiveComponents.Provider>
  )
}
