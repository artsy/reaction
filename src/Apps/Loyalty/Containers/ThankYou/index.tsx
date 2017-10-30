import React from "react"

import ThreewThankYou from "../3wThankYou"
import AcbThankYou from "../AcbThankYou"
import RepeatVisitor from "../RepeatVisitor"

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
