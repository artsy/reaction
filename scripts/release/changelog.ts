import parseChangelog from "changelog-parser"
import { writeFile } from "fs"
import { join } from "path"
import { promisify } from "util"

const write = promisify(writeFile)
/**
 * Absolute path to the project's changelog file
 */
export const CHANGELOG_PATH = join(__dirname, "../../CHANGELOG.md")

export interface ChangeEntry {
  version: string | null
  title: string
  body: string
}

export interface Changelog {
  title: string
  description: string
  versions: ChangeEntry[]
}

/**
 * Converts a changelog object into a markdown string
 */
export const formatChangelog = (changelog: Changelog) =>
  [
    `# ${changelog.title}`,
    changelog.description,
    ...changelog.versions.map(
      version => `## ${version.title}\n\n${version.body}`
    ),
  ]
    .join("\n\n")
    .trim()
    .replace(/\n\n+/g, "\n\n")

/**
 * Creates a new version under the unreleased section and moves any changes in
 * the unreleased section below that new version
 */
export const updateChangelogWithRelease = (
  changelog: Changelog,
  version: string
) => {
  changelog.versions.splice(1, 0, {
    ...changelog.versions[0],
    title: `v${version}`,
  })
  changelog.versions[0].body = ""
  return formatChangelog(changelog)
}

export const readChangelog = (changelogPath = CHANGELOG_PATH) =>
  parseChangelog(changelogPath)

export const writeChangelog = (
  changelogMarkdown: string,
  changelogPath = CHANGELOG_PATH
) => write(changelogPath, changelogMarkdown)
