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
          <style>${styles}</style>
          <script type="text/javascript">${segmentJS}</script>
        </head>
        <body>
          <div id="app-container">${html}</div>
          ${sharify ? sharify.script() : ""}
          ${bootstrapData ? "<script>" + bootstrapData + "</script>" : ""}
          <script src="${baseURL}/bundles/commons.chunk.js"></script>
          <script src="${entrypoint}"></script>
          <script src="${baseURL}/bundles/analytics.js"></script>
        </body>
      </html>
    `
}
