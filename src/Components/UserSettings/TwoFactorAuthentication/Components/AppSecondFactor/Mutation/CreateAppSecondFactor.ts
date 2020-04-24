import {
  CreateAppSecondFactorInput,
  CreateAppSecondFactorMutation,
  CreateAppSecondFactorMutationResponse,
} from "__generated__/CreateAppSecondFactorMutation.graphql"
import { commitMutation, Environment, graphql } from "react-relay"

export const CreateAppSecondFactor = (
  environment: Environment,
  input: CreateAppSecondFactorInput
) => {
  return new Promise<CreateAppSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<CreateAppSecondFactorMutation>(environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation CreateAppSecondFactorMutation(
            $input: CreateAppSecondFactorInput!
          ) @raw_response_type {
            createAppSecondFactor(input: $input) {
              secondFactorOrErrors {
                __typename

                ... on AppSecondFactor {
                  internalID
                  otpSecret
                  otpProvisioningURI
                  name
                }

                ... on Errors {
                  errors {
                    message
                    code
                    data
                    path
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
