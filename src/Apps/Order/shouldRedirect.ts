import { RedirectException } from "found"

export type RedirectPredicate<Arguments = any> = (
  args: Arguments
) => string | void

export interface RedirectRecord<Arguments> {
  path: string
  rules: Array<RedirectPredicate<Arguments>>
  children?: Array<RedirectRecord<Arguments>>
}

export const trimLeadingSlashes = (s: string) => s.replace(/^\/+/, "")

export function maybeThrowRedirectException<Arguments>(
  redirects: RedirectRecord<Arguments>,
  location: string,
  args: Arguments
) {
  const trimmedLocation = trimLeadingSlashes(location)

  redirects.rules.forEach(rule => {
    const redirectPath = rule(args)
    if (redirectPath) {
      throw new RedirectException(redirectPath)
    }
  })
  if (trimmedLocation.length > 0 && redirects.children) {
    // find most specific matching child (i.e. longest path match)
    const matchingChild = redirects.children
      .filter(child => trimmedLocation.startsWith(child.path))
      .sort((a, b) => a.path.split("/").length - b.path.split("/").length)
      .pop()
    if (matchingChild) {
      return maybeThrowRedirectException(
        matchingChild,
        trimmedLocation.slice(matchingChild.path.length),
        args
      )
    }
  }

  return false
}
