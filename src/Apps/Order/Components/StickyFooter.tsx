import { color, Flex, Link, Sans, Spacer } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ContextConsumer } from "Artsy/Router"
import React, { Component } from "react"
import styled from "styled-components"

interface StickyFooterProps {
  artworkId: string | null
}

@track()
export class StickyFooter extends Component<StickyFooterProps> {
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
      <FooterContainer height={50}>
        <ContextConsumer>
          {({ mediator }) => (
            <>
              <Sans size="2" color="black60">
                Need help?{" "}
                <Link onClick={this.onClickReadFAQ.bind(this)}>
                  Read our FAQ
                </Link>{" "}
                or{" "}
                <Link onClick={this.onClickAskSpecialist.bind(this, mediator)}>
                  ask a question
                </Link>.
              </Sans>
              <Spacer mb={2} />
            </>
          )}
        </ContextConsumer>
      </FooterContainer>
    )
  }
}

const FooterContainer = styled(Flex)`
  bottom: 0;
  position: fixed;
  width: 100%;
  border-top: 1px solid ${color("black10")};
  align-items: center;
  justify-content: center;
`
