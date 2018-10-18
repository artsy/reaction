import { Sans, Spacer } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ContextConsumer } from "Artsy/Router"
import React, { Component } from "react"
import styled from "styled-components"

const Link = styled.a`
  text-decoration: underline;
`

interface HelperProps {
  artworkId: string | null
}

@track()
export class Helper extends Component<HelperProps> {
  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOReadFAQ,
    type: "button",
    flow: "buy now",
  }))
  onClickReadFAQ() {
    window.open("https://www.artsy.net/buy-now-feature-faq", "_blank")
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOAskSpecialist,
    type: "button",
    flow: "buy now",
  }))
  onClickAskSpecialist(mediator) {
    mediator.trigger("openOrdersContactArtsyModal", {
      artworkId: this.props.artworkId,
    })
  }

  render() {
    return (
      <ContextConsumer>
        {({ mediator }) => (
          <>
            <Sans size="2" color="black60">
              Have a question?{" "}
              <Link onClick={this.onClickReadFAQ.bind(this)}>Read our FAQ</Link>{" "}
              or{" "}
              <Link onClick={this.onClickAskSpecialist.bind(this, mediator)}>
                ask a specialist
              </Link>.
            </Sans>
            <Spacer mb={2} />
          </>
        )}
      </ContextConsumer>
    )
  }
}
