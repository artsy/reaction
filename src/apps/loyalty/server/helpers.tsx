import * as React from "react"

import { renderToString } from "react-dom/server"
import ThreewThankYou from "../containers/3w_thank_you"
import AcbThankYou from "../containers/acb_thank_you"
import RepeatVisitor from "../containers/repeat_visitor"
import { CollectorProfileResponse } from "./gravity"

export function ThankYouHtml(info: CollectorProfileResponse, userName?: string, recentApplicant?: boolean): string {
  if (recentApplicant) {
    if (info.confirmed_buyer_at) {
      return renderToString(<AcbThankYou />)
    }
    return renderToString(<ThreewThankYou userName={userName} />)
  }
  return renderToString(<RepeatVisitor />)
}
