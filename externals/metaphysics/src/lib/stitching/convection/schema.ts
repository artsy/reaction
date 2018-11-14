import { readFileSync } from "fs"
import {
  makeRemoteExecutableSchema,
  RenameTypes,
  transformSchema,
} from "graphql-tools"
import { createConvectionLink } from "./link"

export const executableConvectionSchema = () => {
  const convectionLink = createConvectionLink()
  const convectionTypeDefs = readFileSync("src/data/convection.graphql", "utf8")

  // Setup the default Schema
  const schema = makeRemoteExecutableSchema({
    schema: convectionTypeDefs,
    link: convectionLink,
  })

  // Remap the names of certain types from Convection to fit in the larger
  // metaphysics ecosystem.
  const remap = {
    Submission: "ConsignmentSubmission",
    Category: "ConsignmentSubmissionCategoryAggregation",
    Asset: "ConsignmentSubmissionCategoryAsset",
    State: "ConsignmentSubmissionStateAggregation",
    SubmissionConnection: "ConsignmentSubmissionConnection",
  }

  // Return the new modified schema
  return transformSchema(schema, [
    new RenameTypes(name => {
      const newName = remap[name] || name
      return newName
    }),
  ])
}
