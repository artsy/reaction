import * as React from "react"
import { renderToString } from "react-dom/server"
import { ResponseLocal } from "sharify"
import { ServerStyleSheet } from "styled-components"

interface RenderResult {
  css: string
  html: string
}

interface TemplateOptions {
  entrypoint?: string
  bootstrapData?: string
  sharify?: ResponseLocal
  baseURL: string
}

export function renderElement(element: React.ReactElement<any>): RenderResult {
  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(element))
  const css = sheet.getStyleTags()
  return { html, css }
}

export function renderTemplate({
  css,
  html,
  entrypoint,
  bootstrapData,
  sharify,
  baseURL,
}: RenderResult & TemplateOptions): string {
  const fontsURL = "//webfonts.artsy.net/all-webfonts.css"
  const segmentWriteKey = sharify.data.SEGMENT_WRITE_KEY
  /* tslint:disable:max-line-length */
  const segmentJS = `
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.0.1";
  analytics.load("${segmentWriteKey}");
  }}();
  `
  /* tslint:enable:max-line-length */
  return `
      <html>
        <head>
          <title>Loyalty Program - Artsy</title>
          <link type="text/css" rel="stylesheet" href="${fontsURL}">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
          <style>#app-container { width: 100%; overflow: hidden;  }</style>
          ${css}
          <script type="text/javascript">${segmentJS}</script>
        </head>
        <body>
          <div id="app-container">${html}</div>
          ${sharify ? sharify.script() : ""}
          ${bootstrapData ? `<script>${bootstrapData}</script>` : ""}
          <script src="${baseURL}/bundles/commons.chunk.js"></script>
          ${entrypoint ? `<script src="${entrypoint}"></script>` : ""}
          <script src="${baseURL}/bundles/analytics.js"></script>
        </body>
      </html>
    `
}

export default function render(element: React.ReactElement<any>, templateOptions: TemplateOptions): string {
  return renderTemplate(Object.assign({}, renderElement(element), templateOptions))
}
