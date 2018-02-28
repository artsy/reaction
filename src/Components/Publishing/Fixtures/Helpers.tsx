import { compact, map } from "lodash"
import React from "react"

export const EditableChild = type => {
  return <div>Child {type}</div>
}

export const TextFromArticle = article => {
  return compact(map(article.sections, "body")).join("")
}
