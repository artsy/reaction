/**
 * To test this script run this command from the project root:
 *
 * GITHUB_API_TOKEN=<your-token> ts-node -O { "module": "commonjs", "esModuleInterop": true }' scripts/release/index.ts
 */

import OctoKit from "@octokit/rest"
import semver from "semver"

import {
  readChangelog,
  updateChangelogWithRelease,
  // writeChangelog,
} from "./changelog"

import { getCommitForTag, getLastTag, getLatestMasterCommit } from "./git"
import {
  getLargestReleaseLabel,
  ReleaseLabel,
  strToReleaseLabel,
  validReleaseLabels,
} from "./labels"

import { PullRequest } from "./github"

// const requiredEnvs = ["GITHUB_API_TOKEN", "GITHUB_EMAIL", "GITHUB_USER"]

// requiredEnvs.forEach(env => {
//   if (!process.env[env]) {
//     throw new Error(`Needs ${env} to be set`)
//   }
// })

export const run = async () => {
  const octokit = new OctoKit()
  octokit.authenticate({
    type: "token",
    token: process.env.GITHUB_API_TOKEN,
  })

  let releaseType: ReleaseLabel = ReleaseLabel.None
  const lastTag = await getLastTag()
  const masterSha = (await getLatestMasterCommit()).hash
  const lastTagCommit = await getCommitForTag(lastTag)
  const lastTagSha = lastTagCommit.hash
  const currentVersion = semver.valid(lastTag)

  if (!currentVersion) {
    console.error(
      `The last tag at hash ${lastTagSha} is not a semver valid version`
    )
    process.exit(1)
  }

  if (masterSha === lastTagSha) {
    console.log("No release is necessary, skipping!")
    return
  }

  const repoString = "artsy/reaction"
  // const owner = "artsy"
  // const repo = "reaction"

  /**
   * Finds all pull requests between master and the last release
   */
  const pullRequests: PullRequest[] = await octokit.search
    .issues({
      q: `${masterSha}..${lastTagSha} type:pr repo:${repoString}`,
    })
    .then(res => res.data.items || [])

  console.log(pullRequests.map(pr => pr.html_url))

  validReleaseLabels(pullRequests)

  // Determine the release type by the largest label present on the PRs
  releaseType = pullRequests
    .map(pr => pr.labels)
    .reduce((acc, curr) => acc.concat(curr), [])
    .map(label => strToReleaseLabel(label.name))
    .filter(label => !!label)
    .reduce(
      (acc, curr, index, labels) =>
        getLargestReleaseLabel(labels as ReleaseLabel[]),
      ReleaseLabel.None
    ) as ReleaseLabel

  console.log(releaseType)

  // if (releaseType === ReleaseLabel.None) {
  //   // No release is required, skip everything else
  //   return
  // }

  readChangelog()
    .then(changelog => updateChangelogWithRelease(changelog, currentVersion))
    .then(changelog => console.log(changelog))
  // .then(changelog => writeChangelog(changelog))

  // const pkgPath = path.join(__dirname, "../package.json")
  // const pkg = JSON.parse(await read(pkgPath, "UTF-8"))
  // pkg.version = currentVersion
  // write(pkgPath, format(JSON.stringify(pkg)))
}

run()
