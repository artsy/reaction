import config from "config"
import { assign } from "lodash"
import urljoin from "url-join"
import fetch from "./fetch"

const { IMPULSE_API_BASE } = config

export default (path, accessToken, fetchOptions = {}) => {
  const headers = {}
  if (accessToken) assign(headers, { Authorization: `Bearer ${accessToken}` })
  return fetch(
    urljoin(IMPULSE_API_BASE, path),
    assign({}, fetchOptions, { headers })
  )
}
