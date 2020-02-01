import React from "react"
import ReactDOM from "react-dom/server"
import EllipsisHtml from "react-lines-ellipsis/lib/html"
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC"
import { ErrorBoundary } from "./ErrorBoundary"

interface Props {
  maxLineCount?: number
  ellipsis?: string
  ReadMoreLink?: () => any
}

/**
 * Truncate large bodies of text.
 * If you need to truncate a single line, consider using `text-overflow: ellipsis`.
 */
export const Truncator: React.SFC<Props> = ({
  ReadMoreLink,
  children,
  ellipsis,
  maxLineCount,
}) => {
  const html = ReactDOM.renderToStaticMarkup(<span>{children}</span>)
  let readMoreHTML = null

  if (ReadMoreLink) {
    readMoreHTML = ReactDOM.renderToStaticMarkup(ReadMoreLink())
  }

  const HTMLEllipsis = responsiveHOC()(EllipsisHtml)

  return (
    <ErrorBoundary>
      <HTMLEllipsis
        unsafeHTML={html}
        maxLine={String(maxLineCount || 2)}
        ellipsis={ellipsis}
        ellipsisHTML={readMoreHTML}
      />
    </ErrorBoundary>
  )
}
