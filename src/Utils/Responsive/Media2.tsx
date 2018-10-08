import * as theme from "@artsy/palette"
import React from "react"
import styled, { css, InterpolationValue } from "styled-components"

const MutuallyExclusiveProps = [
  "query",
  "at",
  "lessThan",
  "greaterThan",
  "greaterThanOrEqual",
  "between",
  "interaction",
]

// TODO: All of these props should be mutually exclusive. Using a union should
//       probably be made possible by https://github.com/Microsoft/TypeScript/pull/27408.
interface Props<B, I> {
  not?: boolean
  query?: string
  at?: B
  lessThan?: B
  greaterThan?: B
  greaterThanOrEqual?: B
  between?: [B, B]
  interaction?: I
  children: React.ReactNode | RenderProp
}

type RenderProp = ((
  generatedStyle: RenderPropStyleGenerator
) => React.ReactNode)

type RenderPropStyleGenerator = (
  matchingStyle?: InterpolationValue[]
) => InterpolationValue[]

/**
 * breakpoints are 0-based
 */
export function createMedia<
  C extends {
    breakpoints: { [key: string]: number }
    interactions: { [key: string]: (negated: boolean) => string }
  }
>(config: C) {
  type Breakpoint = keyof C["breakpoints"]
  type Interaction = keyof C["interactions"]

  const MediaContext = React.createContext<{ onlyRender?: Breakpoint[] }>({})
  const MediaContextProvider: React.SFC<{ onlyRender?: Breakpoint[] }> = ({
    onlyRender,
    children,
  }) => (
    <MediaContext.Provider value={{ onlyRender }}>
      {children}
    </MediaContext.Provider>
  )

  const sortedBreakpoints = createSortedBreakpoints(config.breakpoints)
  const atRanges = createAtRanges(sortedBreakpoints)

  const findNextBreakpoint = (breakpoint: string) => {
    const nextBreakpoint =
      sortedBreakpoints[sortedBreakpoints.indexOf(breakpoint) + 1]
    if (!nextBreakpoint) {
      throw new Error(`There is no breakpoint larger than ${breakpoint}`)
    }
    return nextBreakpoint
  }

  const MediaComponent: React.SFC<Props<Breakpoint, Interaction>> = props => {
    validateProps(props)

    return (
      <MediaContext.Consumer>
        {({ onlyRender }) => {
          let query: string
          if (props.query) {
            query = props.query
          } else if (props.interaction) {
            query = config.interactions[props.interaction as string](
              !!props.not
            )
          } else {
            let breakpointProps = props
            if (breakpointProps.at) {
              if (onlyRender && !onlyRender.includes(breakpointProps.at)) {
                return null
              }
              breakpointProps = atRanges[breakpointProps.at as string]
            }
            if (breakpointProps.lessThan) {
              const width =
                config.breakpoints[breakpointProps.lessThan as string]
              if (onlyRender) {
                const lowestAllowedWidth = Math.min(
                  ...onlyRender.map(
                    breakpoint => config.breakpoints[breakpoint as string]
                  )
                )
                if (lowestAllowedWidth >= width) {
                  return null
                }
              }
              query = `(max-width:${width - 1}px)`
            } else if (breakpointProps.greaterThan) {
              const width =
                config.breakpoints[
                  findNextBreakpoint(breakpointProps.greaterThan as string)
                ]
              if (onlyRender) {
                const highestAllowedWidth = Math.max(
                  ...onlyRender.map(
                    breakpoint => config.breakpoints[breakpoint as string]
                  )
                )
                if (highestAllowedWidth < width) {
                  return null
                }
              }
              query = `(min-width:${width}px)`
            } else if (breakpointProps.greaterThanOrEqual) {
              const width =
                config.breakpoints[breakpointProps.greaterThanOrEqual as string]
              if (onlyRender) {
                const highestAllowedWidth = Math.max(
                  ...onlyRender.map(
                    breakpoint => config.breakpoints[breakpoint as string]
                  )
                )
                if (highestAllowedWidth < width) {
                  return null
                }
              }
              query = `(min-width:${width}px)`
            } else if (breakpointProps.between) {
              // TODO: This is the only useful breakpoint to negate, but we’ll
              //       we’ll see when/if we need it. We could then also decide
              //       to add `oustide`.
              const fromWidth =
                config.breakpoints[breakpointProps.between[0] as string]
              const toWidth =
                config.breakpoints[breakpointProps.between[1] as string]
              if (onlyRender) {
                const allowedWidths = onlyRender.map(
                  breakpoint => config.breakpoints[breakpoint as string]
                )
                if (
                  Math.max(...allowedWidths) < fromWidth ||
                  Math.min(...allowedWidths) >= toWidth
                ) {
                  return null
                }
              }
              query = `(min-width:${fromWidth}px) and (max-width:${toWidth -
                1}px)`
            }
          }

          const generatedStyle: RenderPropStyleGenerator = matchingStyle => css`
            display: none;
            @media ${query} {
              display: inherit;
              ${matchingStyle};
            }
          `

          if (typeof props.children === "function") {
            // FIXME: This typings shouldn’t be necessary, because the actual type is
            //        ReactNode and is legal. However, for some reason it breaks the
            //        SFC typing of this component.
            return props.children(generatedStyle) as React.ReactElement<any>
          }

          const MediaContainer = styled.div`
            ${generatedStyle()};
          `
          return <MediaContainer>{props.children}</MediaContainer>
        }}
      </MediaContext.Consumer>
    )
  }

  return { MediaComponent, MediaContextProvider }
}

function validateProps(props) {
  const selectedProps = Object.keys(props).filter(prop =>
    MutuallyExclusiveProps.includes(prop)
  )
  if (selectedProps.length < 1) {
    throw new Error(`1 of ${MutuallyExclusiveProps.join(", ")} is required.`)
  } else if (selectedProps.length > 1) {
    throw new Error(
      `Only 1 of ${selectedProps.join(", ")} is allowed at a time.`
    )
  }
  if (props.hasOwnProperty("not") && !props.interaction) {
    throw new Error(
      "The `not` prop is only allowed in combination with the `interaction` prop."
    )
  }
}

function createSortedBreakpoints(breakpoints: { [key: string]: number }) {
  return Object.keys(breakpoints)
    .map(breakpoint => [breakpoint, breakpoints[breakpoint]])
    .sort((a, b) => (a[1] < b[1] ? -1 : 1))
    .map(breakpointAndValue => breakpointAndValue[0] as string)
}

function createAtRanges(sortedBreakpoints: string[]) {
  const atRanges = {}
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < sortedBreakpoints.length; i++) {
    const from = sortedBreakpoints[i]
    const to = sortedBreakpoints[i + 1]
    if (to) {
      atRanges[from] = { between: [from, to] }
    } else {
      atRanges[from] = { greaterThanOrEqual: from }
    }
  }
  return atRanges
}

/**
 * NOTE: These are our specific definitions and should normally not go inside
 * the lib.
 */

// We need this to be 0-based, whereas currently in palette xs is defined as 767
const newThemeBreakpoints = {
  xs: 0,
  sm: 768,
  md: 900,
  lg: 1024,
  xl: 1192,
}

const ReactionMedia = createMedia({
  breakpoints: newThemeBreakpoints,
  interactions: {
    // TODO: Haven’t actually tested this negated version yet
    hover: negated =>
      negated
        ? `not all and ${theme.themeProps.mediaQueries.hover}`
        : theme.themeProps.mediaQueries.hover,
  },
})

export const Media = ReactionMedia.MediaComponent
export const ContextProvider = ReactionMedia.MediaContextProvider
