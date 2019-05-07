import { get } from "lodash"
import { data as sd } from "sharify"

export const isAdmin = () => {
  // @TODO: Remove this check after new ad implemention is complete
  if (process.env.NODE_ENV === "test") {
    return true
  }
  return get(sd, "CURRENT_USER") && get(sd, "CURRENT_USER.type") === "Admin"
}
