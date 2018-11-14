import { mutationWithClientMutationId } from "graphql-relay"
import { omit } from "lodash"
import { SubmissionType } from "./submission"

export const config = {
  name: "CreateSubmissionMutation",
  description: "Create a new consignment submission using Convection",
  inputFields: {
    ...omit(SubmissionType.getFields(), ["id", "_id", "__id", "artist"]),
  } as any,
  outputFields: {
    consignment_submission: {
      type: SubmissionType,
      resolve: response => response,
    },
  },
  mutateAndGetPayload: (
    request,
    _response,
    { rootValue: { submissionCreateLoader } }
  ) => {
    if (!submissionCreateLoader) return null
    return submissionCreateLoader(request)
  },
}
export default mutationWithClientMutationId(config)
