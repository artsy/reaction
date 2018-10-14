/**
 * To test this script run this command from the project root:
 *
 * GITHUB_API_TOKEN=<your-token> ts-node -O { "module": "commonjs" }' scripts/release.ts
 */

import * as OctoKit from "@octokit/rest"
import * as path from "path"
import * as Git from "simple-git/promise"

// const requiredEnvs = ["GITHUB_API_TOKEN", "GITHUB_EMAIL", "GITHUB_USER"]

// requiredEnvs.forEach(env => {
//   if (!process.env[env]) {
//     throw new Error(`Needs ${env} to be set`)
//   }
// })

const octokit = new OctoKit()
octokit.authenticate({
  type: "token",
  token: process.env.GITHUB_API_TOKEN,
})

const git = Git(path.join(__dirname, ".."))

const getLatestMasterCommit = () =>
  git.log(["--first-parent", "master"]).then(commit => commit.latest)

const getCommitForLastTag = () =>
  git
    .tags()
    .then(tags => tags.latest)
    .then(latestTag => git.log(["--tags", latestTag]))
    .then(commits => commits.latest)

const run = async () => {
  const masterSha = (await getLatestMasterCommit()).hash
  const lastTagSha = (await getCommitForLastTag()).hash

  console.log(masterSha, lastTagSha)

  if (masterSha === lastTagSha) {
    // TODO: Implement npm publish
    console.log("Do NPM deploy")
    return
  }

  const repoString = "artsy/reaction"
  const owner = "artsy"
  const repo = "reaction"

  /**
   * Finds all pull requests between master and the last release
   */
  const searchResponse = await octokit.search.issues({
    q: `${masterSha}..${lastTagSha} type:pr repo:${repoString}`,
  })

  // https://developer.github.com/v3/search/#search-issues
  const prsWithCommit = searchResponse.data.items.map(
    (i: any) => i.number
  ) as number[]
  for (const prNumber of prsWithCommit) {
    const pullRequest = await octokit.issues.get({
      owner,
      repo,
      number: prNumber,
    })

    const releaseLabels = pullRequest.data.labels.filter(label =>
      label.name.startsWith("release:")
    )
    if (releaseLabels.length === 0) {
      throw new Error(
        `No release label specified on #${pullRequest.data.number}.` +
          `\n\n\tPlease add a release label: ${pullRequest.data.html_url}`
      )
    }
    if (releaseLabels.length > 1) {
      throw new Error(
        `Too many release labels on #${pullRequest.data.number}.` +
          `\n\n\tPlease ensure there's only 1 release label: ${
            pullRequest.data.html_url
          }`
      )
    }
  }
}

run()
