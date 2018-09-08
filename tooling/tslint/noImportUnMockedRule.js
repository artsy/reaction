// @ts-check

const Lint = require("tslint")
const ts = require("typescript")

class Rule extends Lint.Rules.AbstractRule {
  /**
   * @param {ts.SourceFile} sourceFile
   */
  apply(sourceFile) {
    // Test files only
    if (!sourceFile.fileName.includes(".test")) {
      return []
    }
    // Does it include mockTracking but not un-mock react-tracking?
    if (
      sourceFile.text.includes("mockTracking") &&
      !sourceFile.text.includes(`jest.unmock("react-tracking")`)
    ) {
      // Offer a fix-it, and show a message.
      const message =
        "You need to un-mock react-tracking if you are using mockTracking in this file."
      const fix = new Lint.Fix("fix-tracking", [
        new Lint.Replacement(0, 0, `jest.unmock("react-tracking")\n`),
      ])

      return [new Lint.RuleFailure(sourceFile, 0, 0, message, "tracking", fix)]
    }

    return []
  }
}

module.exports = { Rule: Rule }
