import * as path from "path"
import * as Git from "simple-git/promise"

export const GIT_PROJECT_PATH = path.join(__dirname, "../../")

const git = Git(GIT_PROJECT_PATH)

export const getLatestMasterCommit = () =>
  git.log(["--first-parent", "master"]).then(commit => commit.latest)

export const getLastTag = () => git.tags().then(tags => tags.latest)

export const getCommitForTag = tag =>
  git.log(["--tags", tag]).then(commits => commits.latest)
