import { commentOnPR, PullRequest } from "./github"

export enum ReleaseLabel {
  Major = "release:major",
  Minor = "release:minor",
  Patch = "release:patch",
  None = "release:none",
}

export const strToReleaseLabel = (labelText: string) => {
  if (labelText === ReleaseLabel.Major) return ReleaseLabel.Major
  if (labelText === ReleaseLabel.Minor) return ReleaseLabel.Minor
  if (labelText === ReleaseLabel.Patch) return ReleaseLabel.Patch
  if (labelText === ReleaseLabel.None) return ReleaseLabel.None
  return false
}

export const getLargestReleaseLabel = (releaseLabels: ReleaseLabel[]) => {
  if (releaseLabels.includes(ReleaseLabel.Major)) return ReleaseLabel.Major
  if (releaseLabels.includes(ReleaseLabel.Minor)) return ReleaseLabel.Minor
  if (releaseLabels.includes(ReleaseLabel.Patch)) return ReleaseLabel.Patch
  return ReleaseLabel.None
}

export const validReleaseLabels = (pullRequests: PullRequest[]) => {
  pullRequests.forEach(pr => {
    const includesReleaseLabel = pr.labels.some(label =>
      Object.values(ReleaseLabel).includes(label)
    )

    if (!includesReleaseLabel) {
      console.error(`${pr.html_url} is missing a release label`)
      commentOnPR(pr, [
        "@user please assign a release label to this PR.",
        "",
        "It should be one of",
        "",
        ...Object.values(ReleaseLabel).map(label => `- ${label}`),
      ])
      return false
    }

    return true
  })
}
