import React from "react"
import ReactDOM from "react-dom/server"
import { ErrorBoundary } from "../../ErrorBoundary"

interface Props {
  maxLineCount?: number
}

export const Truncator: React.SFC<Props> = ({ children, maxLineCount }) => {
  const html = ReactDOM.renderToStaticMarkup(<span>{children}</span>)

  // FIXME: Make safe for tests
  let HTMLEllipsis

  if (process.env.NODE_ENV !== "test") {
    HTMLEllipsis = require("react-lines-ellipsis/lib/html")
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
        trimRight={false}
        maxLine={maxLineCount || 2}
        ellipsis="..."
      />
    </ErrorBoundary>
  )
}
