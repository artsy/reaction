// @ts-check

const Lint = require("tslint")
const ts = require("typescript")

const message = "Did you mean to use `SystemQueryRenderer` instead?"

class Rule extends Lint.Rules.AbstractRule {
  /**
   * @param {ts.SourceFile} sourceFile
   */
  apply(sourceFile) {
    // Skip storybook and test files.
    if (
      sourceFile.fileName.includes(".story") ||
      sourceFile.fileName.includes(".test")
    ) {
      return []
    }

    return this.applyWithWalker(
      new NoQueryRendererImportWalker(sourceFile, this.getOptions())
    )
  }
}

class NoQueryRendererImportWalker extends Lint.RuleWalker {
  visitImportDeclaration(node) {
    const importSource = node.moduleSpecifier.text

    if (importSource === "react-relay") {
      const namedBindings = node.importClause.namedBindings
      const namedImports =
        namedBindings &&
        namedBindings.elements &&
        namedBindings.elements.map(e => e.getText())

      if (namedImports.includes("QueryRenderer")) {
        this.addFailure(
          this.createFailure(node.getStart(), node.getWidth(), message)
        )
      }
    }

    // call the base version of this visitor to actually parse this node
    super.visitImportDeclaration(node)
  }
}

module.exports = { Rule: Rule }
