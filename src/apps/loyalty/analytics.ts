import { extend, pick } from "lodash"
import * as sharify from "sharify"

import { ResponseLocalData } from "./types"
const data = sharify.data as ResponseLocalData

const Analytics = require("analytics-node")

let analytics
if (data.SEGMENT_WRITE_KEY) {
  analytics = new Analytics(data.SEGMENT_WRITE_KEY, { flushAt: 1 })
}

export function initAnalytics() {
  Identify()
  Pageview()
  FifteenSecondBounceRate()
  ThreeMinuteBounceRate()
}

export function TrackSubmission(properties: Object) {
  if (data.CURRENT_USER) {
    const options = {
      userId: data.CURRENT_USER.id,
      event: "Submitted loyalty purchases",
      properties,
    }
    analytics.track(options)
  }
}

function Identify() {
  if (data.CURRENT_USER) {
    let whitelist = ["collector_level", "default_profile_id", "email", "id", "name", "phone", "type"]
    let traits = extend(pick(data.CURRENT_USER, whitelist), { session_id: data.SESSION_ID })

    const options = {
      userId: data.CURRENT_USER.id,
      traits,
      integrations: { Marketo: false },
    }

    analytics.identify(options)
  }
}

function FifteenSecondBounceRate() {
  const options = {
    userId: data.CURRENT_USER.id,
    event: "time on page more than 15 seconds",
    category: "15 seconds",
    message: location.pathname,
  }
  setTimeout(() => {
    analytics.track(options)
  }, 15000)
}

function ThreeMinuteBounceRate() {
  const options = {
    userId: data.CURRENT_USER.id,
    event: "time on page more than 15 seconds",
    category: "15 seconds",
    message: location.pathname,
  }
  setTimeout(() => {
    analytics.track(options)
  }, 180000)
}

function Pageview() {
  if (data.CURRENT_USER) {
    const options = {
      userId: data.CURRENT_USER.id,
      integrations: { Marketo: false },
    }
    analytics.page(options)
  }
}
