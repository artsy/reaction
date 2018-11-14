import config from "config"
import urljoin from "url-join"
import fetch from "./fetch"

const { DELTA_API_BASE } = config

export default (path, _accessToken, fetchOptions = {}) =>
  fetch(urljoin(DELTA_API_BASE, path), fetchOptions)
