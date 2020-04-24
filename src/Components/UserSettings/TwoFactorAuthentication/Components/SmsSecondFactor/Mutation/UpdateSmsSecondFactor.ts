import {
  UpdateSmsSecondFactorInput,
  UpdateSmsSecondFactorMutation,
  UpdateSmsSecondFactorMutationResponse,
} from "__generated__/UpdateSmsSecondFactorMutation.graphql"
import { commitMutation, Environment, graphql } from "react-relay"

export const UpdateSmsSecondFactor = (
  environment: Environment,
  input: UpdateSmsSecondFactorInput
) => {
  return new Promise<UpdateSmsSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<UpdateSmsSecondFactorMutation>(environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation UpdateSmsSecondFactorMutation(
            $input: UpdateSmsSecondFactorInput!
          ) @raw_response_type {
            updateSmsSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on SecondFactor {
                  internalID
                }
              }
            }
          }
        `,
        variables: {
          input,
        },
      })
    }
  )
}
