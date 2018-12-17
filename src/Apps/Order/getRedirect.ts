export type RedirectPredicate<Arguments = any> = (
  args: Arguments
) => string | void

export interface RedirectRecord<Arguments> {
  path: string
  rules: Array<RedirectPredicate<Arguments>>
  children?: Array<RedirectRecord<Arguments>>
}

export const trimLeadingSlashes = (s: string) => s.replace(/^\/+/, "")

export function getRedirect<Arguments>(
  redirects: RedirectRecord<Arguments>,
  location: string,
  args: Arguments
): string | null {
  const trimmedLocation = trimLeadingSlashes(location)

  for (const rule of redirects.rules) {
    const redirectPath = rule(args)
    if (redirectPath) {
      return redirectPath
    }
  }

  if (trimmedLocation.length > 0 && redirects.children) {
    // find most specific matching child (i.e. longest path match)
    const matchingChild = redirects.children
      .filter(child => trimmedLocation.startsWith(child.path))
      .sort((a, b) => a.path.split("/").length - b.path.split("/").length)
      .pop()
    if (matchingChild) {
      return getRedirect(
        matchingChild,
        trimmedLocation.slice(matchingChild.path.length),
        args
      )
    }
  }

  return null
}
