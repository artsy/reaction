import * as theme from "@artsy/palette"
import React from "react"
import styled, { css, InterpolationValue } from "styled-components"

interface RenderPropStyleGeneratorOptions {
  display?: "block" | "inline" | "inline-block"
  style?: InterpolationValue[]
}

type RenderPropStyleGenerator = (
  options?: RenderPropStyleGeneratorOptions
) => InterpolationValue[]

type RenderProp = ((
  generatedStyle: RenderPropStyleGenerator
) => React.ReactNode)

interface Props {
  query: string
  not?: boolean
  children: React.ReactNode | RenderProp
}

type AliasedQuery = React.SFC<Pick<Props, Exclude<keyof Props, "query">>> & {
  query: string
}

export class Query extends React.Component<Props> {
  render() {
    const prefix = this.props.not ? "not all and " : ""
    const generatedStyle = (options?: RenderPropStyleGeneratorOptions) => css`
      display: none;
      @media ${prefix}${this.props.query} {
        display: ${(options && options.display) || "block"};
        ${(options && options.style) || ""};
      }
    `

    if (typeof this.props.children === "undefined") {
      return null
    } else if (typeof this.props.children === "function") {
      return this.props.children(generatedStyle)
    }

    const Container = styled.div`
      ${generatedStyle()};
    `
    return <Container>{this.props.children}</Container>
  }

  public static create: (query: string) => AliasedQuery = query => {
    const component: any = props => <Query query={query} {...props} />
    component.query = query
    return component
  }
}

// TODO: Likely fixed by https://github.com/Microsoft/TypeScript/pull/27408
// type MatchProps = {
//   any: Array<{ query: string }>
// } | {
//   all: Array<{ query: string }>
// }

type MatcherRenderPropStyleGenerator = (
  matcher: AliasedQuery,
  style: InterpolationValue[]
) => InterpolationValue[]

type MatchRenderProp = ((
  generatedStyle: RenderPropStyleGenerator,
  matcherStyle: MatcherRenderPropStyleGenerator
) => React.ReactNode)

interface MatchProps {
  not?: boolean
  any?: Array<{ query: string }>
  all?: Array<{ query: string }>
  children: React.ReactNode | MatchRenderProp
}

export class Match extends React.Component<MatchProps> {
  render() {
    if (this.props.any) {
      const queries = this.props.any.map(matcher => matcher.query)

      /**
       * TODO:
       *
       * Something like this doesn’t work, because an attribute can only be used
       * once in a media query, presumably the last one wins:
       *
       *   <Match not any={[breakpoints.xs, breakpoints.sm, breakpoints.md]} />
       *
       * Generates:
       *
       *   @media not all and (max-width: 767px), not all and (max-width: 899px) and (min-width: 768px), not all and (max-width: 1023px) and (min-width: 900px)
       *
       * To overcome this we could define these attributes as actual props and
       * then introduce a range matcher. E.g.
       *
       *   breakpoints.xs = Query.create({ maxWidth: 767 })
       *   breakpoints.md = Query.create({ minWidth: 900, maxWidth: 1023 })
       *   <Match not from={breakpoints.xs} to={breakpoints.md} />
       *
       * Which would then generate:
       *
       *   @media not all (max-width: 1023px)
       */
      const prefix = this.props.not ? "not all and " : ""

      let children = this.props.children
      if (typeof this.props.children === "function") {
        const renderProp: MatchRenderProp = this.props.children
        const matcherStyle: MatcherRenderPropStyleGenerator = (
          matcher,
          style
        ) => css`
          @media ${prefix}${matcher.query} {
            ${style};
          }
        `
        children = generatedStyle => renderProp(generatedStyle, matcherStyle)
      }

      return (
        <Query query={`${prefix}${queries.join(`, ${prefix}`)}`}>
          {children}
        </Query>
      )
    } else if (this.props.all) {
      const queries = this.props.all.map(matcher => matcher.query)
      const prefix = this.props.not ? "not all and " : ""
      return (
        <Query query={`${prefix}${queries.join(" and ")}`}>
          {this.props.children}
        </Query>
      )
    }
  }
}

/**
 * TODO: These are our specific ones. Figure out if it makes sense to always
 * define some of these or if every project should define them on their own.
 */

export const breakpoints = Object.keys(theme.breakpoints).reduce(
  (res, breakpoint) => {
    return {
      ...res,
      [breakpoint]: Query.create(theme.themeProps.mediaQueries[breakpoint]),
    }
  },
  {} as { [K in keyof typeof theme.breakpoints]: AliasedQuery }
)

export const interaction = {
  hover: Query.create(theme.themeProps.mediaQueries.hover),
}
