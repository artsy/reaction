const pr = danger.github.pr
const bodyAndTitle = (pr.body + pr.title).toLowerCase()
const trivialPR = bodyAndTitle.includes("trivial")

if (pr.assignee === null) {
  const method = trivialPR ? warn : fail
  method(
    "Please assign someone to merge this PR, and optionally include people who should review."
  )
}

const generatedOnly = (file: string) => file.includes("src/__generated__/")
const modifiedGeneratedFiles = danger.git.modified_files.filter(generatedOnly)
if (modifiedGeneratedFiles.length > 15) {
  warn(`There are ${modifiedGeneratedFiles.length} generated files modified.`)
}
