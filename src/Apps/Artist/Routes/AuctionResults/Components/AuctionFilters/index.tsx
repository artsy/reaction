import React from "react"
import { AuctionHouseFilter } from "./AuctionHouseFilter"
import { SizeFilter } from "./SizeFilter"

export const AuctionFilters: React.FC = () => {
  return (
    <>
      <SizeFilter />
      <AuctionHouseFilter />
    </>
  )
}
