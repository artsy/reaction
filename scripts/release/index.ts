/**
 * To test this script run this command from the project root:
 *
 * GITHUB_API_TOKEN=<your-token> ts-node -O { "module": "commonjs" }' scripts/release/index.ts
 */

import * as OctoKit from "@octokit/rest"
import * as semver from "semver"

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

// type Label = OctoKit.IssuesGetIssueLabelsResponseItem

// const requiredEnvs = ["GITHUB_API_TOKEN", "GITHUB_EMAIL", "GITHUB_USER"]

/**
 * Maps each release type to a numerical value for easier comparisons
 */

// requiredEnvs.forEach(env => {
//   if (!process.env[env]) {
//     throw new Error(`Needs ${env} to be set`)
//   }
// })

/**
 * Ensures that each PR in a release has a single, valid release label
 */
// const verifyReleaseLabels = (
//   pullRequest: PullRequest,
//   releaseLabels: Label[]
// ) => {
//   // @ts-ignore
//   const validLabels = Object.values(ReleaseLabel)

//   if (releaseLabels.length === 0) {
//     console.error(
//       `No release label specified on #${pullRequest.data.number}.\n` +
//         `Please add a release label: ${pullRequest.data.html_url}`
//     )
//     process.exit(1)
//   }

//   if (releaseLabels.length > 1) {
//     console.error(
//       `Too many release labels on #${pullRequest.data.number}.\n` +
//         `Please ensure there's only 1 release label: ${
//           pullRequest.data.html_url
//         }`
//     )
//     process.exit(1)
//   }

//   const label = releaseLabels[0]

//   if (!validLabels.includes(label.name)) {
//     console.error(
//       `Invalid release label '${label.name}' on #${
//         pullRequest.data.number
//       }.\n` +
//         `Please change it to use one of [${validLabels.join(", ")}]\n` +
//         pullRequest.data.html_url
//     )
//     process.exit(1)
//   }

//   return label
// }

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
    // TODO: Publish to NPM unless this version is already there
    console.log("Do NPM deploy")
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
