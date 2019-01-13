import { AuctionTimer_sale } from "__generated__/AuctionTimer_sale.graphql"
import { AuctionTimerQuery } from "__generated__/AuctionTimerQuery.graphql"
import { ContextConsumer } from "Artsy/SystemContext"
import { Timer } from "Components/v2/Timer"
import moment from "moment-timezone"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

export interface Props {
  sale: AuctionTimer_sale
}

export class AuctionTimer extends React.Component<Props> {
  get endDate() {
    const { sale } = this.props
    const { end_at } = sale

    return this.liveStartAt || end_at
  }

  get liveStartAt() {
    const { sale } = this.props
    const { live_start_at } = sale

    // TODO: Figure out why this comes back from MP
    if (live_start_at !== "Invalid date") {
      return live_start_at
    }

    return null
  }

  render() {
    return (
      <Timer
        labelWithTimeRemaining={this.labelWithTimeRemaining()}
        labelWithoutTimeRemaining={this.labelWithoutTimeRemaining()}
        endDate={this.endDate}
      />
    )
  }

  labelWithTimeRemaining() {
    const display = moment(this.endDate).format("MMM D, ha")
    if (this.liveStartAt) {
      return `Live ${display}`
    } else {
      return `Ends ${display}`
    }
  }

  labelWithoutTimeRemaining() {
    if (this.liveStartAt) {
      return "In progress"
    } else {
      return "Bidding closed"
    }
  }
}

export const AuctionTimerFragmentContainer = createFragmentContainer(
  AuctionTimer,
  graphql`
    fragment AuctionTimer_sale on Sale {
      live_start_at
      end_at
    }
  `
)

export const AuctionTimerQueryRenderer = ({ saleID }: { saleID: string }) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<AuctionTimerQuery>
            environment={relayEnvironment}
            variables={{ saleID }}
            query={graphql`
              query AuctionTimerQuery($saleID: String!) {
                sale(id: $saleID) {
                  ...AuctionTimer_sale
                }
              }
            `}
            render={({ props }) => {
              return (
                props && <AuctionTimerFragmentContainer sale={props.sale} />
              )
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}
