import config from "config"
import { resolveBlueGreen } from "lib/helpers"
import { assign, omit } from "lodash"
import urljoin from "url-join"
import { headers as requestIDHeaders } from "../requestIDs"
import fetch from "./fetch"

const {
  GRAVITY_API_BASE,
  GRAVITY_API_BASE_GREEN,
  GRAVITY_API_PERCENT_REDIRECT,
} = config

export default (path, accessToken, fetchOptions: any = {}) => {
  const headers = { "X-XAPP-TOKEN": config.GRAVITY_XAPP_TOKEN }
  let fetchParams = fetchOptions

  const requestIDs = fetchOptions.requestIDs
  if (requestIDs) {
    fetchParams = omit(fetchOptions, "requestIDs")
    assign(headers, requestIDHeaders(requestIDs))
  }

  if (accessToken) assign(headers, { "X-ACCESS-TOKEN": accessToken })

  return fetch(
    urljoin(
      resolveBlueGreen(
        GRAVITY_API_BASE!,
        GRAVITY_API_BASE_GREEN!,
        GRAVITY_API_PERCENT_REDIRECT
      ),
      path
    ),
    assign({}, fetchParams, { headers })
  )
}
