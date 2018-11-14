// The below all relate to Convection stitching.
// TODO: Refactor when adding another service.
// Also, consider https://github.com/artsy/README/issues/31
//
import { createHttpLink } from "apollo-link-http"
import fs from "fs"
import { introspectSchema } from "graphql-tools"
import { printSchema } from "graphql/utilities"
import fetch from "node-fetch"
import path from "path"
import urljoin from "url-join"

const destination = "src/data"

const httpConvectionLink = createHttpLink({
  fetch,
  uri: urljoin("https://convection-staging.artsy.net/api", "graphql"),
})

introspectSchema(httpConvectionLink)
  .then(schema => {
    return fs.writeFileSync(
      path.join(destination, "convection.graphql"),
      printSchema(schema, { commentDescriptions: true })
    )
  })
  .catch(error => console.log(error))
