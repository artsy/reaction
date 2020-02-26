export interface IdentityVerificationInfo {
  /**
   * database id of a User record (instance of user registered for an auction)
   */
  user_id: string

  /**
   * database id of a IdentityVerification record (instance of user registered for an auction)
   */
  identity_verification_id: string
}
