import { commitMutation, Environment, graphql } from "relay-runtime"

import {
  CreateBackupSecondFactorsMutation,
  CreateBackupSecondFactorsMutationResponse,
} from "__generated__/CreateBackupSecondFactorsMutation.graphql"

export const CreateBackupSecondFactors = (environment: Environment) => {
  return new Promise<CreateBackupSecondFactorsMutationResponse>(
    async (resolve, reject) => {
      commitMutation<CreateBackupSecondFactorsMutation>(environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation CreateBackupSecondFactorsMutation(
            $input: CreateBackupSecondFactorsInput!
          ) {
            createBackupSecondFactors(input: $input) {
              secondFactorsOrErrors {
                ... on BackupSecondFactors {
                  secondFactors {
                    code
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {},
        },
      })
    }
  )
}
