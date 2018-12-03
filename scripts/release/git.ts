import { join } from "path"
import Git from "simple-git/promise"

export const GIT_PROJECT_PATH = join(__dirname, "../../")

const git = Git(GIT_PROJECT_PATH)

export const getLatestMasterCommit = () =>
  git.log(["--first-parent", "master"]).then(commit => commit.latest)

export const getLastTag = () => git.tags().then(tags => tags.latest)

export const getCommitForTag = tag =>
  git.log(["--tags", tag]).then(commits => commits.latest)

export const addAndCommitChanges = async version => {
  if (process.env.CI) {
    await git.add(".")
    await git.commit(`Release v${version}: updating release files [ci skip]`)
    // @ts-ignore FIXME: Update types
    await git.push(["-u", "origin", "master"]).catch(() => {
      // TODO: Add slack message to releases
      console.error("Git push failed, stopping release")
      process.exit(1)
    })
  } else {
    console.log("git add .")
    console.log(
      `git commit -m "Release v${version}: updating release files [ci skip]"`
    )
    console.log("git push -u origin master")
  }
}
