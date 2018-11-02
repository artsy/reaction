import OctoKit from "@octokit/rest"

export type PullRequest = OctoKit.IssuesGetResponse

export const annotateMessage = (pr: PullRequest, message: string) =>
  message.replace(/@user/g, `@${pr.user.login}`)

let octokit: OctoKit
function init(): OctoKit {
  if (!octokit) {
    octokit = new OctoKit()
    octokit.authenticate({
      type: "token",
      token: process.env.GITHUB_API_TOKEN,
    })
  }
  return octokit
}

export const getOwnerRepoFromURL = (repoUrl: string) => {
  const [owner, repo] = repoUrl.split("/").slice(-2)
  return { owner, repo }
}

interface GithubArg {
  github?: OctoKit
}

type CommentOnPRArgs = GithubArg & PullRequest
export const commentOnPR = (
  { github = init(), ...pr }: CommentOnPRArgs,
  lines: string[]
) => {
  const comment = lines.join("\n")
  // github.issues.createComment({
  console.log("github.issues.createComment(", {
    ...getOwnerRepoFromURL(pr.repository_url),
    number: pr.number,
    body: annotateMessage(pr, comment),
  })
  // )
}
