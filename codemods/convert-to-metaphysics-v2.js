// @ts-check
"use strict"

/**
 *  This codemode is intended to convert legacy ids in queries to their new values
 *  Run with `jscodeshift -t codemods/convert-to-metaphysics-v2.js --extensions tsx src/`
 **/

import { parse, visit, Kind, print } from "graphql"
import equal from "fast-deep-equal"
import prettier from "prettier"

// @ts-ignore
import pkg from "../package.json"

export const parser = "tsx"

const renameField = (ast, from, to) => {
  return visit(ast, {
    [Kind.FIELD]: {
      enter: gqlNode => {
        const { value } = gqlNode.name
        if (value === from) {
          return {
            ...gqlNode,
            name: {
              ...gqlNode.name,
              value: to,
            },
          }
        }
        return gqlNode
      },
    },
  })
}

export default function transformer(file, api) {
  const j = api.jscodeshift

  if (!file.source.includes("graphql`")) {
    return
  }

  const transformedGql = j(file.source)
    .find(j.TaggedTemplateExpression, {
      tag: { type: "Identifier", name: "graphql" },
    })
    .replaceWith(nodePath => {
      const { node } = nodePath
      const { raw } = nodePath.value.quasi.quasis[0].value
      const gqlAst = parse(raw)

      // FIXME: The id case is a bit complicated and needs to be handled smarter
      let editedAst = renameField(gqlAst, "id", "unknownIDType")

      editedAst = renameField(editedAst, "_id", "internalID")
      editedAst = renameField(editedAst, "__id", "id")

      if (!equal(gqlAst, editedAst)) {
        node.quasi.quasis[0].value = {
          raw: print(editedAst),
          cooked: print(editedAst),
        }
      }
      return node
    })

  return prettier.format(transformedGql.toSource(), {
    parser: "typescript",
    ...pkg.prettier,
  })
}
