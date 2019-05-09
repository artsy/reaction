import { get } from "lodash"
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
  const currentUser = get(sd, "CURRENT_USER.email", "")
  const isAllowedUser = allowedUsers.includes(currentUser)
  const isAdminUser =
    get(sd, "CURRENT_USER.type", "") === "Admin" ? true : false

  if (!sd.HASHTAG_LAB_ADS_ENABLED) {
    return false
  }
  if (isAllowedUser || isAdminUser) {
    return true
  }
  return false
}
