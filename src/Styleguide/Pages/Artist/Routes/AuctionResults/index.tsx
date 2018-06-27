import { AuctionResults_artist } from "__generated__/AuctionResults_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionResultsRefetchContainer as AuctionResults } from "./AuctionResultsRefetchContainer"

export interface AuctionResultsRouteProps {
  artist: AuctionResults_artist
}

export const AuctionResultsRoute = (props: AuctionResultsRouteProps) => {
  return <AuctionResults artist={props.artist as any} />
}

export const AuctionResultsRouteFragmentContainer = createFragmentContainer(
  AuctionResultsRoute,
  graphql`
    fragment AuctionResults_artist on Artist {
      ...AuctionResultsRefetchContainer_artist
    }
  `
)
