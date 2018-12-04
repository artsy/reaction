/**
 * To test this script run this command from the project root:
 *
 * GITHUB_API_TOKEN=<your-token> ts-node -O { "module": "commonjs", "esModuleInterop": true }' scripts/release/index.ts
 */

import OctoKit from "@octokit/rest"
import { spawn } from "child_process"
import { readFile, writeFile } from "fs"
import { join } from "path"
import semver from "semver"
import { promisify } from "util"

import {
  readChangelog,
  updateChangelogWithRelease,
  writeChangelog,
} from "./changelog"

import {
  addAndCommitChanges,
  getCommitForTag,
  getLastTag,
  getLatestMasterCommit,
} from "./git"

import {
  getLargestReleaseLabel,
  incrementVersionByReleaseLabel,
  ReleaseLabel,
  strToReleaseLabel,
  validReleaseLabels,
} from "./labels"

import { PullRequest } from "./github"

const read = promisify(readFile)
const write = promisify(writeFile)

const npm = (args: string) =>
  new Promise(resolve => {
    const dryRun = process.env.CI ? "" : "--dry-run"
    const child = spawn("npm", [args, dryRun], {
      shell: true,
      cwd: process.cwd(),
      env: process.env,
    })

    child.stdout.on("data", d => console.log(d))
    child.stdout.on("error", e => console.error(e))
    child.on("close", code => {
      if (code !== 0) {
        console.log(`npm command ${args} failed`)
        process.exit(1)
      }
      resolve()
    })
  })

const repoString = "artsy/reaction"
const requiredEnvs = ["GITHUB_API_TOKEN"]

requiredEnvs.forEach(env => {
  if (!process.env[env]) {
    throw new Error(`Needs ${env} to be set`)
  }
})

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

  /**
   * Finds all pull requests between master and the last release
   */
  const pullRequests: PullRequest[] = await octokit.search
    .issues({
      q: `${masterSha}..${lastTagSha} type:pr repo:${repoString}`,
    })
    .then(res => res.data.items || [])

  console.log(pullRequests.map(pr => pr.html_url))

  if (!validReleaseLabels(pullRequests)) {
    process.exit(1)
  }

  // TODO: Add extra docs about what's happening here
  // Determine the release type by the largest label present on the PRs
  const releaseLabels = pullRequests
    .map(pr => pr.labels)
    .reduce((acc, curr) => acc.concat(curr), [])
    .map(label => strToReleaseLabel(label.name))
    .filter(label => !!label) as ReleaseLabel[]

  releaseType = getLargestReleaseLabel(releaseLabels)

  if (releaseType === ReleaseLabel.None) {
    console.log("Release type is none, skipping release.")
    return
  }

  console.log(`Release of interface ${releaseType} detected.`)

  const newVersion = incrementVersionByReleaseLabel(currentVersion, releaseType)
  console.log("Upgrading", currentVersion, "->", newVersion)

  // TODO: Check PR for changes entry

  await readChangelog()
    .then(changelog => updateChangelogWithRelease(changelog, newVersion))
    .then(changelog => writeChangelog(changelog))

  const pkgPath = join(__dirname, "../../package.json")
  const pkg = JSON.parse(await read(pkgPath, "UTF-8"))
  pkg.version = newVersion

  console.log("Writing to package.json at ", pkgPath)
  if (process.env.CI) {
    await write(pkgPath, JSON.stringify(pkg, null, 2))
  } else {
    console.log(JSON.stringify(pkg, null, 2), "\n")
  }

  await addAndCommitChanges(newVersion)

  write(
    join(process.cwd(), ".npmrc"),
    `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`
  )

  console.log("beginning publish")

  npm("publish")
}

run()
