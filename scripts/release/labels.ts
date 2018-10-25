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
