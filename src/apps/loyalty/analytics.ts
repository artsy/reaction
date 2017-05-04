import { extend, pick } from "lodash"
import * as sharify from "sharify"

import { LoginResponseLocalData } from "./types"
const data = sharify.data as LoginResponseLocalData

export function initAnalytics() {
  Identify()
  Pageview()
  FifteenSecondBounceRate()
  ThreeMinuteBounceRate()
}

function Identify() {
  if (data.CURRENT_USER) {
    let whitelist = ["collector_level", "default_profile_id", "email", "id", "name", "phone", "type"]
    let traits = extend(pick(data.CURRENT_USER, whitelist), { session_id: data.SESSION_ID })

    const options = {
      integrations: { Marketo: false },
    }
    window.analytics.identify(data.CURRENT_USER.id, traits, options)
  }
}

function FifteenSecondBounceRate() {
  const options = {
    category: "15 seconds",
    message: location.pathname,
  }
  setTimeout(() => {
    window.analytics.track("time on page more than 15 seconds", options)
  }, 15000)
}

function ThreeMinuteBounceRate() {
  const options = {
    category: "15 seconds",
    message: location.pathname,
  }
  setTimeout(() => {
    window.analytics.track("time on page more than 3 minutes", options)
  }, 180000)
}

function Pageview() {
  const options = {
    path: location.pathname,
    integrations: { Marketo: false },
  }
  window.analytics.page(options)
}
