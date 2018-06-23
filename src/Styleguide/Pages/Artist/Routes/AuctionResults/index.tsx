import React from "react"
import { AuctionResultsRefetchContainer as AuctionResults } from "./AuctionResultsRefetchContainer"

export const AuctionResultsRoute = props => {
  return <AuctionResults artist={props.artist} />
}
