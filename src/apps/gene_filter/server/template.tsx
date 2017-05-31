import { ResponseLocal } from "sharify"

interface TemplateData {
  entrypoint: string
  baseURL: string,
  sharify?: ResponseLocal,
}

export default ({ entrypoint, baseURL, sharify }: TemplateData) => {
  const fontsURL = "//fast.fonts.net/cssapi/f7f47a40-b25b-44ee-9f9c-cfdfc8bb2741.css"

  return `
      <html>
        <head>
          <title>Artsy</title>
          <link type="text/css" rel="stylesheet" href="${fontsURL}">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
          <style>#app-container { width: 100%; overflow: hidden;  }</style>
        </head>
        <body>
          <div id="app-container"></div>
          <script src="${baseURL}/bundles/commons.chunk.js"></script>
          ${sharify ? sharify.script() : ""}
          <script src="${entrypoint}"></script>
        </body>
      </html>
    `
}
