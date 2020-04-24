import {
  UpdateAppSecondFactorInput,
  UpdateAppSecondFactorMutation,
  UpdateAppSecondFactorMutationResponse,
} from "__generated__/UpdateAppSecondFactorMutation.graphql"
import { commitMutation, Environment, graphql } from "react-relay"

export const UpdateAppSecondFactor = (
  environment: Environment,
  input: UpdateAppSecondFactorInput
) => {
  return new Promise<UpdateAppSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<UpdateAppSecondFactorMutation>(environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation UpdateAppSecondFactorMutation(
            $input: UpdateAppSecondFactorInput!
          ) @raw_response_type {
            updateAppSecondFactor(input: $input) {
              secondFactorOrErrors {
                __typename

                ... on Errors {
                  errors {
                    message
                    code
                    path
                    data
                  }
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
