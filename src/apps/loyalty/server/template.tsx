import { ResponseLocal } from "sharify"

interface TemplateData {
  styles: string
  html: string
  entrypoint: string
  bootstrapData?: string
  sharify?: ResponseLocal,
  baseURL: string
}

export default ({ styles, html, entrypoint, bootstrapData, sharify, baseURL }: TemplateData) => {
  const fontsURL = "//fast.fonts.net/cssapi/f7f47a40-b25b-44ee-9f9c-cfdfc8bb2741.css"
  return `
      <html>
        <head>
          <title>Loyalty Program - Artsy</title>
          <link type="text/css" rel="stylesheet" href="${fontsURL}">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
          <style>#app-container { width: 100%; overflow: hidden;  }</style>
          <style>${styles}</style>
        </head>
        <body>
          <div id="app-container">${html}</div>
          ${sharify ? sharify.script() : ""}
          ${bootstrapData ? "<script>" + bootstrapData + "</script>" : ""}
          <script src="${baseURL}/bundles/commons.chunk.js"></script>
          <script src="${entrypoint}"></script>
        </body>
      </html>
    `
}
