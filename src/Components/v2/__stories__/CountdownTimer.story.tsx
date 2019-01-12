import { Flex } from "@artsy/palette"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { StepSummaryItem } from "Components/v2/StepSummaryItem"
import moment from "moment"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Components", module).add("CountdownTimer", () => {
  return (
    <Flex m="30px auto" flexDirection="column" width="100%" maxWidth="542px">
      <StepSummaryItem title="Just started" width="100%" maxWidth="542px">
        <CountdownTimer
          action="Respond"
          note="Expired offers end the negotiation process permanently."
          countdownEnd={moment()
            .add(2, "days")
            .toISOString()}
          countdownStart={moment().toISOString()}
        />
      </StepSummaryItem>
      <StepSummaryItem title="Half way there">
        <CountdownTimer
          action="Respond"
          note="Expired offers end the negotiation process permanently."
          countdownEnd={moment()
            .add(1, "days")
            .toISOString()}
          countdownStart={moment()
            .subtract(1, "days")
            .toISOString()}
        />
      </StepSummaryItem>
      <StepSummaryItem title="Moves fast!" width="100%" maxWidth="542px">
        <CountdownTimer
          action="Respond"
          note="Expired offers end the negotiation process permanently."
          countdownEnd={moment()
            .add(10, "seconds")
            .toISOString()}
          countdownStart={moment().toISOString()}
        />
      </StepSummaryItem>
      <StepSummaryItem
        title="Only an hour left to go!"
        width="100%"
        maxWidth="542px"
      >
        <CountdownTimer
          action="Respond"
          note="Expired offers end the negotiation process permanently."
          countdownEnd={moment()
            .add(1, "hour")
            .toISOString()}
          countdownStart={moment()
            .subtract(2, "days")
            .toISOString()}
        />
      </StepSummaryItem>
      <StepSummaryItem title="Out of time!!" width="100%" maxWidth="542px">
        <CountdownTimer
          action="You forgot to do the thing 😵"
          note="And now it's too late."
          countdownEnd={moment()
            .subtract(10, "seconds")
            .toISOString()}
          countdownStart={moment()
            .subtract(2, "days")
            .toISOString()}
        />
      </StepSummaryItem>
    </Flex>
  )
})
