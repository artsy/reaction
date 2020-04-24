import { BackupSecondFactorModalContentQueryRawResponse } from "__generated__/BackupSecondFactorModalContentQuery.graphql"
import { CreateBackupSecondFactorsMutationResponse } from "__generated__/CreateBackupSecondFactorsMutation.graphql"
import { TwoFactorAuthenticationQueryRawResponse } from "__generated__/TwoFactorAuthenticationQuery.graphql"

export const BackupSecondFactors = [
  { code: "d038183sj8", __typename: "BackupSecondFactor" },
  { code: "2494nzki4a", __typename: "BackupSecondFactor" },
  { code: "ze93hzna31", __typename: "BackupSecondFactor" },
  { code: "xfr93424b1", __typename: "BackupSecondFactor" },
  { code: "a93n5nziu3", __typename: "BackupSecondFactor" },
  { code: "asdf93nz81", __typename: "BackupSecondFactor" },
  { code: "q0499zn411", __typename: "BackupSecondFactor" },
  { code: "fn3i1x239m", __typename: "BackupSecondFactor" },
  { code: "asd0893n2d", __typename: "BackupSecondFactor" },
  { code: "a9zmemiejs", __typename: "BackupSecondFactor" },
]

export const MutationResponse: CreateBackupSecondFactorsMutationResponse = {
  createBackupSecondFactors: {
    secondFactorsOrErrors: {
      secondFactors: BackupSecondFactors,
    },
  },
}

export const DisabledQueryResponse: TwoFactorAuthenticationQueryRawResponse = {
  me: {
    id: "id",
    hasSecondFactorEnabled: false,
    appSecondFactors: [],
    smsSecondFactors: [],
    backupSecondFactors: [],
  },
}

export const AppEnabledWithBackupCodesQueryResponse: TwoFactorAuthenticationQueryRawResponse = {
  me: {
    id: "id",
    hasSecondFactorEnabled: true,
    appSecondFactors: [
      { __typename: "AppSecondFactor", internalID: "id", name: "Test Device" },
    ],
    smsSecondFactors: [],
    backupSecondFactors: BackupSecondFactors,
  },
}

export const BackupSecondFactorModalContentQueryResponse: BackupSecondFactorModalContentQueryRawResponse = {
  me: {
    id: "id",
    backupSecondFactors: BackupSecondFactors,
  },
}

export const BackupSecondFactorsMutationResponse: CreateBackupSecondFactorsMutationResponse = {
  createBackupSecondFactors: {
    secondFactorsOrErrors: {
      secondFactors: BackupSecondFactors,
    },
  },
}
