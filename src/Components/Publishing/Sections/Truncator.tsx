import React from "react"
import ReactDOM from 'react-dom/server'

export const Truncator: React.SFC<any> = ({ children }) => {
  const html = ReactDOM.renderToStaticMarkup(<span>{children}</span>)

  // FIXME: Make safe for tests
  let HTMLEllipsis

  if (process.env.NODE_ENV !== 'test') {
    HTMLEllipsis = require('react-lines-ellipsis/lib/html')
  } else {
    HTMLEllipsis = ({ unsafeHTML }) => (
      <div dangerouslySetInnerHTML={{
        __html: unsafeHTML
      }} />
    )
  }

  return (
    <HTMLEllipsis
      unsafeHTML={html}
      trimRight={false}
      maxLine='2'
      ellipsis='...'
    />
  )
}
