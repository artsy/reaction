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
  ].includes(attr.value.name.name)

const convertSpace = s => [0, 0.3, 0.5, 1, 2, 3, 4, 6, 9, 12, 18][s]

export default function transformer(file, api) {
  const j = api.jscodeshift

  return j(file.source)
    .find(j.JSXAttribute)
    .filter(isSpaceAttr)
    .map(attr => {
      // There's probably a better way to do this...
      attr.value.value.expression.value = convertSpace(
        attr.value.value.expression.value
      )
      return attr
    })
    .toSource()
}
