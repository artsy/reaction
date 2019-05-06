import { get } from "lodash"
import { data as sd } from "sharify"

export const isAdmin = () => {
  return get(sd, "CURRENT_USER") && get(sd, "CURRENT_USER.type") === "Admin"
}
