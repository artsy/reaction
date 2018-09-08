const isSpaceAttr = attr =>
  [
    "mx",
    "my",
    "ml",
    "mr",
    "mt",
    "mb",
    "px",
    "py",
    "pl",
    "pr",
    "pt",
    "pb",
  ].includes(attr.node.name.name)

const convertSpace = s => [0, 0.3, 0.5, 1, 2, 3, 4, 6, 9, 12, 18][s]

export default function(babel) {
  const { types: t } = babel

  return {
    name: "ast-transform", // not required
    visitor: {
      JSXAttribute(path) {
        const { name } = path.node.name
        if (isSpaceAttr(path)) {
          path.node.value.expression.value = convertSpace(
            path.node.value.expression.value
          )
        }
      },
    },
  }
}
