import config from "config"
import { assign } from "lodash"
import urljoin from "url-join"
import fetch from "./fetch"

const { CONVECTION_API_BASE } = config

export default (path, accessToken, fetchOptions = {}) => {
  const headers = { Accept: "application/json" }
  if (accessToken) assign(headers, { Authorization: `Bearer ${accessToken}` })
  return fetch(
    urljoin(CONVECTION_API_BASE, path),
    assign({}, fetchOptions, { headers })
  )
}
