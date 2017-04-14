interface TemplateData {
  styles: string
  html: string
  entrypoint: string
  bootstrapData?: string
  sharify?: string
}

export default ({styles, html, entrypoint, bootstrapData, sharify}: TemplateData) => {
  const fontsURL = "//fast.fonts.net/cssapi/f7f47a40-b25b-44ee-9f9c-cfdfc8bb2741.css"

  return `
      <html>
        <head>
          <title>Loyalty Program - Artsy</title>
          <link type="text/css" rel="stylesheet" href="${fontsURL}">
          <style>${styles}</style>
        </head>
        <body>
          <div id="app-container">${html}</div>
          ${sharify ? sharify : ""}
          ${bootstrapData ? "<script>" + bootstrapData + "</script>" : ""}
          <script src="/loyalty/bundles/commons.chunk.js"></script>
          <script src="${entrypoint}"></script>
        </body>
      </html>
    `
}
