import * as React from "react"

import ThreewThankYou from "../3w_thank_you"
import AcbThankYou from "../acb_thank_you"
import RepeatVisitor from "../repeat_visitor"

interface Props {
  profile: CollectorProfile
  userName?: string
  recentApplicant?: boolean
}

const ThankYouContainer: React.SFC<Props> = props => {
  if (props.recentApplicant) {
    if (props.profile.confirmed_buyer_at) {
      return <AcbThankYou />
    }
    return <ThreewThankYou userName={props.userName} />
  }
  return <RepeatVisitor />
}

export default ThankYouContainer
