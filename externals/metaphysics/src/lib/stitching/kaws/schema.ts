import { readFileSync } from "fs"
import {
  makeRemoteExecutableSchema,
  RenameRootFields,
  RenameTypes,
  transformSchema,
} from "graphql-tools"
import { createKawsLink } from "./link"

export const executableKawsSchema = () => {
  const kawsLink = createKawsLink()
  const kawsTypeDefs = readFileSync("src/data/kaws.graphql", "utf8")

  // Setup the default Schema
  const schema = makeRemoteExecutableSchema({
    schema: kawsTypeDefs,
    link: kawsLink,
  })

  // Remap the names of certain types from kaws to fit in the larger
  // metaphysics ecosystem.
  const remap = {
    Collection: "MarketingCollection",
    CollectionQuery: "MarketingCollectionQuery",
    Image: "MarketingImage",
  }

  // Return the new modified schema
  return transformSchema(schema, [
    new RenameTypes(name => {
      const newName = remap[name] || name
      return newName
    }),
    new RenameRootFields(
      (_operation, name) =>
        `marketing${name.charAt(0).toUpperCase() + name.slice(1)}`
    ),
  ])
}
