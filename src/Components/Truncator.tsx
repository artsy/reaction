import React from "react"
import ReactDOM from "react-dom/server"
import { ErrorBoundary } from "./ErrorBoundary"

interface Props {
  maxLineCount?: number
  ellipsis?: string
  ReadMoreLink?: () => any
}

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

  // FIXME: Make safe for tests
  let HTMLEllipsis

  if (process.env.NODE_ENV !== "test") {
    const responsiveHOC = require("react-lines-ellipsis/lib/responsiveHOC")
    HTMLEllipsis = responsiveHOC()(require("react-lines-ellipsis/lib/html"))
  } else {
    HTMLEllipsis = ({ unsafeHTML }) => (
      <div
        dangerouslySetInnerHTML={{
          __html: unsafeHTML,
        }}
      />
    )
  }

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
