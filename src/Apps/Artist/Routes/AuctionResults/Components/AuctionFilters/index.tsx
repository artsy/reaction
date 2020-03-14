import React from "react"
import { AuctionHouseFilter } from "./AuctionHouseFilter"
import { MediumFilter } from "./MediumFilter"
import { SizeFilter } from "./SizeFilter"
import { YearCreated } from "./YearCreated"

export const AuctionFilters: React.FC = () => {
  return (
    <>
      <MediumFilter />
      <SizeFilter />
      {/* TODO: Wire up to metaphysics */}
      <YearCreated auctionResult={{} as any} />
      <AuctionHouseFilter />
    </>
  )
}
