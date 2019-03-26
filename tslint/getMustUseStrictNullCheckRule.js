// @ts-check

/**
 * Every file that uses `import { get } from 'Utils/get' _must_ include a comment
 * at the top of the file that makes it strict (//@ts-strict)
 */

const path = require("path")
const Lint = require("tslint")
const ts = require("typescript")

class Rule extends Lint.Rules.AbstractRule {
  /**
   * @param {ts.SourceFile} sourceFile
   */
  apply(sourceFile) {
    return this.applyWithWalker(
      new GetImportWalker(sourceFile, this.getOptions())
    )
  }
}

const FAIL_STRING = "Expected `// @ts-strict` comment on file with get import"

class GetImportWalker extends Lint.RuleWalker {
  visitImportDeclaration(node) {
    if (
      node.importClause &&
      node.importClause.namedBindings &&
      node.importClause.namedBindings.elements &&
      node.importClause.namedBindings.elements[0].name.text === "get"
    ) {
      const modulePath = node.moduleSpecifier.text
      if (modulePath.startsWith(".")) {
        const absModulePath = path.resolve(
          this.getSourceFile().fileName,
          modulePath
        )
        if (absModulePath.endsWith("Utils/get")) {
          verifyStrictNull(this, node)
        }
      } else {
        if (modulePath === "Utils/get") {
          verifyStrictNull(this, node)
        }
      }
    }
    this.getSourceFile().text
    super.visitImportDeclaration(node)
  }
}

const verifyStrictNull = (context, node) => {
  if (!context.getSourceFile().text.match(/\/\/\s*@ts-strict/)) {
    const fix = Lint.Replacement.appendText(0, "// @ts-strict\n")
    context.addFailure(
      context.createFailure(node.getStart(), node.getWidth(), FAIL_STRING, fix)
    )
  }
}

module.exports = { Rule: Rule }
