// @ts-check

const Lint = require("tslint")
const ts = require("typescript")
const { BREAK, parse, visit } = require("graphql")

class Rule extends Lint.Rules.AbstractRule {
  /**
   * @param {ts.SourceFile} sourceFile
   */
  apply(sourceFile) {
    return this.applyWithWalker(
      new RelayOperationGenericsWalker(sourceFile, this.getOptions())
    )
  }
}

class RelayOperationGenericsWalker extends Lint.RuleWalker {
  constructor(sourceFile, options) {
    super(sourceFile, options)
    this._imports = []
  }

  /**
   * @return {ts.ImportDeclaration[]}
   */
  getImports() {
    return this._imports
  }

  /**
   *
   * @param {ts.ImportDeclaration} node
   */
  visitImportDeclaration(node) {
    this._imports.push(node)
    super.visitImportDeclaration(node)
  }

  /**
   * @param {ts.JsxSelfClosingElement} node
   */
  visitJsxSelfClosingElement(node) {
    // TODO: So many hoops to jump through without TS :/
    /** @type {any} */
    let any

    if (node.tagName.getText() === "QueryRenderer") {
      for (const property of node.attributes.properties) {
        if (
          property.kind === ts.SyntaxKind.JsxAttribute &&
          property.name.getText() === "query"
        ) {
          const initializer = property.initializer
          if (initializer.kind === ts.SyntaxKind.JsxExpression) {
            this.visitOperationConfiguration(
              node,
              initializer.expression,
              node.tagName
            )
          } else {
            this.addFailureAtNode(
              initializer,
              "expected a graphql`…` tagged-template expression"
            )
          }
          break
        }
      }
    }

    super.visitJsxSelfClosingElement(node)
  }

  /**
   * @param {ts.CallExpression} node
   */
  visitCallExpression(node) {
    // TODO: So many hoops to jump through without TS :/
    /** @type {any} */
    let any

    any = node.expression
    /** @type {ts.Identifier} */
    const functionName = any
    if (functionName.text === "commitMutation") {
      any = node.arguments[1]
      /** @type {undefined | ts.ObjectLiteralExpression} */
      const config = any
      if (config && config.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        // any = this.visitOperationConfiguration(node, config, functionName)
        for (const property of config.properties) {
          if (property.name.getText() === "mutation") {
            if (property.kind === ts.SyntaxKind.PropertyAssignment) {
              /** @type {ts.PropertyAssignment} */
              const assignment = property
              this.visitOperationConfiguration(
                node,
                assignment.initializer,
                functionName
              )
            } else {
              // TODO: Need to expand parsing if we want to support e.g.
              //       short-hand property assignment.
              this.addFailureAtNode(
                property,
                "use traditional assignment for mutation query"
              )
            }
            break
          }
        }
      }
    }

    super.visitCallExpression(node)
  }

  /**
   *
   * @param {ts.CallExpression | ts.JsxSelfClosingElement} node
   * @param {ts.Expression} expression
   * @param {*} functionOrTagName
   */
  visitOperationConfiguration(node, expression, functionOrTagName) {
    // TODO: So many hoops to jump through without TS :/
    /** @type {any} */
    let any

    any = expression
    /** @type {ts.TaggedTemplateExpression} */
    const taggedTemplate = any

    if (
      taggedTemplate.kind === ts.SyntaxKind.TaggedTemplateExpression &&
      taggedTemplate.tag.getText() === "graphql"
    ) {
      any = node.typeArguments && node.typeArguments[0]
      /** @type {ts.TypeReferenceNode | undefined} */
      const typeArgument = any
      if (!typeArgument) {
        const operationName = getOperationName(taggedTemplate)
        const fixes = this.createFixes(
          functionOrTagName.getEnd(),
          0,
          `<${operationName}>`,
          operationName
        )
        this.addFailureAtNode(
          functionOrTagName,
          "missing operation type parameter",
          fixes
        )
      } else {
        const operationName = getOperationName(taggedTemplate)
        if (
          typeArgument.kind !== ts.SyntaxKind.TypeReference ||
          typeArgument.typeName.getText() !== operationName
        ) {
          const fixes = this.createFixes(
            typeArgument.getStart(),
            typeArgument.getWidth(),
            operationName,
            operationName
          )
          this.addFailureAtNode(
            typeArgument,
            `expected operation type parameter to be \`${operationName}\``,
            fixes
          )
        }
      }
    } else {
      this.addFailureAtNode(
        taggedTemplate,
        "expected a graphql`…` tagged-template"
      )
    }
  }

  /**
   * @param {number} start
   * @param {number} width
   * @param {string} replacement
   * @param {string} operationName
   * @returns {Lint.Replacement[]}
   */
  createFixes(start, width, replacement, operationName) {
    const fixes = [new Lint.Replacement(start, width, replacement)]
    if (!this.hasImportForOperation(operationName)) {
      fixes.push(this.importDeclarationFixForOperation(operationName))
    }
    return fixes
  }

  /**
   * @param {string} operationName
   */
  importPathForOperation(operationName) {
    const options = this.getOptions()[0] || {
      artifactDirectory: "__generated__",
      makeRelative: false,
    }
    if (options.makeRelative) {
      throw new Error(
        "[relayOperationGenericsRule] Making import declarations relative is not implemented yet."
      )
    }
    return `${options.artifactDirectory}/${operationName}.graphql`
  }

  importDeclarationFixForOperation(operationName) {
    const path = this.importPathForOperation(operationName)
    const importDeclaration = `import { ${operationName} } from "${path}"\n`

    const imports = this.getImports()
    const lastImport = imports[imports.length - 1]

    let start = 0
    if (lastImport) {
      start = lastImport.getEnd() + 1
    }

    return new Lint.Replacement(start, 0, importDeclaration)
  }

  /**
   * @param {string} operationName
   */
  hasImportForOperation(operationName) {
    // TODO: So many hoops to jump through without TS :/
    /** @type {any} */
    let any

    const importPath = this.importPathForOperation(operationName)

    return this.getImports().some(node => {
      any = node.moduleSpecifier
      /** @type {ts.StringLiteral} */
      const path = any
      if (path.text === importPath && node.importClause) {
        any = node.importClause.namedBindings
        /** @type {ts.NamedImports} */
        const namedBindings = any
        if (namedBindings) {
          return namedBindings.elements.some(
            element => element.name.getText() === operationName
          )
        }
      }
      return false
    })
  }
}

/**
 *
 * @param {ts.TaggedTemplateExpression} taggedTemplate
 * @return {string | null}
 */
function getOperationName(taggedTemplate) {
  const template = taggedTemplate.template.getFullText()
  // Strip backticks
  const source = template.substring(1, template.length - 1)

  const ast = parse(source)
  let queryName = null
  visit(ast, {
    OperationDefinition(node) {
      queryName = node.name.value
      return BREAK
    },
  })

  return queryName
}

module.exports = { Rule }
