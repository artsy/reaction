import { data as sd } from "sharify"

/**
 * For now ads, served by Hashtag Labs are only to viewable in the following instances:
 *  1) When the environment is NOT Production (HASHTAG_LAB_ADS_ENABLED set to false)
 *  2) When a user is an Admin
 *  3) When a user has been added to the allowlist set via HASHTAG_LAB_ADS_ALLOWLIST
 */

export const isHTLAdEnabled = () => {
  const allowedUsers = (sd.HASHTAG_LAB_ADS_ALLOWLIST || "")
    .split(",")
    .filter(Boolean)
  const currentUser = sd.CURRENT_USER && sd.CURRENT_USER.email // FIXME: Remove after externally served ads are implemented
  const isAllowedUser = allowedUsers.includes(currentUser)
  const isAdminUser =
    (sd.CURRENT_USER && sd.CURRENT_USER.type === "Admin") || false

  if (!sd.HASHTAG_LAB_ADS_ENABLED) {
    return false
  }
  if (isAllowedUser || isAdminUser) {
    return true
  }
  return false
}
