/*
This file contains common/helper analytics methods that should
only be used client-side. For example, calling `initAnalytics()`
will set up all the standard pageview/user/bounce rate tracking.

This relies on `window.analytics` (wrapping Segment's Analytics.js)
to perform its analytics calls. That library automatically includes
enriched client-side information in its payload, which is why we
require/prefer that some calls happen cient-side.
*/
import { extend, pick } from "lodash"
import * as sharify from "sharify"

import { LoginResponseLocalData } from "./types"
const data = sharify.data as LoginResponseLocalData

export function initAnalytics() {
  if (typeof window === "undefined") {
    throw new Error("Method should only be used client-side")
  }
  Identify()
  Pageview()
  FifteenSecondBounceRate()
  ThreeMinuteBounceRate()
}

function Identify() {
  if (data.CURRENT_USER) {
    const whitelist = ["collector_level", "default_profile_id", "email", "id", "name", "phone", "type"]
    const traits = extend(pick(data.CURRENT_USER, whitelist), { session_id: data.SESSION_ID })

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
    category: "3 minutes",
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
