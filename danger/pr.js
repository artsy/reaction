const pr = danger.github.pr
const bodyAndTitle = (pr.body + pr.title).toLowerCase()
const trivialPR = bodyAndTitle.includes("trivial")

if (pr.assignee === null) {
  const method = trivialPR ? warn : fail
  method("Please assign someone to merge this PR, and optionally include people who should review.")
}
