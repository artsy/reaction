import React from "react"
import { AuctionResultsRefetchContainer } from "./AuctionResultsRefetchContainer"

export const AuctionResultsRoute = props => {
  return <AuctionResultsRefetchContainer artist={props.artist} />
}
